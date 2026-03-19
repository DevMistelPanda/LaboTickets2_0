import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const text = await res.text();

      if (!text) {
        throw new Error('Service momentan nicht verfügbar (503)');
      }

      const data = JSON.parse(text);

      if (!res.ok) throw new Error(data.message || 'Login fehlgeschlagen');

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username)
      localStorage.setItem('role', data.role);
      // Prüfe must_change_password
      if (data.must_change_password) {
        navigate('/change-password', { replace: true });
      } else {
        navigate('/staff', { replace: true });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 opacity-40 animate-rainbow z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('')" }}
        ></div>
      </div>
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <input
            type="text"
            placeholder="Benutzername"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Passwort"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-party-purple text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
