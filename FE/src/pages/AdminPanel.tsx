import { useState, useEffect } from 'react';
import Header from '@/components/StaffHeader';
import { toast, Toaster } from 'sonner';
import StatsDashboard from '@/components/StatsDashboard';
import UserManagementPanel from '@/components/UserManagementPanel';

const AdminPanel = () => {
  const [username, setUsername] = useState('...');
  const [token, setToken] = useState<string | null>(null);

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

  return (
    <>
      <Header />
      <Toaster position="top-center" richColors />
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden text-white px-4">
        {/* Background */}
        <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 opacity-40 animate-rainbow z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('')" }}
        ></div>
      </div>

        <div className="relative z-10 text-center mb-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Admin Panel</h1>
          <span className="block text-party-purple text-2xl mt-2">Hey {username} 👋</span>
        </div>

        {/* News Management Section */}
        <div className="relative z-10 max-w-4xl w-full space-y-10 backdrop-blur-sm bg-black/30 rounded-lg shadow-xl p-8 mb-12">
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
        </div>
      </section>
      {/* Add StatsDashboard below the forms */}
      <div className="relative z-10 w-full">
        <UserManagementPanel />
        <StatsDashboard />
      </div>
    </>
  );
};

export default AdminPanel;