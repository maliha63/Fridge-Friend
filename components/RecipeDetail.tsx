
import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Recipe } from '../types';
import XIcon from './icons/XIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ExclamationTriangleIcon from './icons/ExclamationTriangleIcon';
import PlusIcon from './icons/PlusIcon';
import HeartIcon from './icons/HeartIcon';

interface RecipeDetailProps {
  recipe: Recipe;
  onStartCooking: () => void;
  onClose: () => void;
  onAddToShoppingList: (item: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (e: React.MouseEvent | null, recipe: Recipe) => void;
}

const DifficultyBadge: React.FC<{ difficulty: 'Easy' | 'Medium' | 'Hard' }> = ({ difficulty }) => {
    const color = {
        Easy: 'bg-green-500/20 text-green-300 border border-green-500/30',
        Medium: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
        Hard: 'bg-red-500/20 text-red-300 border border-red-500/30',
    }[difficulty];
    return <span className={`px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-full ${color}`}>{difficulty}</span>;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onStartCooking, onClose, onAddToShoppingList, isFavorite = false, onToggleFavorite }) => {
    const [addedItems, setAddedItems] = useState<string[]>([]);

    const availableIngredients = useMemo(() => recipe.ingredients.filter(ing => ing.present), [recipe.ingredients]);
    const missingIngredientsList = useMemo(() => recipe.ingredients.filter(ing => !ing.present), [recipe.ingredients]);
    
    const unaddedMissingIngredients = useMemo(() => 
        missingIngredientsList.filter(ing => !addedItems.includes(ing.name)),
        [missingIngredientsList, addedItems]
    );

    useEffect(() => {
        // Lock body scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleAddToList = (ingredientName: string) => {
        onAddToShoppingList(ingredientName);
        setAddedItems(prev => [...prev, ingredientName]);
    };

    const handleAddAllMissing = () => {
        const itemsToAdd = unaddedMissingIngredients.map(ing => ing.name);
        itemsToAdd.forEach(name => onAddToShoppingList(name));
        setAddedItems(prev => [...new Set([...prev, ...itemsToAdd])]);
    };
    
    const handleToggleFav = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onToggleFavorite) onToggleFavorite(e, recipe);
    };

    const modalContent = (
        <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in" 
                onClick={onClose}
            ></div>

            {/* Modal Scroll Container */}
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                {/* Card */}
                <div 
                    className="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-900 text-left shadow-2xl transition-all border border-gray-700 animate-fade-in flex flex-col"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Close Button - Floating */}
                    <div className="absolute top-4 right-4 z-20 flex gap-3">
                         {onToggleFavorite && (
                            <button
                                onClick={handleToggleFav}
                                className="rounded-full bg-black/40 p-2 text-gray-300 hover:bg-gray-800 hover:text-brand-pink focus:outline-none backdrop-blur-md transition-all duration-200 group"
                                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            >
                                <HeartIcon filled={isFavorite} className={`h-6 w-6 transition-transform group-hover:scale-110 ${isFavorite ? 'text-brand-pink' : ''}`} />
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="rounded-full bg-black/40 p-2 text-gray-300 hover:bg-red-600 hover:text-white focus:outline-none backdrop-blur-md transition-all duration-200 group"
                            aria-label="Close"
                        >
                             <XIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    {/* Header Section */}
                    <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 p-6 sm:p-10 pb-8 border-b border-gray-800">
                         {/* Decorative background blob */}
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10 pr-8">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <DifficultyBadge difficulty={recipe.difficulty} />
                                <div className="flex items-center space-x-1.5 text-sm font-medium text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <span>{recipe.prepTime}</span>
                                </div>
                                <div className="flex items-center space-x-1.5 text-sm font-medium text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700/50">
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                    </svg>
                                    <span>{recipe.calories.replace(/ ?kcal/i, '')} kcal</span>
                                </div>
                            </div>
                            
                            <h2 id="modal-title" className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                                {recipe.name}
                            </h2>
                            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
                                {recipe.description}
                            </p>
                        </div>
                    </div>

                    {/* Body Section */}
                    <div className="p-6 sm:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                            {/* Left Col: Ingredients */}
                            <div className="lg:col-span-5 flex flex-col gap-8">
                                <div>
                                    <div className="flex justify-between items-end mb-4">
                                        <h3 className="text-xl font-bold text-white">Ingredients</h3>
                                        {unaddedMissingIngredients.length > 0 && (
                                            <button 
                                                onClick={handleAddAllMissing}
                                                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                                            >
                                                <PlusIcon className="w-3.5 h-3.5" />
                                                Add All Missing
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-6">
                                        {availableIngredients.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <CheckCircleIcon className="w-4 h-4" /> Ready
                                                </h4>
                                                <ul className="space-y-2">
                                                    {availableIngredients.map(ing => (
                                                        <li key={ing.name} className="flex items-start p-3 rounded-xl bg-gray-800/50 border border-gray-700/50">
                                                            <span className="text-green-400 mt-0.5 mr-2.5"><CheckCircleIcon className="w-4 h-4" /></span>
                                                            <span className="text-gray-300 text-sm">
                                                                <span className="font-bold text-white">{ing.quantity}</span> {ing.name}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {missingIngredientsList.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <ExclamationTriangleIcon className="w-4 h-4" /> Missing
                                                </h4>
                                                <ul className="space-y-2">
                                                    {missingIngredientsList.map(ing => (
                                                        <li key={ing.name} className="flex items-center justify-between p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 transition-colors group">
                                                            <div className="flex items-start mr-3 min-w-0">
                                                                <span className="text-orange-400 mt-0.5 mr-2.5 flex-shrink-0"><ExclamationTriangleIcon className="w-4 h-4" /></span>
                                                                <span className="text-gray-300 text-sm truncate">
                                                                    <span className="font-bold text-white">{ing.quantity}</span> {ing.name}
                                                                </span>
                                                            </div>
                                                            <button 
                                                                onClick={() => handleAddToList(ing.name)} 
                                                                disabled={addedItems.includes(ing.name)}
                                                                className={`flex-shrink-0 p-1.5 rounded-lg transition-all ${
                                                                    addedItems.includes(ing.name) 
                                                                    ? 'bg-green-500/20 text-green-400 cursor-default' 
                                                                    : 'bg-gray-700 text-cyan-400 hover:bg-cyan-600 hover:text-white shadow-sm'
                                                                }`}
                                                                title={addedItems.includes(ing.name) ? "Added to list" : "Add to shopping list"}
                                                            >
                                                                {addedItems.includes(ing.name) ? <CheckCircleIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Instructions */}
                            <div className="lg:col-span-7">
                                <h3 className="text-xl font-bold text-white mb-6">Instructions</h3>
                                <div className="space-y-4 relative">
                                    <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-800 hidden md:block"></div>
                                    {recipe.steps.map((step, index) => (
                                        <div key={index} className="flex relative group">
                                            <div className="flex-shrink-0 mr-4 md:mr-6 relative z-10">
                                                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 border-2 border-gray-600 text-gray-400 font-bold text-sm group-hover:border-cyan-500 group-hover:text-cyan-400 transition-colors shadow-sm">
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <div className="bg-gray-800/30 p-4 md:p-5 rounded-xl border border-gray-800 group-hover:bg-gray-800/80 group-hover:border-gray-700 transition-all flex-grow">
                                                <p className="text-gray-300 leading-relaxed">{step}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-900/80 p-6 sm:px-10 border-t border-gray-800 sticky bottom-0 z-10 backdrop-blur-xl">
                        <button 
                            onClick={onStartCooking} 
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-cyan-900/20 text-lg flex items-center justify-center space-x-3 transform active:scale-[0.99] hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Start Cooking Mode</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default RecipeDetail;
