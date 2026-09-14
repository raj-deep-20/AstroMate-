import React, { useEffect, useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

const validRoutes = new Set(['/', '/horoscope', '/birth-chart', '/match', '/chat']);

function getRoute() {
  const route = window.location.hash.replace(/^#/, '') || '/';
  return validRoutes.has(route) ? route : '/';
}

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (nextRoute) => {
    window.location.hash = nextRoute;
  };

  return (
    <div className="relative min-h-screen">
      {route === '/' ? (
        <LandingPage onEnter={() => navigate('/horoscope')} />
      ) : (
        <Dashboard route={route} onNavigate={navigate} />
      )}
    </div>
  );
}
