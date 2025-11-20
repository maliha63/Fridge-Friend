import React from 'react';
import type { DietaryFilter } from '../types';
import { DIETARY_FILTERS, CATEGORY_FILTERS } from '../constants';

interface FilterSidebarProps {
  activeDietaryFilters: DietaryFilter[];
  onToggleDietaryFilter: (filter: DietaryFilter) => void;
  activeCategoryFilters: string[];
  onToggleCategoryFilter: (filter: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ activeDietaryFilters, onToggleDietaryFilter, activeCategoryFilters, onToggleCategoryFilter }) => {
  return (
    <aside className="w-full md:w-64 bg-gray-800 p-4 rounded-lg md:p-6 md:min-h-[calc(100vh-132px)] flex-shrink-0">
      <h3 className="text-lg font-semibold text-white mb-4">Dietary Options</h3>
      <div className="space-y-3">
        {DIETARY_FILTERS.map(filter => (
          <label key={filter} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={activeDietaryFilters.includes(filter)}
              onChange={() => onToggleDietaryFilter(filter)}
              className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-600"
            />
            <span className="text-gray-300">{filter}</span>
          </label>
        ))}
      </div>
      
      <div className="border-t border-gray-700 my-6"></div>

      <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
      <div className="space-y-3">
        {CATEGORY_FILTERS.map(filter => (
          <label key={filter} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={activeCategoryFilters.includes(filter)}
              onChange={() => onToggleCategoryFilter(filter)}
              className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-cyan-500 focus:ring-cyan-600"
            />
            <span className="text-gray-300">{filter}</span>
          </label>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;