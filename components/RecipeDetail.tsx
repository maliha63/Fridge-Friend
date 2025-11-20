
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
        <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center animate-fade-in bg-gray-900 md:bg-black/80" aria-modal="true" role="dialog">
            {/* Mobile: Full screen, Desktop: Centered Card */}
            <div className="bg-gray-800 w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl md:rounded-2xl shadow-2xl overflow-y-auto relative flex flex-col">
                
                {/* Header */}
                <div className="p-4 md:p-8 sticky top-0 bg-gray-800 z-20 border-b border-gray-700 shadow-md">
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 bg-gray-700 text-white hover:bg-red-600 hover:text-white rounded-full p-2 transition-all duration-200 shadow-lg z-50" 
                        aria-label="Close recipe details"
                    >
                        <XIcon className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white pr-12 leading-tight">{recipe.name}</h2>
                    <p className="mt-2 text-gray-400 text-sm md:text-base">{recipe.description}</p>
                    <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-300">
                        <DifficultyBadge difficulty={recipe.difficulty} />
                        <div className="flex items-center space-x-1 bg-gray-700/50 px-2 py-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span>{recipe.prepTime}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-gray-700/50 px-2 py-1 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            <span>{recipe.calories} kcal</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow overflow-y-auto">
                    <div>
                        <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-800 py-2 z-10">
                            <h3 className="text-xl font-bold text-white">Ingredients</h3>
                            {unaddedMissingIngredients.length > 0 && (
                                <button 
                                    onClick={handleAddAllMissing}
                                    className="text-xs bg-cyan-900/50 hover:bg-cyan-800 text-cyan-300 font-semibold py-1.5 px-3 rounded-md transition-colors border border-cyan-700/50"
                                >
                                    Add All Missing
                                </button>
                            )}
                        </div>
                        <ul className="space-y-3 pb-4">
                            {recipe.ingredients.map(ing => (
                                <li key={ing.name} className="flex items-center justify-between text-gray-300 bg-gray-700/30 p-3 rounded-lg hover:bg-gray-700/50 transition-colors">
                                    <div className="flex items-center flex-grow mr-2">
                                        {ing.present ? <CheckCircleIcon className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" /> : <ExclamationTriangleIcon className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />}
                                        <span className="text-sm md:text-base"><span className="font-semibold text-white">{ing.quantity}</span> {ing.name}</span>
                                    </div>
                                    {!ing.present && (
                                        <button 
                                            onClick={() => handleAddToList(ing.name)} 
                                            disabled={addedItems.includes(ing.name)}
                                            className={`text-xs font-bold py-1.5 px-3 rounded-md transition-colors flex-shrink-0 ml-2 ${
                                                addedItems.includes(ing.name) 
                                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                                                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm'
                                            }`}
                                        >
                                            {addedItems.includes(ing.name) ? 'In List' : 'Add'}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="pb-20 md:pb-0">
                        <h3 className="text-xl font-bold text-white mb-4 sticky top-0 bg-gray-800 py-2 z-10">Instructions</h3>
                        <ol className="space-y-6 text-gray-300">
                            {recipe.steps.map((step, index) => (
                                <li key={index} className="flex group">
                                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-700 text-cyan-400 font-bold text-sm mr-4 flex-shrink-0 border border-gray-600 group-hover:border-cyan-500 transition-colors">{index + 1}</span>
                                    <p className="leading-relaxed text-sm md:text-base pt-1 group-hover:text-gray-100 transition-colors">{step}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                
                {/* Footer Action */}
                <div className="p-4 md:p-6 mt-auto sticky bottom-0 bg-gray-800/95 backdrop-blur-sm z-20 border-t border-gray-700">
                    <button onClick={onStartCooking} className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-cyan-900/20 text-lg flex items-center justify-center space-x-2 transform active:scale-[0.98]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Start Cooking Mode</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
