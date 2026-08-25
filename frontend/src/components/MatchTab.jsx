import React, { useState } from 'react';
import { marked } from 'marked';

const signs = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export default function MatchTab() {
  const [name1, setName1] = useState('');
  const [sign1, setSign1] = useState('');
  const [name2, setName2] = useState('');
  const [sign2, setSign2] = useState('');
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState('');
  const [error, setError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReading('');
    setHasSubmitted(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/compatibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name1, sign1, name2, sign2 })
      });

      if (!response.ok) {
        throw new Error('Synastry calculations failed');
      }

      const data = await response.json();
      const htmlReading = marked.parse(data.reading);
      setReading(htmlReading);
    } catch (err) {
      setError(`Unable to match compatibility: ${err.message}. Make sure backend is running!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-3xl font-serif text-cosmic-gold">Synastry & Love Compatibility</h2>
        <p className="text-slate-300">Measure the elemental sparks and long-term compatibility between you and your partner, friend, or coworker.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Person 1 */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-cosmic-accent border-b border-white/10 pb-2">
              <i className="fa-solid fa-sparkles mr-2"></i>First Person
            </h3>
            <div>
              <label htmlFor="match-name1" class="block text-sm font-semibold text-slate-300 mb-1">Name</label>
              <input 
                type="text" 
                id="match-name1" 
                required 
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="e.g. Venus" 
                class="w-full bg-white/10 border border-white/10 focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent rounded-xl px-4 py-2 text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="match-sign1" class="block text-sm font-semibold text-slate-300 mb-1">Zodiac Sign</label>
              <select 
                id="match-sign1" 
                required
                value={sign1}
                onChange={(e) => setSign1(e.target.value)}
                class="w-full bg-white/10 border border-white/10 focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent rounded-xl px-4 py-2 text-white outline-none transition-colors"
              >
                <option value="" disabled className="bg-cosmic-dark">Select Sign</option>
                {signs.map(sign => <option key={sign} value={sign} class="bg-cosmic-dark">{sign}</option>)}
              </select>
            </div>
          </div>

          {/* Person 2 */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-cosmic-gold border-b border-white/10 pb-2">
              <i className="fa-solid fa-moon-stars mr-2"></i>Second Person
            </h3>
            <div>
              <label htmlFor="match-name2" class="block text-sm font-semibold text-slate-300 mb-1">Name</label>
              <input 
                type="text" 
                id="match-name2" 
                required 
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="e.g. Mars" 
                class="w-full bg-white/10 border border-white/10 focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent rounded-xl px-4 py-2 text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="match-sign2" class="block text-sm font-semibold text-slate-300 mb-1">Zodiac Sign</label>
              <select 
                id="match-sign2" 
                required
                value={sign2}
                onChange={(e) => setSign2(e.target.value)}
                class="w-full bg-white/10 border border-white/10 focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent rounded-xl px-4 py-2 text-white outline-none transition-colors"
              >
                <option value="" disabled className="bg-cosmic-dark">Select Sign</option>
                {signs.map(sign => <option key={sign} value={sign} class="bg-cosmic-dark">{sign}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <button 
            type="submit" 
            class="bg-gradient-to-r from-pink-500 to-cosmic-accent hover:from-pink-600 hover:to-cosmic-accent text-white font-serif font-semibold px-8 py-3 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 flex items-center space-x-2"
          >
            <i class="fa-solid fa-heart-pulse animate-pulse"></i>
            <span>Calculate Compatibility</span>
          </button>
        </div>
      </form>

      {/* Results Output */}
      {hasSubmitted && (
        <div className="border border-white/10 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          {/* Loading Screen */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <i className="fa-solid fa-heart text-pink-500 text-3xl animate-ping absolute"></i>
                <i className="fa-solid fa-heart text-cosmic-accent text-4xl relative z-10"></i>
              </div>
              <span className="text-sm text-slate-400 font-serif">Mapping relational synastry charts...</span>
            </div>
          )}

          {/* Error Screen */}
          {error && (
            <div className="text-rose-400 py-4 text-center">
              <p>⚠️ {error}</p>
            </div>
          )}

          {/* Reading Display */}
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
