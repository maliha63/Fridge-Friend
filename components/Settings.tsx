
import React, { useState } from 'react';
import UserIcon from './icons/UserIcon';
import DownloadIcon from './icons/DownloadIcon';
import SettingsIcon from './icons/SettingsIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XIcon from './icons/XIcon';
import TrashIcon from './icons/TrashIcon';

interface SettingsProps {
  canInstall: boolean;
  isInstalled: boolean;
  onInstall: () => void;
  onClearHistory: () => void;
  onClearFavorites: () => void;
  userName: string;
  onUpdateUserName: (name: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ 
    canInstall, 
    isInstalled, 
    onInstall, 
    onClearHistory, 
    onClearFavorites,
    userName,
    onUpdateUserName
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
      isOpen: boolean;
      title: string;
      message: string;
      onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const showToast = (msg: string) => {
      setNotification(msg);
      setTimeout(() => setNotification(null), 3000);
  };

  const handleStartEditing = () => {
      setTempName(userName);
      setIsEditing(true);
  };

  const handleSaveProfile = () => {
      if (tempName.trim()) {
          onUpdateUserName(tempName.trim());
          setIsEditing(false);
          showToast("Profile updated successfully!");
      }
  };

  const handleCancelEdit = () => {
      setTempName(userName);
      setIsEditing(false);
  };

  const handleInstallClick = () => {
      if (canInstall) {
          onInstall();
      } else {
          setShowInstallHelp(true);
      }
  };

  const openConfirmModal = (title: string, message: string, action: () => void) => {
      setConfirmModal({
          isOpen: true,
          title,
          message,
          onConfirm: () => {
              action();
              setConfirmModal(prev => ({ ...prev, isOpen: false }));
          }
      });
  };

  const handleClearHistoryConfirm = () => {
      onClearHistory();
      showToast("Recipe history cleared.");
  };

  const handleClearFavoritesConfirm = () => {
      onClearFavorites();
      showToast("Favorites list cleared.");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl animate-fade-in relative pb-24">
      <div className="flex items-center space-x-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-gray-300" />
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700/50 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-cyan-400" />
            Profile
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center shadow-lg flex-shrink-0 text-2xl font-bold text-white select-none">
               {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-grow">
              {isEditing ? (
                  <div className="flex items-center gap-2 animate-fade-in">
                      <input 
                        type="text" 
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="bg-gray-900 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 w-full max-w-[200px]"
                        autoFocus
                        placeholder="Enter name"
                      />
                      <button onClick={handleSaveProfile} className="p-2 text-green-400 hover:bg-gray-700 rounded-full transition-colors" title="Save">
                          <CheckCircleIcon className="w-6 h-6" />
                      </button>
                      <button onClick={handleCancelEdit} className="p-2 text-red-400 hover:bg-gray-700 rounded-full transition-colors" title="Cancel">
                          <XIcon className="w-6 h-6" />
                      </button>
                  </div>
              ) : (
                  <div className="animate-fade-in">
                      <p className="text-white font-medium text-lg">{userName}</p>
                      <p className="text-gray-400 text-sm">Using local storage</p>
                  </div>
              )}
            </div>
          </div>
          {!isEditing && (
              <button 
                onClick={handleStartEditing}
                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium hover:underline"
              >
                Edit Profile
              </button>
          )}
        </div>

        {/* App Data Section */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700/50 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
             <TrashIcon className="w-5 h-5 text-red-400" />
             App Data
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pb-4 border-b border-gray-700/50">
              <div>
                <p className="text-white font-medium">Recipe History</p>
                <p className="text-gray-400 text-sm">Clear your recently generated recipes</p>
              </div>
              <button 
                onClick={() => openConfirmModal(
                    "Clear History", 
                    "Are you sure you want to delete all your recipe history? This action cannot be undone.", 
                    handleClearHistoryConfirm
                )}
                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium whitespace-nowrap border border-red-500/20"
              >
                Clear History
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <p className="text-white font-medium">Favorites</p>
                <p className="text-gray-400 text-sm">Remove all saved recipes</p>
              </div>
              <button 
                onClick={() => openConfirmModal(
                    "Clear Favorites", 
                    "Are you sure you want to remove all favorite recipes? This action cannot be undone.", 
                    handleClearFavoritesConfirm
                )}
                className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium whitespace-nowrap border border-red-500/20"
              >
                Clear Favorites
              </button>
            </div>
          </div>
        </div>

        {/* PWA / App Info Section */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700/50 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <DownloadIcon className="w-5 h-5 text-green-400" />
            Application
          </h2>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
             <div>
                <p className="text-white font-medium">Install App</p>
                <p className="text-gray-400 text-sm">
                    {isInstalled 
                        ? "Application is currently installed on this device." 
                        : "Install FridgeFriend for a better experience."}
                </p>
             </div>
             
             {isInstalled ? (
                 <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">INSTALLED</span>
             ) : (
                <button 
                    onClick={handleInstallClick}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        canInstall 
                        ? 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-900/20' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                    }`}
                >
                    <DownloadIcon className="w-5 h-5" />
                    <span>{canInstall ? "Install App" : "How to Install"}</span>
                </button>
             )}
          </div>

          <div className="pt-4 border-t border-gray-700/50 text-center md:text-left">
            <p className="text-gray-500 text-xs">FridgeFriend v1.0.0</p>
            <p className="text-gray-600 text-[10px] mt-1">Designed with AI & Culinary Love</p>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl z-[60] animate-fade-in flex items-center gap-2 whitespace-nowrap border border-green-400/50">
            <CheckCircleIcon className="w-5 h-5" />
            <span className="font-medium">{notification}</span>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmModal.isOpen && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-sm w-full shadow-2xl transform scale-100 transition-all">
                    <h3 className="text-xl font-bold text-white mb-2">{confirmModal.title}</h3>
                    <p className="text-gray-300 mb-6">{confirmModal.message}</p>
                    <div className="flex justify-end gap-3">
                        <button 
                            onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                            className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={confirmModal.onConfirm}
                            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-bold shadow-lg shadow-red-900/20"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Install Help Modal */}
        {showInstallHelp && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setShowInstallHelp(false)}>
                <div 
                    className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-sm shadow-2xl relative flex flex-col max-h-[85vh]" 
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-5 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
                         <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <DownloadIcon className="w-5 h-5 text-cyan-400"/>
                            Install App
                        </h3>
                        <button onClick={() => setShowInstallHelp(false)} className="text-gray-400 hover:text-white p-1">
                            <XIcon className="w-5 h-5" />
                        </button>
                    </div>
                    
                    {/* Scrollable Content */}
                    <div className="p-5 overflow-y-auto space-y-4">
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Install for the best experience:
                        </p>
                        
                        <div className="space-y-3">
                            {/* iOS */}
                            <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 flex gap-3 items-start">
                                <div className="bg-gray-800 p-1.5 rounded text-gray-300 mt-0.5">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3L5 7M5 7L9 11M5 7H13C16.3137 7 19 9.68629 19 13V21" transform="rotate(90 12 12)" />
                                        <rect x="8" y="8" width="8" height="8" rx="1" /> 
                                        <path d="M12 15V3m0 0L8.5 6.5M12 3l3.5 3.5" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">iOS (Safari)</p>
                                    <p className="text-gray-400 text-xs mt-0.5">Tap <span className="text-cyan-400 font-medium">Share</span> → <span className="text-cyan-400 font-medium">Add to Home Screen</span></p>
                                </div>
                            </div>

                            {/* Android */}
                            <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 flex gap-3 items-start">
                                 <div className="bg-gray-800 p-1.5 rounded text-gray-300 mt-0.5">
                                     <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">Android (Chrome)</p>
                                    <p className="text-gray-400 text-xs mt-0.5">Tap <span className="text-cyan-400 font-medium">Menu</span> (3 dots) → <span className="text-cyan-400 font-medium">Install App</span></p>
                                </div>
                            </div>

                             {/* Desktop */}
                             <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700/50 flex gap-3 items-start">
                                <div className="bg-gray-800 p-1.5 rounded text-gray-300 mt-0.5">
                                    <DownloadIcon className="w-4 h-4"/>
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">Desktop</p>
                                    <p className="text-gray-400 text-xs mt-0.5">Click the <span className="text-cyan-400 font-medium">Install</span> icon in the address bar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="p-5 pt-0 mt-auto">
                         <button 
                            onClick={() => setShowInstallHelp(false)}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl transition-colors text-sm"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Settings;
