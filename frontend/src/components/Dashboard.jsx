import React, { useState } from 'react';
import ZodiacTab from './ZodiacTab';
import BirthChartTab from './BirthChartTab';
import MatchTab from './MatchTab';
import ChatTab from './ChatTab';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('zodiac');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'zodiac':
        return <ZodiacTab />;
      case 'birthchart':
        return <BirthChartTab />;
      case 'match':
        return <MatchTab />;
      case 'chat':
        return <ChatTab />;
      default:
        return <ZodiacTab />;
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col justify-between px-4 py-8 md:px-8 max-w-6xl mx-auto animate-fadeIn">
      {/* Header */}
      <header className="text-center py-6">
        <div className="inline-flex items-center space-x-2 border border-cosmic-accent/30 bg-cosmic-accent/10 px-4 py-1.5 rounded-full text-xs text-cosmic-accent tracking-wide uppercase font-semibold mb-3">
          <span>✦ AstroMate AI Dashboard ✦</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-cosmic-gold via-white to-cosmic-accent tracking-wide font-extrabold">
          AstroMate
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-lg mx-auto font-light">
          Unlock planetary wisdom, love compatibility, and natal configurations guided by advanced artificial intelligence.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 my-6">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-white/10 pb-4 mb-8">
          <button 
            onClick={() => setActiveTab('zodiac')}
            className={`px-5 py-2.5 rounded-xl font-serif text-sm tracking-wide transition-all border active:scale-95 ${
              activeTab === 'zodiac'
                ? 'bg-cosmic-accent/15 border-cosmic-accent/50 text-white shadow-[0_0_15px_rgba(236,56,188,0.15)]'
                : 'border-transparent hover:border-white/10 hover:bg-white/5 text-slate-400'
            }`}
          >
            🌟 Daily Horoscope
          </button>
          <button 
            onClick={() => setActiveTab('birthchart')}
            className={`px-5 py-2.5 rounded-xl font-serif text-sm tracking-wide transition-all border active:scale-95 ${
              activeTab === 'birthchart'
                ? 'bg-cosmic-accent/15 border-cosmic-accent/50 text-white shadow-[0_0_15px_rgba(236,56,188,0.15)]'
                : 'border-transparent hover:border-white/10 hover:bg-white/5 text-slate-400'
            }`}
          >
            🌀 Birth Chart
          </button>
          <button 
            onClick={() => setActiveTab('match')}
            className={`px-5 py-2.5 rounded-xl font-serif text-sm tracking-wide transition-all border active:scale-95 ${
              activeTab === 'match'
                ? 'bg-cosmic-accent/15 border-cosmic-accent/50 text-white shadow-[0_0_15px_rgba(236,56,188,0.15)]'
                : 'border-transparent hover:border-white/10 hover:bg-white/5 text-slate-400'
            }`}
          >
            💖 Synastry Match
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            className={`px-5 py-2.5 rounded-xl font-serif text-sm tracking-wide transition-all border active:scale-95 ${
              activeTab === 'chat'
                ? 'bg-cosmic-accent/15 border-cosmic-accent/50 text-white shadow-[0_0_15px_rgba(236,56,188,0.15)]'
                : 'border-transparent hover:border-white/10 hover:bg-white/5 text-slate-400'
            }`}
          >
            🔮 Astro Chat
          </button>
        </div>

        {/* Render Active Tab */}
        <div className="relative">
          {renderTabContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-white/5 text-xs text-slate-500 space-y-1">
        <p>© 2026 AstroMate.</p>
        <p>Know your astrology today.</p>
      </footer>
    </div>
  );
}
