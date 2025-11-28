
import React from 'react';
import type { Recipe } from '../types';
import HeartIcon from './icons/HeartIcon';

interface RecipeCardProps {
  recipe: Recipe;
  onSelectRecipe: (recipe: Recipe) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent, recipe: Recipe) => void;
}

const DifficultyBadge: React.FC<{ difficulty: 'Easy' | 'Medium' | 'Hard' }> = ({ difficulty }) => {
    const color = {
        Easy: 'bg-green-500/20 text-green-300 border border-green-500/30',
        Medium: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
        Hard: 'bg-red-500/20 text-red-300 border border-red-500/30',
    }[difficulty];
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}>{difficulty}</span>;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelectRecipe, isFavorite = false, onToggleFavorite }) => {
  return (
    <div
      onClick={() => onSelectRecipe(recipe)}
      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out group hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 relative border border-gray-700/50 hover:border-gray-600"
    >
       {/* Favorite Button Overlay */}
       {onToggleFavorite && (
        <button 
            onClick={(e) => onToggleFavorite(e, recipe)}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-900/60 backdrop-blur-sm hover:bg-gray-700 transition-all group-hover:opacity-100 opacity-100 md:opacity-0"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
             <HeartIcon 
                filled={isFavorite} 
                className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'text-brand-pink scale-110' : 'text-gray-300 hover:text-brand-pink'}`} 
            />
        </button>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-2 pr-8">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">{recipe.name}</h3>
        </div>
        <div className="flex items-center gap-2 mb-3">
             <DifficultyBadge difficulty={recipe.difficulty} />
             <span className="text-xs text-gray-500 bg-gray-900/50 px-2 py-1 rounded-full border border-gray-700">{recipe.category}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5em]">{recipe.description}</p>
        <div className="flex justify-between text-sm text-gray-300 border-t border-gray-700/50 pt-4 mt-auto">
          <div className="flex items-center space-x-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{recipe.prepTime}</span>
          </div>
          <div className="flex items-center space-x-1.5">
             {/* Fire Icon for Calories */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
             <span className="font-medium">{recipe.calories.replace(/ ?kcal/i, '')} kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
