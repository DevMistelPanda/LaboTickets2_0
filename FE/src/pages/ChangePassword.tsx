import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ oldPassword?: string; newPassword?: string; confirmPassword?: string; general?: string }>({});
  const username = localStorage.getItem('username') || '';
  const navigate = useNavigate();

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: typeof errors = {};

    if (!oldPassword) {
      newErrors.oldPassword = 'Bitte das alte Passwort eingeben.';
    }
    if (newPassword.length < 8) {
      newErrors.newPassword = 'Das neue Passwort muss mindestens 8 Zeichen lang sein.';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Die neuen Passwörter stimmen nicht überein.';
    }
    if (!newPassword) {
      newErrors.newPassword = 'Bitte ein neues Passwort eingeben.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Bitte das neue Passwort wiederholen.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      if (res.ok) {
        // Passwort erfolgreich geändert, jetzt automatisch einloggen
        if (!username) {
          setErrors({ general: 'Fehler: Benutzername nicht gefunden.' });
          setLoading(false);
          return;
        }
        const loginRes = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password: newPassword }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.token) {
          localStorage.setItem('token', loginData.token);
          localStorage.setItem('username', loginData.username);
          localStorage.setItem('role', loginData.role);
          setErrors({});
          setTimeout(() => navigate('/staff', { replace: true }), 500);
        } else {
          setErrors({ general: loginData.message || 'Fehler beim automatischen Login.' });
          // Optional: Logout und zurück zum Login
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('role');
          setTimeout(() => navigate('/login', { replace: true }), 1000);
        }
      } else {
        const data = await res.json();
        setErrors({ general: data.message || 'Fehler beim Ändern des Passworts.' });
      }
    } catch {
      setErrors({ general: 'Serverfehler beim Ändern des Passworts.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-party-light-purple">
      <form onSubmit={handleChange} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-party-dark">Neues Passwort setzen</h2>
        <div className="text-center text-party-purple font-semibold mb-2">
          Dein Benutzername: <br /> <span className="font-mono text-party-dark">{username}</span>
        </div>
        {errors.general && (
          <div className="text-red-600 text-center font-semibold mb-2">{errors.general}</div>
        )}
        <div>
          {errors.oldPassword && (
            <div className="text-red-600 text-sm mb-1">{errors.oldPassword}</div>
          )}
          <input
            type="password"
            placeholder="Altes / Initial Passwort"
            className={`w-full p-3 border rounded-lg ${errors.oldPassword ? 'border-red-500' : 'border-gray-300'}`}
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          {errors.newPassword && (
            <div className="text-red-600 text-sm mb-1">{errors.newPassword}</div>
          )}
          <input
            type="password"
            placeholder="Neues Passwort (min. 8 Zeichen)"
            className={`w-full p-3 border rounded-lg ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          {errors.confirmPassword && (
            <div className="text-red-600 text-sm mb-1">{errors.confirmPassword}</div>
          )}
          <input
            type="password"
            placeholder="Neues Passwort wiederholen"
            className={`w-full p-3 border rounded-lg ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-party-purple text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? 'Ändere...' : 'Passwort ändern'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
