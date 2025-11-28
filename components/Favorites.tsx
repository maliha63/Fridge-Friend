
import React, { useState } from 'react';
import type { Recipe } from '../types';
import RecipeCard from './RecipeCard';
import HeartIcon from './icons/HeartIcon';
import SearchIcon from './icons/SearchIcon';

interface FavoritesProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (e: React.MouseEvent, recipe: Recipe) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ recipes, onSelectRecipe, onToggleFavorite }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 pt-2 pb-8 w-full max-w-7xl animate-fade-in">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center space-x-3">
                <HeartIcon className="w-8 h-8 text-brand-pink" filled />
                <h1 className="text-3xl font-bold text-white">Favorite Recipes</h1>
            </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md">
             <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                </span>
                <input
                    type="text"
                    placeholder="Search favorites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-pink border border-gray-700 focus:border-brand-pink/50 transition-colors"
                />
            </div>
        </div>

        {recipes.length === 0 ? (
            <div className="text-center text-gray-400 py-16 bg-gray-800/30 rounded-2xl border border-gray-700/50 border-dashed flex flex-col items-center">
                <HeartIcon className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No favorites yet</h3>
                <p className="max-w-md">Save delicious recipes here by clicking the heart icon on any recipe card.</p>
            </div>
        ) : filteredRecipes.length === 0 ? (
             <div className="text-center text-gray-400 py-12">
                <p>No favorites found matching "{searchQuery}".</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredRecipes.map((recipe, index) => (
                <RecipeCard 
                    key={recipe.id || `${recipe.name}-${index}`} 
                    recipe={recipe} 
                    onSelectRecipe={onSelectRecipe}
                    isFavorite={true}
                    onToggleFavorite={onToggleFavorite}
                />
                ))}
            </div>
        )}
    </div>
  );
};

export default Favorites;
