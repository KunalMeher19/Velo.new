import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { ListOrdered, Code2, Play, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StepsList } from '../components/StepsList';
import { FileExplorer } from '../components/FileExplorer';
import { TabView } from '../components/TabView';
import { CodeEditor } from '../components/CodeEditor';
import { PreviewFrame } from '../components/PreviewFrame';
import { Step, FileItem, StepType } from '../types';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { parseXml } from '../steps';
import { useWebContainer } from '../hooks/useWebContainer';
import { FileNode } from '@webcontainer/api';
import { Loader } from '../components/Loader';

function Response() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [selectedFile, setSelectedFile] = useState('App.tsx');
  const [instruction, setInstruction] = useState('');

  const files = {
    'App.tsx': `import React from 'react';

function App() {
  return (
    <div>Hello World</div>
  );
}

export default App;`,
    'styles.css': `body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}`
  };

  const handleInstructionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim()) return;
    // Handle instruction submission here
    setInstruction('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex gap-6">
        {/* Steps Section - 35% width */}
        <div className="w-[35%] bg-white/5 rounded-lg p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <ListOrdered className="w-5 h-5" />
            Steps
          </h2>
          <div className="space-y-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-sm">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-2">Understanding the request</h3>
                <p className="text-white/70">First, let's analyze what needs to be done...</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-sm">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-2">Implementation steps</h3>
                <p className="text-white/70">Here's how we'll implement the solution...</p>
              </div>
            </motion.div>
          </div>

          {/* Instruction Input */}
          <div className="mt-auto pt-4 border-t border-white/10">
            <form onSubmit={handleInstructionSubmit} className="relative">
              <input
                type="text"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="Add more instructions..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
              <button
                type="submit"
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md ${
                  instruction ? 'text-white bg-blue-500 hover:bg-blue-600' : 'text-white/30 bg-white/5'
                } transition-all`}
                disabled={!instruction}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Code and Preview Section - 65% width */}
        <div className="w-[65%] bg-white/5 rounded-lg border border-white/10">
          <div className="border-b border-white/10">
            <div className="flex">
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-4 py-3 border-r border-white/10 ${
                  activeTab === 'code' ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4" />
                Code
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-2 px-4 py-3 border-r border-white/10 ${
                  activeTab === 'preview' ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                <Play className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>

          <div className="h-[600px]">
            {activeTab === 'code' ? (
              <div className="flex h-full">
                {/* File Explorer */}
                <div className="w-48 border-r border-white/10 p-2">
                  {Object.keys(files).map((file) => (
                    <button
                      key={file}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full text-left px-3 py-2 rounded ${
                        selectedFile === file
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {file}
                    </button>
                  ))}
                </div>

                {/* Editor Area */}
                <div className="flex-1">
                  <Editor
                    height="100%"
                    defaultLanguage="typescript"
                    theme="vs-dark"
                    value={files[selectedFile]}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      readOnly: true
                    }}
                  />
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white h-full w-full"
              >
                <iframe
                  title="preview"
                  className="w-full h-full"
                  src="about:blank"
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Response;