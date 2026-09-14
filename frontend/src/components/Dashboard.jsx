import React from 'react';
import ZodiacTab from './ZodiacTab';
import BirthChartTab from './BirthChartTab';
import MatchTab from './MatchTab';
import ChatTab from './ChatTab';
import { Heart, MessageCircle, Orbit, Sun } from 'lucide-react';

const tabs = [
  { route: '/horoscope', label: 'Daily Horoscope', icon: Sun },
  { route: '/birth-chart', label: 'Birth Chart', icon: Orbit },
  { route: '/match', label: 'Synastry Match', icon: Heart },
  { route: '/chat', label: 'Astro Chat', icon: MessageCircle },
];

export default function Dashboard({ route, onNavigate }) {
  const activeTab = tabs.find((tab) => tab.route === route) || tabs[0];

  const renderTabContent = () => {
    switch (activeTab.route) {
      case '/horoscope':
        return <ZodiacTab />;
      case '/birth-chart':
        return <BirthChartTab />;
      case '/match':
        return <MatchTab />;
      case '/chat':
        return <ChatTab />;
      default:
        return <ZodiacTab />;
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col px-4 py-6 md:px-8 max-w-6xl mx-auto animate-fadeIn text-[#17152b]">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 py-3 md:py-5">
        <button type="button" onClick={() => onNavigate('/')} className="flex items-center gap-3 text-left">
          <span className="w-10 h-10 rounded-full bg-[#191733] text-[#f6c65b] flex items-center justify-center text-xl shadow-lg">✦</span>
          <span className="font-serif text-2xl font-bold tracking-wide">AstroMate</span>
        </button>
        <div className="inline-flex items-center space-x-2 border border-purple-100 bg-white px-4 py-1.5 rounded-full text-xs text-purple-700 tracking-wide uppercase font-semibold mb-3 shadow-sm">
          <span>✦ AstroMate AI Dashboard ✦</span>
        </div>
        <button type="button" onClick={() => onNavigate('/')} className="hidden md:block text-sm font-semibold text-[#33256e] hover:text-[#7c4db8]">Back to home</button>
      </header>

      <div className="text-center pb-5">
        <h1 className="font-serif text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#39267d] via-[#7c4db8] to-[#d276a4] tracking-wide font-extrabold">Your cosmic workspace</h1>
        <p className="text-slate-500 text-sm md:text-base mt-2 max-w-lg mx-auto">Personalized planetary wisdom, relationship insights, and AI guidance in one place.</p>
      </div>

      {/* Main Content */}
      <main className="flex-1 my-6">
        {/* Tabs Navigation */}
        <nav aria-label="AstroMate tools" className="flex flex-wrap justify-center gap-2 border-b border-purple-100 pb-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.route}
              type="button"
              onClick={() => onNavigate(tab.route)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif text-sm tracking-wide transition-all border active:scale-95 hover:-translate-y-0.5 ${
                activeTab.route === tab.route
                  ? 'bg-[#33256e] border-[#33256e] text-white shadow-lg shadow-purple-200/50'
                  : 'border-transparent hover:border-purple-100 hover:bg-white text-slate-500'
              }`}
            >
              <tab.icon aria-hidden="true" size={16} strokeWidth={2.2} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Render Active Tab */}
        <div key={activeTab.route} className="relative animate-tab-enter">
          {renderTabContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-purple-100 text-xs text-slate-500 space-y-1">
        <p>© 2026 AstroMate.</p>
        <p>Know your astrology today.</p>
      </footer>
    </div>
  );
}
