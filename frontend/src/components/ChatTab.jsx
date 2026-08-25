import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { API_BASE_URL } from '../config';

export default function ChatTab() {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: 'Greetings, traveler of the cosmos! I am AstroMate, your celestial guide. Tell me: what questions do you have about the stars, planets, or your path today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: query }]);
    setLoading(true);

    // Prepare history payload for API (FastAPI backend expects { history: [...], message: "..." })
    const historyPayload = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          history: historyPayload,
          message: query
        })
      });

      if (!response.ok) {
        throw new Error('Cosmic block in telepathic connection');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'model', content: data.response }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev, 
        { 
          role: 'model', 
          content: `⚠️ Connection lost to the astral plane: ${err.message}. Check if server is running!` 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-3xl font-serif text-cosmic-gold">Consult AstroMate AI</h2>
        <p className="text-slate-300">Ask your personal astrologer anything about transits, career growth, love life, or cosmic alignment.</p>
      </div>

      <div className="border border-white/10 bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden flex flex-col h-[500px]">
        {/* Chat Header */}
        <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cosmic-accent to-cosmic-gold flex items-center justify-center text-white font-semibold">
              🔮
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0c003c]"></span>
          </div>
          <div>
            <h3 className="font-serif font-semibold text-white">AstroMate AI Astrologer</h3>
            <p className="text-[10px] text-emerald-400 font-medium tracking-wide uppercase font-sans">Connected to Gemini Cosmos</p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div 
                key={index} 
                className={`flex items-start space-x-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${isUser ? 'bg-cosmic-accent/20 text-cosmic-accent' : 'bg-white/10 text-slate-300'}`}>
                  {isUser ? '👤' : '🧙‍♂️'}
                </div>
                <div 
                  className={`border px-4 py-2.5 text-sm rounded-2xl ${
                    isUser 
                      ? 'bg-cosmic-accent/20 border-cosmic-accent/40 rounded-tr-none text-slate-100' 
                      : 'bg-white/5 border-white/10 rounded-tl-none text-slate-200 prose'
                  }`}
                >
                  {isUser ? (
                    msg.content
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) }} />
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-start space-x-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs flex-shrink-0">🧙‍♂️</div>
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-2.5 text-sm text-slate-400 flex items-center space-x-2">
                <i className="fa-solid fa-ellipsis fa-bounce text-cosmic-accent"></i>
                <span>Consulting planetary ephemeris...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5 flex items-center space-x-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required 
            placeholder="Ask about your future, career, stars..." 
            className="flex-1 bg-white/10 border border-white/10 focus:border-cosmic-accent focus:ring-1 focus:ring-cosmic-accent rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition-colors"
          />
          <button 
            type="submit" 
            className="bg-cosmic-accent hover:bg-pink-500 text-white p-3 rounded-xl transition-colors flex items-center justify-center w-12 h-12 shadow-lg shadow-cosmic-accent/20 active:scale-95"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
