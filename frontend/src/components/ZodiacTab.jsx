import React, { useState } from 'react';
import { marked } from 'marked';

const zodiacs = [
  { name: 'Aries', symbol: '♈', date: 'Mar 21 - Apr 19', color: 'from-red-500 to-orange-500' },
  { name: 'Taurus', symbol: '♉', date: 'Apr 20 - May 20', color: 'from-green-500 to-emerald-500' },
  { name: 'Gemini', symbol: '♊', date: 'May 21 - Jun 20', color: 'from-cyan-400 to-blue-500' },
  { name: 'Cancer', symbol: '♋', date: 'Jun 21 - Jul 22', color: 'from-blue-400 to-indigo-500' },
  { name: 'Leo', symbol: '♌', date: 'Jul 23 - Aug 22', color: 'from-amber-400 to-yellow-600' },
  { name: 'Virgo', symbol: '♍', date: 'Aug 23 - Sep 22', color: 'from-amber-700 to-emerald-700' },
  { name: 'Libra', symbol: '♎', date: 'Sep 23 - Oct 22', color: 'from-pink-400 to-rose-400' },
  { name: 'Scorpio', symbol: '♏', date: 'Oct 23 - Nov 21', color: 'from-purple-600 to-red-600' },
  { name: 'Sagittarius', symbol: '♐', date: 'Nov 22 - Dec 21', color: 'from-orange-500 to-amber-500' },
  { name: 'Capricorn', symbol: '♑', date: 'Dec 22 - Jan 19', color: 'from-slate-600 to-indigo-900' },
  { name: 'Aquarius', symbol: '♒', date: 'Jan 20 - Feb 18', color: 'from-blue-500 to-teal-400' },
  { name: 'Pisces', symbol: '♓', date: 'Feb 19 - Mar 20', color: 'from-teal-400 to-indigo-500' },
];

export default function ZodiacTab() {
  const [selectedSign, setSelectedSign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState('');
  const [error, setError] = useState('');

  const handleSelect = async (sign) => {
    setSelectedSign(sign);
    setLoading(true);
    setError('');
    setReading('');

    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    try {
      const response = await fetch('http://127.0.0.1:8000/api/horoscope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sign, date: today })
      });

      if (!response.ok) {
        throw new Error('Cosmic interference detected');
      }

      const data = await response.json();
      const htmlReading = marked.parse(data.reading);
      setReading(htmlReading);
    } catch (err) {
      setError(`Unable to read the stars: ${err.message}. Make sure backend is running!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-3xl font-serif text-cosmic-gold">Select Your Zodiac Sign</h2>
        <p className="text-slate-300">Click on your sun sign to reveal your current celestial energies, love alignments, and financial horoscopes.</p>
      </div>

      {/* Zodiac Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {zodiacs.map((zodiac) => (
          <button
            key={zodiac.name}
            onClick={() => handleSelect(zodiac.name)}
            className="zodiac-card group relative p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cosmic-accent/50 transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden active:scale-95"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${zodiac.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
            <span className="text-4xl mb-2 text-cosmic-gold group-hover:scale-110 transition-transform duration-300">{zodiac.symbol}</span>
            <span className="font-serif font-semibold text-lg text-slate-100">{zodiac.name}</span>
            <span className="text-xs text-slate-400 mt-1">{zodiac.date}</span>
          </button>
        ))}
      </div>

      {/* Result Output */}
      {selectedSign && (
        <div className="max-w-3xl mx-auto border border-white/10 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-cosmic-accent/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-cosmic-gold/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <span className="text-4xl text-cosmic-gold">
                {zodiacs.find(z => z.name === selectedSign)?.symbol || '🌟'}
              </span>
              <div>
                <h3 className="font-serif text-2xl text-white">{selectedSign}</h3>
                <p className="text-xs text-slate-400">
                  {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            <button onClick={() => setSelectedSign(null)} className="text-slate-400 hover:text-white transition-colors">
              <i className="fa-solid fa-times text-xl"></i>
            </button>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <i className="fa-solid fa-circle-notch fa-spin text-3xl text-cosmic-accent"></i>
              <span className="text-sm text-slate-400 font-serif">Consulting the alignment of the stars...</span>
            </div>
          )}

          {error && (
            <div className="text-rose-400 py-4 text-center">
              <p>⚠️ {error}</p>
            </div>
          )}

          {reading && (
            <div 
              className="prose max-w-none text-slate-200"
              dangerouslySetInnerHTML={{ __html: reading }}
            />
          )}
        </div>
      )}
    </div>
  );
}
