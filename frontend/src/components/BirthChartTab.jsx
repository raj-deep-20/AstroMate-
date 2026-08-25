import React, { useState } from 'react';
import { marked } from 'marked';

export default function BirthChartTab() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
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
      const response = await fetch('http://127.0.0.1:8000/api/birthchart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, date, time, place })
      });

      if (!response.ok) {
        throw new Error('Planetary alignment failed');
      }

      const data = await response.json();
      const htmlReading = marked.parse(data.reading);
      setReading(htmlReading);
    } catch (err) {
      setError(`Unable to cast chart: ${err.message}. Make sure backend is running!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-3xl font-serif text-cosmic-gold">Birth Chart Interpretation</h2>
        <p className="text-slate-300">Enter your birth coordinates to compile a simulated Vedic & Western planetary natal profile using AI.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8 items-start">
        {/* Form Card */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4 border border-white/10 bg-white/5 backdrop-blur-md p-6 rounded-3xl">
          <div>
            <label htmlFor="bc-name" class="block text-sm font-semibold text-slate-300 mb-1">Full Name</label>
            <input 
              type="text" 
              id="bc-name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Orion Smith" 
              class="w-full bg-white/10 border border-white/10 focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent rounded-xl px-4 py-2 text-white placeholder-slate-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="bc-date" class="block text-sm font-semibold text-slate-300 mb-1">Birth Date</label>
            <input 
              type="date" 
              id="bc-date" 
              required 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              class="w-full bg-white/10 border border-white/10 focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent rounded-xl px-4 py-2 text-white outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="bc-time" class="block text-sm font-semibold text-slate-300 mb-1">Birth Time</label>
            <input 
              type="time" 
              id="bc-time" 
              required 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              class="w-full bg-white/10 border border-white/10 focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent rounded-xl px-4 py-2 text-white outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="bc-place" class="block text-sm font-semibold text-slate-300 mb-1">Birth Location</label>
            <input 
              type="text" 
              id="bc-place" 
              required 
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="e.g. New York, USA" 
              class="w-full bg-white/10 border border-white/10 focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent rounded-xl px-4 py-2 text-white placeholder-slate-500 outline-none transition-colors"
            />
          </div>

          <button 
            type="submit" 
            class="w-full bg-gradient-to-r from-cosmic-accent to-purple-600 hover:from-pink-500 hover:to-purple-700 text-white font-serif font-semibold py-3 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-cosmic-accent/25 hover:shadow-cosmic-accent/40"
          >
            <i class="fa-solid fa-compass-drafting mr-2"></i>Cast Birth Chart
          </button>
        </form>

        {/* Reading Results */}
        <div className="md:col-span-3 border border-white/10 bg-white/5 backdrop-blur-md rounded-3xl p-6 min-h-[380px] flex flex-col justify-center relative overflow-hidden">
          {/* Empty State */}
          {!hasSubmitted && (
            <div className="text-center space-y-3 py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cosmic-gold/10 text-cosmic-gold mb-2">
                <i className="fa-solid fa-ring text-2xl"></i>
              </div>
              <h3 className="font-serif text-xl text-white">Your Natal Map Awaits</h3>
              <p className="text-sm text-slate-400 max-w-xs mx-auto">Provide your details to map the planetary alignments at the exact moment of your birth.</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <i className="fa-solid fa-spinner fa-spin text-4xl text-cosmic-gold"></i>
              <div className="text-center">
                <h4 className="font-serif text-lg text-white">Configuring Celestial Houses...</h4>
                <p className="text-xs text-slate-400 mt-1">Retrieving planetary coordinates from Gemini API</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-rose-400 py-4 text-center">
              <p>⚠️ {error}</p>
            </div>
          )}

          {/* Output Display */}
          {reading && (
            <div 
              className="prose max-w-none text-slate-200"
              dangerouslySetInnerHTML={{ __html: reading }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
