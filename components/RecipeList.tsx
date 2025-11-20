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
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelectRecipe, onReset, searchQuery, onSearchChange, hasInitialRecipes }) => {
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
    <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-3xl font-bold text-white flex-shrink-0">Here's What You Can Make</h2>
            <div className="flex w-full md:w-auto items-center gap-4">
                <div className="relative flex-grow">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search by name or ingredient..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        aria-label="Search recipes"
                    />
                </div>
                <button
                    onClick={onReset}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex-shrink-0"
                >
                    Upload New
                </button>
            </div>
        </div>
        {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe, index) => (
                <RecipeCard key={`${recipe.name}-${index}`} recipe={recipe} onSelectRecipe={onSelectRecipe} />
                ))}
            </div>
        ) : (
            <div className="text-center text-gray-400 mt-16">
                <h2 className="text-2xl font-bold text-white mb-4">No Matching Recipes</h2>
                <p>No recipes found for "{searchQuery}". Try a different search term.</p>
            </div>
        )}
    </div>
  );
};

export default RecipeList;