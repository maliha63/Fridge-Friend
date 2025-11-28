
import React, { useState, useEffect } from 'react';
import { COOKING_FACTS } from '../constants';

const loadingMessages = [
  "Analyzing your fridge's contents...",
  "Consulting with our master chefs...",
  "Sourcing the finest digital ingredients...",
  "Preheating the AI ovens...",
  "Simmering up some delicious ideas...",
  "Plating your recipes now...",
  "Calibrating the flavor matrix...",
  "Unlocking culinary secrets from your fridge...",
  "Cross-referencing with global flavor profiles...",
  "Whipping up some algorithmic deliciousness...",
  "Decoding your ingredients' potential...",
  "Assembling pixel-perfect recipe cards...",
  "Generating taste-bud-tingling text...",
  "Chopping data, not onions...",
  "Our AI is having a 'Eureka!' moment."
];

const LoadingView: React.FC = () => {
  const [currentFact, setCurrentFact] = useState('');
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    setCurrentFact(COOKING_FACTS[Math.floor(Math.random() * COOKING_FACTS.length)]);
    
    const factInterval = setInterval(() => {
      setCurrentFact(prev => {
        let nextFact;
        do {
          nextFact = COOKING_FACTS[Math.floor(Math.random() * COOKING_FACTS.length)];
        } while (nextFact === prev);
        return nextFact;
      });
    }, 5000);

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setCurrentMessage(loadingMessages[messageIndex]);
    }, 2500);

    return () => {
      clearInterval(factInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
      <svg className="w-24 h-24" viewBox="0 0 100 100">
          <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#8c52ff" />
              </linearGradient>
          </defs>
          <circle 
              className="animate-loader-stroke"
              cx="50" 
              cy="50" 
              r="40" 
              stroke="url(#gradient)" 
              strokeWidth="8" 
              fill="none" 
              strokeLinecap="round" 
          />
      </svg>

      <div className="mt-8 h-16 w-full max-w-lg relative">
        <div key={currentMessage} className="animate-fade-in absolute inset-0 flex items-center justify-center">
            <p className="text-white text-2xl font-bold">{currentMessage}</p>
        </div>
      </div>
      
      <div className="mt-12 w-full max-w-xl min-h-[120px] flex items-center justify-center bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm transition-all duration-500">
        <div key={currentFact} className="animate-fade-in flex flex-col items-center text-center w-full">
          <p className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Fun Fact</p>
          <p className="text-cyan-300 text-lg md:text-xl font-medium leading-relaxed">{currentFact}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingView;
