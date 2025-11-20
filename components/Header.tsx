
import React from 'react';
import type { AppView } from '../types';
import FridgeIcon from './icons/FridgeIcon';
import ShoppingListIcon from './icons/ShoppingListIcon';
import BookOpenIcon from './icons/BookOpenIcon';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  shoppingListCount: number;
  hasRecipes: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, shoppingListCount, hasRecipes }) => {
    
    const isFridgeFlow = ['upload', 'loading', 'list', 'detail', 'cooking'].includes(currentView);
    const isShoppingFlow = currentView === 'shopping';
    const isHistoryFlow = currentView === 'history';

    const handleFridgeClick = () => {
        if (hasRecipes) {
            setView('list');
        } else {
            setView('upload');
        }
    };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 w-full">
      <div className="container mx-auto flex flex-wrap justify-between items-center p-4 border-b border-gray-700 gap-2">
        <button onClick={handleFridgeClick} className="text-xl md:text-2xl font-bold text-white tracking-tighter flex-shrink-0 flex items-center gap-2">
          <span>Fridge<span className="text-cyan-400">Friend</span></span>
        </button>
        <nav className="flex items-center space-x-1 md:space-x-2">
            <button
                onClick={handleFridgeClick}
                className={`flex items-center space-x-2 px-2 md:px-3 py-2 rounded-md text-sm font-medium transition-colors ${isFridgeFlow ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                aria-current={isFridgeFlow ? 'page' : undefined}
                title="My Fridge"
            >
                <FridgeIcon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden sm:inline">My Fridge</span>
            </button>
            <button
                onClick={() => setView('history')}
                className={`flex items-center space-x-2 px-2 md:px-3 py-2 rounded-md text-sm font-medium transition-colors ${isHistoryFlow ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                aria-current={isHistoryFlow ? 'page' : undefined}
                title="History"
            >
                <BookOpenIcon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden sm:inline">History</span>
            </button>
             <button
                onClick={() => setView('shopping')}
                className={`relative flex items-center space-x-2 px-2 md:px-3 py-2 rounded-md text-sm font-medium transition-colors ${isShoppingFlow ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                aria-current={isShoppingFlow ? 'page' : undefined}
                title="Shopping List"
            >
                <ShoppingListIcon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden sm:inline">Shopping List</span>
                {shoppingListCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-red-500 text-[10px] md:text-xs font-bold text-white">
                        {shoppingListCount}
                    </span>
                )}
            </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
