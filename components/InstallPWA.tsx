
import React from 'react';
import DownloadIcon from './icons/DownloadIcon';

interface InstallPWAProps {
  canInstall: boolean;
  isInstalled: boolean;
  onInstall: () => void;
  className?: string;
}

const InstallPWA: React.FC<InstallPWAProps> = ({ canInstall, isInstalled, onInstall, className }) => {
  if (isInstalled) return null;
  if (!canInstall) return null;

  return (
    <button
      onClick={onInstall}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 ring-1 ring-cyan-500/30 transition-all animate-fade-in whitespace-nowrap ${className || ''}`}
      title="Install App"
    >
      <DownloadIcon className="w-5 h-5" />
      <span className="hidden sm:inline">Install App</span>
    </button>
  );
};

export default InstallPWA;
