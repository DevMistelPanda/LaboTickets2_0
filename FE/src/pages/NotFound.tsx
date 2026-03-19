import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600 opacity-40 animate-rainbow z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('')" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl animate-fade-in text-center">
          <div className="text-6xl md:text-7xl font-extrabold mb-4">404</div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Verirrt im Maskenball
            <span className="block text-party-purple text-shadow mt-2">
              Diese Seite tanzt nicht mit
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 opacity-90">
            Die Seite, die du suchst, ist wie eine verlorene Maske in der Nacht...
          </p>

          <a
            href="/"
            className="inline-block px-8 py-3 bg-party-purple text-white rounded-full text-lg font-medium hover:bg-party-purple/90 transition duration-300 shadow-lg"
          >
            Zurück zum Ballsaal
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
