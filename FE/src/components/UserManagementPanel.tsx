import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const UserManagementPanel = () => {
  const [resetUser, setResetUser] = useState('');
  const [resetPw, setResetPw] = useState('');
  const [userList, setUserList] = useState<string[]>([]);
  const [addUser, setAddUser] = useState('');
  const [addPw, setAddPw] = useState('');
  const [addRole, setAddRole] = useState('staff');
  const [removeUser, setRemoveUser] = useState('');
  const [removeConfirm, setRemoveConfirm] = useState(false);

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
        // Reload user list
        const res2 = await fetch('/api/admin/user-list', {
          headers: {
            ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
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
        const res2 = await fetch('/api/admin/user-list', {
          headers: {
            ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
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
        const res2 = await fetch('/api/admin/user-list', {
          headers: {
            ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
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
    <section className="relative max-w-4xl w-full mx-auto my-12 space-y-10 bg-white rounded-xl shadow-xl p-8 text-party-dark border border-party-purple/20">
      <h2 className="text-2xl font-bold text-party-purple mb-8 text-center">Benutzerverwaltung</h2>
      {/* Passwort Reset */}
      <div>
        <h3 className="text-xl font-semibold text-party-purple mb-4">Passwort zurücksetzen</h3>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <select
            value={resetUser}
            onChange={e => setResetUser(e.target.value)}
            className="w-full px-4 py-2 rounded border border-party-purple/30 bg-white text-party-dark focus:outline-none"
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
            className="w-full px-4 py-2 rounded border border-party-purple/30 bg-white text-party-dark focus:outline-none"
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
        <h3 className="text-xl font-semibold text-party-purple mb-4">Nutzer hinzufügen</h3>
        <form onSubmit={handleAddUser} className="space-y-4">
          <input
            type="text"
            placeholder="Benutzername"
            value={addUser}
            onChange={e => setAddUser(e.target.value)}
            className="w-full px-4 py-2 rounded border border-partyPurple/30 bg-white text-party-dark focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Initialpasswort"
            value={addPw}
            onChange={e => setAddPw(e.target.value)}
            className="w-full px-4 py-2 rounded border border-partyPurple/30 bg-white text-party-dark focus:outline-none"
            required
          />
          <select
            value={addRole}
            onChange={e => setAddRole(e.target.value)}
            className="w-full px-4 py-2 rounded border border-partyPurple/30 bg-white text-party-dark focus:outline-none"
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
        <h3 className="text-xl font-semibold text-party-purple mb-4">Nutzer entfernen</h3>
        <form onSubmit={handleRemoveUser} className="space-y-4">
          <select
            value={removeUser}
            onChange={e => {
              setRemoveUser(e.target.value);
              setRemoveConfirm(false); // Reset confirmation if user changes
            }}
            className="w-full px-4 py-2 rounded border border-partyPurple/30 bg-white text-party-dark focus:outline-none"
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
            <div className="text-yellow-600 text-center text-sm font-semibold">
              Klicke erneut auf "Löschen bestätigen", um den Nutzer unwiderruflich zu entfernen.
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default UserManagementPanel;