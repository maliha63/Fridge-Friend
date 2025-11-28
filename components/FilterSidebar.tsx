
import React, { useState } from 'react';
import type { DietaryFilter } from '../types';
import { DIETARY_FILTERS, CATEGORY_FILTERS } from '../constants';

interface FilterSidebarProps {
  activeDietaryFilters: DietaryFilter[];
  onToggleDietaryFilter: (filter: DietaryFilter) => void;
  activeCategoryFilters: string[];
  onToggleCategoryFilter: (filter: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ activeDietaryFilters, onToggleDietaryFilter, activeCategoryFilters, onToggleCategoryFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="w-full lg:w-64 bg-gray-800 rounded-lg flex-shrink-0 transition-all duration-300">
      {/* Mobile/Tablet Toggle Header */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex justify-between items-center p-4 text-white font-semibold hover:bg-gray-700 rounded-lg transition-colors"
      >
        <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-cyan-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>
          Filter Options
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {/* Content - Hidden on mobile unless open, always visible on LG */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block p-4 md:p-6 border-t border-gray-700 lg:border-none lg:min-h-[calc(100vh-132px)]`}>
        <h3 className="text-lg font-semibold text-white mb-4">Dietary Options</h3>
        <div className="space-y-3">
          {DIETARY_FILTERS.map(filter => (
            <label key={filter} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeDietaryFilters.includes(filter)}
                onChange={() => onToggleDietaryFilter(filter)}
                className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-600 focus:ring-offset-gray-800"
              />
              <span className="text-gray-300 group-hover:text-white transition-colors">{filter}</span>
            </label>
          ))}
        </div>
        
        <div className="border-t border-gray-700 my-6"></div>

        <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
        <div className="space-y-3">
          {CATEGORY_FILTERS.map(filter => (
            <label key={filter} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={activeCategoryFilters.includes(filter)}
                onChange={() => onToggleCategoryFilter(filter)}
                className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-600 focus:ring-offset-gray-800"
              />
              <span className="text-gray-300 group-hover:text-white transition-colors">{filter}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
