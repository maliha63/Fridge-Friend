import React from 'react';
import type { Recipe, AppView } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';

interface HistoryProps {
  recipes: Recipe[];
  setView: (view: AppView) => void;
  setGeneratedRecipe: (recipe: Recipe | null) => void;
}

const History: React.FC<HistoryProps> = ({ recipes, setView, setGeneratedRecipe }) => {
    const handleRecipeClick = (recipe: Recipe) => {
        setGeneratedRecipe(recipe);
        setView('detail');
    }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 animate-fade-in">
        <div className="flex items-center space-x-3 mb-6">
            <BookOpenIcon className="w-8 h-8 text-cyan-400"/>
            <h1 className="text-3xl font-bold text-white">Recipe History</h1>
        </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        {recipes.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            You haven't generated any recipes yet. Your history will appear here.
          </p>
        ) : (
          <ul className="space-y-4">
            {recipes.map((recipe, index) => (
              <li key={`${recipe.name}-${index}`} className="animate-fade-in">
                <button 
                    onClick={() => handleRecipeClick(recipe)}
                    className="w-full text-left p-4 bg-gray-900 rounded-lg hover:bg-gray-700 border border-transparent hover:border-cyan-500 transition-all duration-300 group"
                >
                  <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">{recipe.name}</h3>
                  <p className="text-sm text-gray-400 mt-1 line-clamp-2">{recipe.description}</p>
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