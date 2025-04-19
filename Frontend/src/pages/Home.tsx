import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Home() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    navigate('/response', { state: { prompt } });
  };

  return (
    <motion.main 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1, ease: 'easeIn' } }}
      exit={{ opacity: 0, y: -30, transition: { duration: 1, ease: 'easeIn' } }}
      className="container mx-auto px-28 py-44 flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
        The AI-powered <br />
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          developer companion
        </span>
      </h1>
      
      <p className="text-white/70 text-center max-w-2xl mb-12 text-lg">
        Meet your AI pair programmer. Ask questions, get explanations, and solve problems together.
      </p>

      <div className="w-full max-w-3xl">
        <form onSubmit={handlePromptSubmit} className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the website you want to build..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          <button
            type="submit"
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md ${
              prompt ? 'text-white bg-blue-500 hover:bg-blue-600' : 'text-white/30 bg-white/5'
            } transition-all`}
            disabled={!prompt}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </motion.main>
  );
}
