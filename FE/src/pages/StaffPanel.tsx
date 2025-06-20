// pages/StaffPanel.tsx
import { useEffect, useState } from 'react';

type VisitorStats = {
  total_visitors: number;
  entered_visitors: number;
};

type NewsItem = {
  news_title: string;
  news_text: string;
};

const StaffPanel = () => {
  const [username, setUsername] = useState('...');
  const [visStats, setVisStats] = useState<VisitorStats | null>(null);
  const [hotNews, setHotNews] = useState('');
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  const fetchSessionData = async () => {
    const res = await fetch('/session-data', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    setUsername(data.username === 'admin' ? 'Milan' : data.username);
  };

  const fetchVisitorStats = async () => {
    const res = await fetch('/api/visitors/stats');
    const [data] = await res.json();
    setVisStats(data);
  };

  const fetchHotNews = async () => {
    const res = await fetch('/api/news/hot');
    const [data] = await res.json();
    setHotNews(data?.first_imp_news ?? '');
  };

  const fetchNewsList = async () => {
    const res = await fetch('/api/news');
    const data = await res.json();
    setNewsList(data.reverse());
  };

  useEffect(() => {
    fetchSessionData();
    fetchVisitorStats();
    fetchHotNews();
    fetchNewsList();

    const interval = setInterval(fetchVisitorStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
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

      <div className="relative z-10 max-w-5xl w-full px-4 py-12 animate-fade-in space-y-8 backdrop-blur-sm bg-black/30 rounded-lg shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-center">
          Willkommen im Staff Panel
          <span className="block text-party-purple">Hey {username} 👋</span>
        </h1>

        {hotNews && (
          <div className="bg-yellow-200/20 text-yellow-100 px-4 py-3 rounded-md text-center font-medium">
            {hotNews}
          </div>
        )}

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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-semibold">
          <a href="/ausgabe" className="bg-party-purple hover:bg-party-purple/80 py-4 rounded-lg transition">
            Ticket Ausgabe
          </a>
          <a href="/scan" className="bg-party-purple hover:bg-party-purple/80 py-4 rounded-lg transition">
            Scanning
          </a>
          <a href="/admin" className="bg-party-purple hover:bg-party-purple/80 py-4 rounded-lg transition">
            Admin Panel
          </a>
        </div>

        <div className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold text-party-purple">Neueste News</h2>
          <div className="space-y-3">
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
  );
};

export default StaffPanel;
