import React, { useState } from 'react';
import { marked } from 'marked';
import { Heart, HeartPulse, LoaderCircle, Moon, Sparkles } from 'lucide-react';
import { requestJson } from '../config';

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
      const data = await requestJson('/api/compatibility', {
        method: 'POST',
        body: JSON.stringify({ name1: name1.trim(), sign1, name2: name2.trim(), sign2 }),
      });
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
        <h2 className="text-3xl font-serif text-[#33256e]">Synastry & Love Compatibility</h2>
        <p className="text-slate-500">Measure the elemental sparks and long-term compatibility between you and your partner, friend, or coworker.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Person 1 */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-[#7c4db8] border-b border-slate-100 pb-2">
              <Sparkles className="inline-block mr-2 h-5 w-5 align-[-4px]" aria-hidden="true" />
              First Person
            </h3>
            <div>
              <label htmlFor="match-name1" className="block text-sm font-semibold text-slate-600 mb-1">Name</label>
              <input 
                type="text" 
                id="match-name1" 
                required 
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                placeholder="e.g. Venus" 
                className="w-full bg-[#faf9fd] border border-slate-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-300 rounded-xl px-4 py-2 text-[#17152b] placeholder-slate-400 outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="match-sign1" className="block text-sm font-semibold text-slate-600 mb-1">Zodiac Sign</label>
              <select 
                id="match-sign1" 
                required
                value={sign1}
                onChange={(e) => setSign1(e.target.value)}
                className="w-full bg-[#faf9fd] border border-slate-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-300 rounded-xl px-4 py-2 text-[#17152b] outline-none transition-colors"
              >
                <option value="" disabled>Select Sign</option>
                {signs.map(sign => <option key={sign} value={sign}>{sign}</option>)}
              </select>
            </div>
          </div>

          {/* Person 2 */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-[#d79b2b] border-b border-slate-100 pb-2">
              <Moon className="inline-block mr-2 h-5 w-5 align-[-4px]" aria-hidden="true" />
              Second Person
            </h3>
            <div>
              <label htmlFor="match-name2" className="block text-sm font-semibold text-slate-600 mb-1">Name</label>
              <input 
                type="text" 
                id="match-name2" 
                required 
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                placeholder="e.g. Mars" 
                className="w-full bg-[#faf9fd] border border-slate-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-300 rounded-xl px-4 py-2 text-[#17152b] placeholder-slate-400 outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="match-sign2" className="block text-sm font-semibold text-slate-600 mb-1">Zodiac Sign</label>
              <select 
                id="match-sign2" 
                required
                value={sign2}
                onChange={(e) => setSign2(e.target.value)}
                className="w-full bg-[#faf9fd] border border-slate-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-300 rounded-xl px-4 py-2 text-[#17152b] outline-none transition-colors"
              >
                <option value="" disabled>Select Sign</option>
                {signs.map(sign => <option key={sign} value={sign}>{sign}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <button 
            type="submit" 
            className="bg-[#33256e] hover:bg-[#4a3598] text-white font-serif font-semibold px-8 py-3 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-purple-200/60 flex items-center space-x-2"
          >
            <HeartPulse className="h-4 w-4 animate-pulse" aria-hidden="true" />
            <span>Calculate Compatibility</span>
          </button>
        </div>
      </form>

      {/* Results Output */}
      {hasSubmitted && (
        <div className="border border-slate-100 bg-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
          {/* Loading Screen */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <Heart className="absolute h-8 w-8 animate-ping text-pink-500" aria-hidden="true" />
                <Heart className="relative z-10 h-10 w-10 fill-current text-[#7c4db8]" aria-hidden="true" />
              </div>
              <span className="text-sm text-slate-500 font-serif">Mapping relational synastry charts...</span>
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
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: reading }}
            />
          )}
        </div>
      )}
    </div>
  );
}
