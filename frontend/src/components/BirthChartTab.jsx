import React, { useState } from 'react';
import { marked } from 'marked';
import { ChartNoAxesCombined, LoaderCircle, Orbit } from 'lucide-react';
import { requestJson } from '../config';

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
      const data = await requestJson('/api/birthchart', {
        method: 'POST',
        body: JSON.stringify({ name: name.trim(), date, time, place: place.trim() }),
      });
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
        <h2 className="text-3xl font-serif text-[#33256e]">Birth Chart Interpretation</h2>
        <p className="text-slate-500">Enter your birth coordinates to compile a simulated Vedic & Western planetary natal profile using AI.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-8 items-start">
        {/* Form Card */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4 border border-slate-100 bg-white p-6 rounded-3xl shadow-sm">
          <div>
            <label htmlFor="bc-name" className="block text-sm font-semibold text-slate-600 mb-1">Full Name</label>
            <input 
              type="text" 
              id="bc-name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Orion Smith" 
              className="w-full bg-[#faf9fd] border border-slate-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-300 rounded-xl px-4 py-2 text-[#17152b] placeholder-slate-400 outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="bc-date" className="block text-sm font-semibold text-slate-600 mb-1">Birth Date</label>
            <input 
              type="date" 
              id="bc-date" 
              required 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#faf9fd] border border-slate-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-300 rounded-xl px-4 py-2 text-[#17152b] outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="bc-time" className="block text-sm font-semibold text-slate-600 mb-1">Birth Time</label>
            <input 
              type="time" 
              id="bc-time" 
              required 
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-[#faf9fd] border border-slate-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-300 rounded-xl px-4 py-2 text-[#17152b] outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="bc-place" className="block text-sm font-semibold text-slate-600 mb-1">Birth Location</label>
            <input 
              type="text" 
              id="bc-place" 
              required 
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="e.g. New York, USA" 
              className="w-full bg-[#faf9fd] border border-slate-200 focus:border-purple-400 focus:ring-1 focus:ring-purple-300 rounded-xl px-4 py-2 text-[#17152b] placeholder-slate-400 outline-none transition-colors"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#33256e] hover:bg-[#4a3598] text-white font-serif font-semibold py-3 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-purple-200/60"
          >
            <ChartNoAxesCombined className="inline-block mr-2 h-4 w-4 align-[-3px]" aria-hidden="true" />
            Cast Birth Chart
          </button>
        </form>

        {/* Reading Results */}
        <div className="md:col-span-3 border border-slate-100 bg-white rounded-3xl p-6 min-h-[380px] flex flex-col justify-center relative overflow-hidden shadow-sm">
          {/* Empty State */}
          {!hasSubmitted && (
            <div className="text-center space-y-3 py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 text-[#d79b2b] mb-2">
                <Orbit className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl text-[#17152b]">Your Natal Map Awaits</h3>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">Provide your details to map the planetary alignments at the exact moment of your birth.</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <LoaderCircle className="h-10 w-10 animate-spin text-[#d79b2b]" aria-label="Loading birth chart" />
              <div className="text-center">
                <h4 className="font-serif text-lg text-[#17152b]">Configuring Celestial Houses...</h4>
                <p className="text-xs text-slate-500 mt-1">Retrieving planetary coordinates from Gemini API</p>
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
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: reading }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
