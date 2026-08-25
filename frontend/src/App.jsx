import React, { useState } from 'react';
import StarField from './components/StarField';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' or 'dashboard'

  return (
    <div className="relative min-h-screen">
      {/* Global Starfield Canvas */}
      <StarField />

      {/* Pages Container */}
      {view === 'landing' ? (
        <LandingPage onEnter={() => setView('dashboard')} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
