
import React from 'react';
import type { Recipe } from '../types';
import RecipeCard from './RecipeCard';
import SearchIcon from './icons/SearchIcon';

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onReset: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  hasInitialRecipes: boolean;
  isFavorite?: (recipe: Recipe) => boolean;
  onToggleFavorite?: (e: React.MouseEvent, recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelectRecipe, onReset, searchQuery, onSearchChange, hasInitialRecipes, isFavorite, onToggleFavorite }) => {
  if (!hasInitialRecipes) {
    return (
        <div className="text-center text-gray-400">
            <h2 className="text-2xl font-bold text-white mb-4">No Recipes Found</h2>
            <p>We couldn't generate any recipes from your photo. Please try again with a clearer image.</p>
            <button
                onClick={onReset}
                className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
                Try Again
            </button>
        </div>
    );
  }

  return (
    <div className="animate-fade-in w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap">Here's What You Can Make</h2>
            
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="relative flex-grow md:flex-grow-0 w-full md:w-64">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-gray-600 focus:border-transparent"
                        aria-label="Search recipes"
                    />
                </div>
                <button
                    onClick={onReset}
                    className="flex-1 md:flex-none bg-gray-700 hover:bg-gray-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors text-center whitespace-nowrap border border-gray-600 hover:border-gray-500"
                >
                    Upload New
                </button>
            </div>
        </div>
        
        {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                {recipes.map((recipe, index) => (
                <RecipeCard 
                    key={recipe.id || `${recipe.name}-${index}`} 
                    recipe={recipe} 
                    onSelectRecipe={onSelectRecipe} 
                    isFavorite={isFavorite ? isFavorite(recipe) : false}
                    onToggleFavorite={onToggleFavorite}
                />
                ))}
            </div>
        ) : (
            <div className="text-center text-gray-400 mt-16 bg-gray-800/50 rounded-xl p-8 border border-gray-700/50">
                <h2 className="text-xl font-bold text-white mb-2">No Matching Recipes</h2>
                <p>No recipes found for "{searchQuery}". Try a different search term.</p>
            </div>
        )}
    </div>
  );
};

export default RecipeList;
