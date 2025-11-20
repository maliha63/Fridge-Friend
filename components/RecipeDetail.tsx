
import React, { useState, useMemo } from 'react';
import type { Recipe } from '../types';
import XIcon from './icons/XIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ExclamationTriangleIcon from './icons/ExclamationTriangleIcon';

interface RecipeDetailProps {
  recipe: Recipe;
  onStartCooking: () => void;
  onClose: () => void;
  onAddToShoppingList: (item: string) => void;
}

const DifficultyBadge: React.FC<{ difficulty: 'Easy' | 'Medium' | 'Hard' }> = ({ difficulty }) => {
    const color = {
        Easy: 'bg-green-500/20 text-green-300 border border-green-500/30',
        Medium: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
        Hard: 'bg-red-500/20 text-red-300 border border-red-500/30',
    }[difficulty];
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}>{difficulty}</span>;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onStartCooking, onClose, onAddToShoppingList }) => {
    const [addedItems, setAddedItems] = useState<string[]>([]);

    const missingIngredients = useMemo(() => recipe.ingredients.filter(ing => !ing.present), [recipe.ingredients]);
    
    const unaddedMissingIngredients = useMemo(() => 
        missingIngredients.filter(ing => !addedItems.includes(ing.name)),
        [missingIngredients, addedItems]
    );

    const handleAddToList = (ingredientName: string) => {
        onAddToShoppingList(ingredientName);
        setAddedItems(prev => [...prev, ingredientName]);
    };

    const handleAddAllMissing = () => {
        const itemsToAdd = unaddedMissingIngredients.map(ing => ing.name);
        itemsToAdd.forEach(name => onAddToShoppingList(name));
        setAddedItems(prev => [...new Set([...prev, ...itemsToAdd])]);
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in p-4" aria-modal="true" role="dialog">
            <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col">
                {/* Added 'relative' here so the absolute 'close' button positions relative to this header, not the scrolling container */}
                <div className="p-6 md:p-8 sticky top-0 bg-gray-800 z-10 border-b border-gray-700 relative">
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors shadow-lg z-50 hover:scale-110" 
                        aria-label="Close recipe details"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                    <h2 className="text-3xl font-extrabold text-white pr-12">{recipe.name}</h2>
                    <p className="mt-2 text-gray-400">{recipe.description}</p>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
                        <DifficultyBadge difficulty={recipe.difficulty} />
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span>{recipe.prepTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            <span>{recipe.calories} kcal</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Ingredients</h3>
                            {unaddedMissingIngredients.length > 0 && (
                                <button 
                                    onClick={handleAddAllMissing}
                                    className="text-xs bg-cyan-800 hover:bg-cyan-700 text-cyan-200 font-semibold py-1 px-3 rounded-md transition-colors"
                                >
                                    Add All Missing
                                </button>
                            )}
                        </div>
                        <ul className="space-y-3">
                            {recipe.ingredients.map(ing => (
                                <li key={ing.name} className="flex items-center justify-between text-gray-300 bg-gray-700/50 p-3 rounded-lg">
                                    <div className="flex items-center">
                                        {ing.present ? <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" /> : <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />}
                                        <span><span className="font-semibold text-white">{ing.quantity}</span> {ing.name}</span>
                                    </div>
                                    {!ing.present && (
                                        <button 
                                            onClick={() => handleAddToList(ing.name)} 
                                            disabled={addedItems.includes(ing.name)}
                                            className="text-xs bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-1 px-3 rounded-md transition-colors flex-shrink-0 ml-2"
                                        >
                                            {addedItems.includes(ing.name) ? 'Added' : 'Add'}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Instructions</h3>
                        <ol className="space-y-4 text-gray-300">
                            {recipe.steps.map((step, index) => (
                                <li key={index} className="flex">
                                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-cyan-500 text-gray-900 font-bold text-sm mr-4 flex-shrink-0 mt-1">{index + 1}</span>
                                    <p className="leading-relaxed">{step}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                
                <div className="p-6 md:p-8 mt-auto sticky bottom-0 bg-gray-800 z-10 border-t border-gray-700">
                    <div className="text-center">
                        <button onClick={onStartCooking} className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg">
                            Start Cooking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
