import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onSelectRecipe: (recipe: Recipe) => void;
}

const DifficultyBadge: React.FC<{ difficulty: 'Easy' | 'Medium' | 'Hard' }> = ({ difficulty }) => {
    const color = {
        Easy: 'bg-green-500/20 text-green-300 border border-green-500/30',
        Medium: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
        Hard: 'bg-red-500/20 text-red-300 border border-red-500/30',
    }[difficulty];
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}>{difficulty}</span>;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelectRecipe }) => {
  return (
    <div
      onClick={() => onSelectRecipe(recipe)}
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out group hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{recipe.name}</h3>
            <DifficultyBadge difficulty={recipe.difficulty} />
        </div>
        <p className="text-gray-400 text-sm mb-4 h-10 overflow-hidden">{recipe.description}</p>
        <div className="flex justify-between text-sm text-gray-300 border-t border-gray-700 pt-4">
          <div className="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center space-x-1">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
             <span>{recipe.calories} kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;