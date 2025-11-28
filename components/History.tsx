
import React, { useState, useMemo } from 'react';
import type { Recipe, AppView } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import SearchIcon from './icons/SearchIcon';
import CalendarIcon from './icons/CalendarIcon';

interface HistoryProps {
  recipes: Recipe[];
  setView: (view: AppView) => void;
  setGeneratedRecipe: (recipe: Recipe | null) => void;
}

const History: React.FC<HistoryProps> = ({ recipes, setView, setGeneratedRecipe }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const handleRecipeClick = (recipe: Recipe) => {
        setGeneratedRecipe(recipe);
        setView('detail');
    }

    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe => {
            const matchesName = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
            let matchesDate = true;
            
            if (dateFilter) {
                if (recipe.createdAt) {
                    const recipeDate = new Date(recipe.createdAt).toISOString().split('T')[0];
                    matchesDate = recipeDate === dateFilter;
                } else {
                     // Exclude recipes without date if a date filter is applied
                     matchesDate = false;
                }
            }
            
            return matchesName && matchesDate;
        });
    }, [recipes, searchTerm, dateFilter]);

    const clearFilters = () => {
        setSearchTerm('');
        setDateFilter('');
    };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-3">
                <BookOpenIcon className="w-8 h-8 text-cyan-400"/>
                <h1 className="text-3xl font-bold text-white">Recipe History</h1>
            </div>
        </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                </span>
                <input
                    type="text"
                    placeholder="Search history..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-gray-700 focus:border-cyan-500 transition-colors"
                    aria-label="Search history by recipe name"
                />
            </div>
            <div className="relative min-w-[200px]">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                </span>
                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-gray-700 focus:border-cyan-500 transition-colors [color-scheme:dark]"
                    aria-label="Filter history by date"
                />
            </div>
            {(searchTerm || dateFilter) && (
                <button 
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium border border-gray-600"
                >
                    Clear
                </button>
            )}
        </div>

        {filteredRecipes.length === 0 ? (
            <div className="text-center text-gray-400 py-12 bg-gray-900/50 rounded-lg border border-gray-700/50 border-dashed">
                {recipes.length === 0 ? (
                    <p>You haven't generated any recipes yet. Your history will appear here.</p>
                ) : (
                    <p>No recipes found matching your filters.</p>
                )}
            </div>
        ) : (
          <ul className="space-y-4">
            {filteredRecipes.map((recipe, index) => (
              <li key={`${recipe.name}-${index}`} className="animate-fade-in">
                <button 
                    onClick={() => handleRecipeClick(recipe)}
                    className="w-full text-left p-4 bg-gray-900 rounded-lg hover:bg-gray-700 border border-transparent hover:border-cyan-500 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start gap-4">
                      <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">{recipe.name}</h3>
                          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{recipe.description}</p>
                      </div>
                      {recipe.createdAt && (
                          <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0 mt-1">
                              {new Date(recipe.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                      )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;
