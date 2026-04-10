
import React from 'react';

const RecipeSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800/50 rounded-xl shadow-lg overflow-hidden border border-gray-700/50 animate-pulse">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 bg-gray-700 rounded-full w-16"></div>
          <div className="h-5 bg-gray-700 rounded-full w-20"></div>
        </div>
        <div className="space-y-2 mb-6">
          <div className="h-3 bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-700 rounded w-5/6"></div>
        </div>
        <div className="flex justify-between border-t border-gray-700/50 pt-4 mt-auto">
          <div className="h-4 bg-gray-700 rounded w-16"></div>
          <div className="h-4 bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSkeleton;
