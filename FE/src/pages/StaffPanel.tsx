// pages/StaffPanel.tsx
import { useEffect, useState } from 'react';
import Header from '@/components/StaffHeader';

type VisitorStats = {
  total_visitors: number;
  entered_visitors: number;
};

type NewsItem = {
  imp_news: string | null;
  nr: number | null;
  news_title: string;
  news_text: string;
};

const StaffPanel = () => {
  const [username, setUsername] = useState('...');
  const [visStats, setVisStats] = useState<VisitorStats | null>(null);
  const [hotNews, setHotNews] = useState<string>('');
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [backendError, setBackendError] = useState(false);

  const fetchVisitorStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch('/api/visitors/stats', {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const [data]: [VisitorStats] = await res.json(); 
      setVisStats(data);
    } catch (err) {
      console.error('Visitor stats error:', err);
      setBackendError(true);
    }
  };

  const fetchHotNews = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch('/api/news/hot', {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json(); // data is an array of objects

      if (data.length > 0) {
        setHotNews(data[0].first_imp_news);
      } else {
        setHotNews('');
      }
    } catch (err) {
      console.error('Hot news error:', err);
      setBackendError(true);
    }
  };

  const fetchNewsList = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch('/api/news', {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();

      setNewsList(data.reverse());
    } catch (err) {
      console.error('News list error:', err);
      setBackendError(true);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername === 'admin' ? 'Milan' : storedUsername || 'Unbekannt');

    fetchVisitorStats();
    fetchHotNews();
    fetchNewsList();

    const interval = setInterval(fetchVisitorStats, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (backendError) {
      const timer = setTimeout(() => setBackendError(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [backendError]);

  return (
    <>
      <Header />

      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden text-white px-4">
        {/* Background like in Hero.tsx */}
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

        {/* Header text outside the box */}
        <div className="relative z-10 text-center mb-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Willkommen im Staff Panel
          </h1>
          <span className="block text-party-purple text-2xl mt-2">Hey {username} 👋</span>
        </div>

        {/* Main content box */}
        <div className="relative z-10 max-w-5xl w-full space-y-8 backdrop-blur-sm bg-black/30 rounded-lg shadow-xl p-8">

          {/* Backend error message */}
          {backendError && (
            console.log('503: Backend error occurred'),
            <div className="bg-red-600/80 text-white text-center px-4 py-3 rounded-md font-medium shadow">
              ❌ (503) Backend nicht erreichbar – bitte kontaktiere den Admin.
            </div>
          )}

          {/* Hot news headline */}
          {hotNews && (
            <div className="bg-yellow-200/20 text-yellow-100 px-4 py-3 rounded-md text-center font-medium">
              {hotNews}
            </div>
          )}

          {/* Ticket counters */}
          {visStats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
              <div className="bg-white/10 p-6 rounded-lg shadow">
                <p className="text-3xl font-bold">{visStats.entered_visitors}</p>
                <span className="text-lg text-white/80">Tickets gescannt</span>
              </div>
              <div className="bg-white/10 p-6 rounded-lg shadow">
                <p className="text-3xl font-bold">{visStats.total_visitors}</p>
                <span className="text-lg text-white/80">Karten verkauft</span>
              </div>
            </div>
          )}

          {/* News list */}
          <div className="mt-10 space-y-4">
            <h2 className="text-2xl font-bold text-party-purple">Neueste News</h2>
            <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
              {newsList.map((item, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-xl">{item.news_title}</h3>
                  <p className="text-white/80">{item.news_text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StaffPanel;
