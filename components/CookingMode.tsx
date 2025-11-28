
import React, { useEffect } from 'react';
import type { Recipe } from '../types';
import XIcon from './icons/XIcon';
import SpeakerIcon from './icons/SpeakerIcon';

interface CookingModeProps {
  recipe: Recipe;
  onAddToShoppingList: (item: string) => void;
  onBack: () => void;
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const CookingMode: React.FC<CookingModeProps> = ({ recipe, onBack, currentStep, onNextStep, onPrevStep }) => {
  const currentStepText = recipe.steps[currentStep];

  useEffect(() => {
    // Stop any ongoing speech when the component unmounts or the step changes
    speechSynthesis.cancel();
  }, [currentStep, recipe]);

  const handleSpeak = () => {
    if ('speechSynthesis' in window && currentStepText) {
      speechSynthesis.cancel(); // Stop any previous utterance
      const utterance = new SpeechSynthesisUtterance(`Step ${currentStep + 1}. ${currentStepText}`);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const handleNextOrFinish = () => {
    if (currentStep >= recipe.steps.length - 1) {
      onBack();
    } else {
      onNextStep();
    }
  };

  const progressPercentage = ((currentStep + 1) / recipe.steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-gray-900 z-[60] flex flex-col animate-fade-in h-screen w-full">
      {/* Header - Fixed Height */}
      <header className="flex items-center justify-between p-4 md:p-6 flex-shrink-0 border-b border-gray-800 bg-gray-900 z-10 relative">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-cyan-400 truncate max-w-[200px] md:max-w-md">{recipe.name}</h2>
          <p className="text-sm text-gray-400">Step {currentStep + 1} of {recipe.steps.length}</p>
        </div>
        <button 
            onClick={onBack} 
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 hover:scale-105 transition-all shadow-lg" 
            aria-label="Exit cooking mode"
        >
          <span className="font-bold">Exit</span>
          <XIcon className="w-6 h-6 text-white" />
        </button>
      </header>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-700 h-1.5 flex-shrink-0">
        <div className="bg-cyan-500 h-1.5 transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      {/* Content - Scrollable */}
      <main className="flex-grow overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-center text-center relative">
        <div className="max-w-4xl w-full my-auto">
            <span className="inline-block mb-6 text-8xl font-bold text-gray-800 select-none opacity-20">{currentStep + 1}</span>
            <p className="text-2xl md:text-4xl md:leading-relaxed font-bold text-white leading-normal">{currentStepText || 'Recipe Complete!'}</p>
        </div>
      </main>

      {/* Footer - Fixed at bottom */}
      <footer className="flex items-center justify-between gap-4 p-4 md:p-6 flex-shrink-0 bg-gray-900 border-t border-gray-800 z-10 relative">
        <button
          onClick={onPrevStep}
          disabled={currentStep === 0}
          className="flex-1 px-4 py-3 md:px-6 md:py-4 bg-gray-800 text-white font-bold rounded-lg transition-colors hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-base md:text-lg border border-gray-700"
        >
          Previous
        </button>
        
        <button onClick={handleSpeak} className="p-3 md:p-4 bg-cyan-600/20 text-cyan-400 rounded-full hover:bg-cyan-600 hover:text-white transition-colors border border-cyan-500/30" aria-label="Read step aloud">
          <SpeakerIcon className="h-6 w-6 md:h-8 md:w-8" />
        </button>

        <button
          onClick={handleNextOrFinish}
          className="flex-1 px-4 py-3 md:px-6 md:py-4 bg-cyan-600 text-white font-bold rounded-lg transition-colors hover:bg-cyan-700 text-base md:text-lg shadow-lg shadow-cyan-900/20"
        >
          {currentStep >= recipe.steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </footer>
    </div>
  );
};

export default CookingMode;
