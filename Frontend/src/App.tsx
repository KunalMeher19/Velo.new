import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Terminal, Github } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import {Home} from './pages/Home';
import {Response} from './pages/Response';

function Header() {
  return (
    <header className="border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          <span className="font-bold text-xl"></span>
        </div>
        <a
          href="https://github.com/stackblitz/bolt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <Github className="w-5 h-5" />
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
}

// function Footer() {
//   return (
//     <footer className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#0A0A0A]/80 backdrop-blur-sm">
//       <div className="container mx-auto px-4 py-4 text-center text-white/50">
//       </div>
//     </footer>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/response" element={<Response />} />
          </Routes>
        </AnimatePresence>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;