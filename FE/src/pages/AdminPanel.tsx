import { useState, useEffect } from 'react';
import Header from '@/components/StaffHeader';
import { toast, Toaster } from 'sonner';
import StatsDashboard from '@/components/StatsDashboard';

const AdminPanel = () => {
  const [username, setUsername] = useState('...');
  const [token, setToken] = useState<string | null>(null);
  const [resetUser, setResetUser] = useState('');
  const [resetPw, setResetPw] = useState('');
  const [userList, setUserList] = useState<string[]>([]);
  const [addUser, setAddUser] = useState('');
  const [addPw, setAddPw] = useState('');
  const [addRole, setAddRole] = useState('staff');
  const [removeUser, setRemoveUser] = useState('');
  const [removeConfirm, setRemoveConfirm] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername === 'admin' ? 'Milan' : storedUsername || 'Unbekannt');

    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  // Lade alle Usernamen für das Dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/admin/user-list', {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUserList(data.users || []);
        }
      } catch {
        // ignore
      }
    };
    fetchUsers();
  }, []);

  const handleImportantSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Always get the latest token from localStorage
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      toast.error('Nicht eingeloggt.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const hot_news = formData.get('hot_news');

    if (!hot_news || typeof hot_news !== 'string') {
      toast.error('Bitte wichtige News eingeben.');
      return;
    }

    try {
      const res = await fetch('/api/news/sub_hot', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hot_news }),
      });

      if (res.ok) {
        e.currentTarget.reset();
        toast.success('✅ Wichtige News erfolgreich gesendet!');
      } else {
        let message = 'Unbekannt';
        try {
          const data = await res.json();
          message = data.message || message;
        } catch {}
        toast.error(`❌ Fehler: ${message}`);
      }
    } catch {
      toast.error('❌ Funktioniert schon, aber es gibt einen Fehler beim Senden der wichtigen News.');
    }
  };

  const handleNewsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Always get the latest token from localStorage
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      toast.error('Nicht eingeloggt.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const text = formData.get('text');

    if (
      !title ||
      typeof title !== 'string' ||
      !text ||
      typeof text !== 'string'
    ) {
      toast.error('Bitte Titel und Text eingeben.');
      return;
    }

    try {
      const res = await fetch('/api/news/sub_all', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, text }),
      });

      if (res.ok) {
        e.currentTarget.reset();
        toast.success('✅ Normale News erfolgreich gesendet!');
      } else {
        let message = 'Unbekannt';
        try {
          const data = await res.json();
          message = data.message || message;
        } catch {}
        toast.error(`❌ Fehler: ${message}`);
      }
    } catch {
      toast.error('❌ Funktioniert schon, aber es gibt einen Fehler beim Senden der normalen News.');
    }
  };

  // Passwort-Reset Handler
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      toast.error('Nicht eingeloggt.');
      return;
    }
    if (!resetUser || !resetPw) {
      toast.error('Bitte Benutzername und neues Passwort angeben.');
      return;
    }
    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: resetUser, newPassword: resetPw }),
      });
      if (res.ok) {
        toast.success('✅ Passwort erfolgreich zurückgesetzt!');
        setResetUser('');
        setResetPw('');
      } else {
        let message = 'Unbekannt';
        try {
          const data = await res.json();
          message = data.message || message;
        } catch {}
        toast.error(`❌ Fehler: ${message}`);
      }
    } catch {
      // Kein Toast hier, damit es nicht doppelt ist!
      // toast.error('❌ Fehler beim Zurücksetzen des Passworts.');
    }
  };

  // Nutzer hinzufügen Handler
  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      toast.error('Nicht eingeloggt.');
      return;
    }
    if (!addUser || !addPw) {
      toast.error('Bitte Benutzername und Passwort angeben.');
      return;
    }
    try {
      const res = await fetch('/api/admin/add-user', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: addUser, password: addPw, role: addRole }),
      });
      if (res.ok) {
        toast.success('✅ Nutzer erfolgreich hinzugefügt!');
        setAddUser('');
        setAddPw('');
        setAddRole('staff');
        // Reload user list
        const token = localStorage.getItem('token');
        const res2 = await fetch('/api/admin/user-list', {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (res2.ok) {
          const data = await res2.json();
          setUserList(data.users || []);
        }
      } else {
        let message = 'Unbekannt';
        try {
          const data = await res.json();
          message = data.message || message;
        } catch {}
        toast.error(`❌ Fehler: ${message}`);
      }
    } catch {
      // Kein Toast hier, damit es nicht doppelt ist!
    }
  };

  // Nutzer entfernen Handler
  const handleRemoveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!removeUser) {
      toast.error('Bitte Benutzer auswählen.');
      return;
    }
    if (!removeConfirm) {
      setRemoveConfirm(true);
      toast.warning('Bitte bestätigen Sie das Entfernen durch erneutes Klicken auf "Entfernen".');
      return;
    }
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      toast.error('Nicht eingeloggt.');
      setRemoveConfirm(false);
      return;
    }
    try {
      const res = await fetch('/api/admin/remove-user', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: removeUser }),
      });
      if (res.ok) {
        toast.success('✅ Nutzer erfolgreich entfernt!');
        setRemoveUser('');
        setRemoveConfirm(false);
        // Reload user list
        const token = localStorage.getItem('token');
        const res2 = await fetch('/api/admin/user-list', {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (res2.ok) {
          const data = await res2.json();
          setUserList(data.users || []);
        }
      } else {
        let message = 'Unbekannt';
        try {
          const data = await res.json();
          message = data.message || message;
        } catch {}
        toast.error(`❌ Fehler: ${message}`);
        setRemoveConfirm(false);
      }
    } catch {
      setRemoveConfirm(false);
    }
  };

  return (
    <>
      <Header />
      <Toaster position="top-center" richColors />
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden text-white px-4">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-party-dark/80 to-party-purple/50 z-10"></div>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://media.istockphoto.com/id/170085684/de/foto/hers-und-seine-masken-auf-schwarzem-hintergrund.jpg?s=612x612&w=0&k=20&c=qgktvJ3waDrNskuj2bwIamOQEpN0H0kDXQnQ5_-vJYs=')",
            }}
          />
        </div>

        <div className="relative z-10 text-center mb-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Admin Panel</h1>
          <span className="block text-party-purple text-2xl mt-2">Hey {username} 👋</span>
        </div>

        <div className="relative z-10 max-w-4xl w-full space-y-10 backdrop-blur-sm bg-black/30 rounded-lg shadow-xl p-8">
          {/* Important News Form */}
          <div>
            <h2 className="text-2xl font-bold text-party-purple mb-4">Wichtige News</h2>
            <form onSubmit={handleImportantSubmit} className="space-y-4">
              <input
                type="text"
                name="hot_news"
                placeholder="Wichtige News"
                required
                className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-party-purple hover:bg-party-purple/80 text-white font-semibold py-2 px-6 rounded shadow"
              >
                Absenden
              </button>
            </form>
          </div>

          {/* Normal News Form */}
          <div>
            <h2 className="text-2xl font-bold text-party-purple mb-4">Normale News</h2>
            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Titel"
                required
                className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none"
              />
              <textarea
                name="text"
                placeholder="Nachrichtentext"
                required
                rows={5}
                className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none resize-none"
              />
              <button
                type="submit"
                className="bg-party-purple hover:bg-party-purple/80 text-white font-semibold py-2 px-6 rounded shadow"
              >
                Absenden
              </button>
            </form>
          </div>

          {/* Passwort Reset */}
          <div>
            <h2 className="text-2xl font-bold text-party-purple mb-4">Passwort zurücksetzen</h2>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <select
                value={resetUser}
                onChange={e => setResetUser(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none appearance-none"
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.15)', // party-purple/20
                  color: 'white',
                  border: '1px solid #a78bfa',
                }}
                required
              >
                <option value="" className="text-party-dark bg-white">Benutzer auswählen</option>
                {userList.map((user) => (
                  <option key={user} value={user} className="text-party-dark bg-white">{user}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Neues Initialpasswort"
                value={resetPw}
                onChange={e => setResetPw(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-party-purple hover:bg-party-purple/80 text-white font-semibold py-2 px-6 rounded shadow"
              >
                Zurücksetzen
              </button>
            </form>
          </div>

          {/* Nutzer hinzufügen */}
          <div>
            <h2 className="text-2xl font-bold text-party-purple mb-4">Nutzer hinzufügen</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <input
                type="text"
                placeholder="Benutzername"
                value={addUser}
                onChange={e => setAddUser(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Initialpasswort"
                value={addPw}
                onChange={e => setAddPw(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none"
                required
              />
              <select
                value={addRole}
                onChange={e => setAddRole(e.target.value)}
                className="w-full px-4 py-2 rounded bg-white/20 text-white focus:outline-none"
                required
              >
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="submit"
                className="bg-party-purple hover:bg-party-purple/80 text-white font-semibold py-2 px-6 rounded shadow"
              >
                Hinzufügen
              </button>
            </form>
          </div>

          {/* Nutzer entfernen */}
          <div>
            <h2 className="text-2xl font-bold text-party-purple mb-4">Nutzer entfernen</h2>
            <form onSubmit={handleRemoveUser} className="space-y-4">
              <select
                value={removeUser}
                onChange={e => {
                  setRemoveUser(e.target.value);
                  setRemoveConfirm(false); // Reset confirmation if user changes
                }}
                className="w-full px-4 py-2 rounded bg-white/20 text-white focus:outline-none"
                required
              >
                <option value="">Benutzer auswählen</option>
                {userList.map((user) => (
                  <option key={user} value={user} className="text-party-dark bg-white">{user}</option>
                ))}
              </select>
              <button
                type="submit"
                className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded shadow w-full transition ${removeConfirm ? 'ring-2 ring-yellow-400' : ''}`}
              >
                {removeConfirm ? 'Löschen bestätigen' : 'Entfernen'}
              </button>
              {removeConfirm && (
                <div className="text-yellow-300 text-center text-sm font-semibold">
                  Klicke erneut auf "Löschen bestätigen", um den Nutzer unwiderruflich zu entfernen.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      {/* Add StatsDashboard below the forms */}
        <div className="relative z-10 w-full">
          <StatsDashboard />
        </div>
    </>
  );
};

export default AdminPanel;
