
import React from 'react';
import type { AppView } from '../types';
import FridgeIcon from './icons/FridgeIcon';
import ShoppingListIcon from './icons/ShoppingListIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import HeartIcon from './icons/HeartIcon';
import SettingsIcon from './icons/SettingsIcon';
import InstallPWA from './InstallPWA';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  shoppingListCount: number;
  hasRecipes: boolean;
  isLoading: boolean;
  canInstallPWA: boolean;
  isPWAInstalled: boolean;
  onInstallPWA: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    currentView, 
    setView, 
    shoppingListCount, 
    hasRecipes, 
    isLoading,
    canInstallPWA,
    isPWAInstalled,
    onInstallPWA
}) => {
    
    const isFridgeFlow = ['upload', 'loading', 'list', 'detail', 'cooking'].includes(currentView);
    const isShoppingFlow = currentView === 'shopping';
    const isHistoryFlow = currentView === 'history';
    const isFavoritesFlow = currentView === 'favorites';
    const isSettingsFlow = currentView === 'settings';

    const handleFridgeClick = () => {
        if (isLoading) {
            setView('loading');
        } else if (hasRecipes) {
            setView('list');
        } else {
            setView('upload');
        }
    };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-gray-700/50">
      <div className="container mx-auto flex flex-wrap justify-between items-center p-3 md:p-4 gap-2">
        <button onClick={handleFridgeClick} className="text-xl md:text-2xl font-bold text-white tracking-tighter flex-shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span>Fridge<span className="text-cyan-400">Friend</span></span>
        </button>
        <nav className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
            <InstallPWA 
                canInstall={canInstallPWA} 
                isInstalled={isPWAInstalled} 
                onInstall={onInstallPWA}
                className="hidden md:flex" 
            />

            <button
                onClick={handleFridgeClick}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isFridgeFlow ? 'bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
                title="My Fridge"
            >
                <div className="relative">
                   <FridgeIcon className="w-5 h-5" />
                   {isLoading && (
                       <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                        </span>
                   )}
                </div>
                <span className="hidden sm:inline">{isLoading ? 'Analyzing...' : 'My Fridge'}</span>
            </button>
            
            <button
                onClick={() => setView('favorites')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isFavoritesFlow ? 'bg-brand-pink/10 text-brand-pink ring-1 ring-brand-pink/20' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
                title="Favorites"
            >
                <HeartIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Favorites</span>
            </button>

            <button
                onClick={() => setView('history')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isHistoryFlow ? 'bg-purple-500/10 text-brand-purple ring-1 ring-purple-500/20' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
                title="History"
            >
                <BookOpenIcon className="w-5 h-5" />
                <span className="hidden sm:inline">History</span>
            </button>
            
             <button
                onClick={() => setView('shopping')}
                className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isShoppingFlow ? 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
                title="Shopping List"
            >
                <ShoppingListIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Shopping List</span>
                {shoppingListCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-gray-900">
                        {shoppingListCount}
                    </span>
                )}
            </button>

            <button
                onClick={() => setView('settings')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isSettingsFlow ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}`}
                title="Settings"
            >
                <SettingsIcon className="w-5 h-5" />
            </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
