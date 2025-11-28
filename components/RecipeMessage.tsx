
import React from 'react';
import type { Recipe } from '../types';

const RecipeMessage: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <div className="mt-3 border-t border-brand-border pt-3 text-left">
        <h4 className="font-bold text-base text-brand-text-primary mb-1">{recipe.name}</h4>
        <p className="text-xs text-brand-text-secondary mb-3">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs">
            <div className="flex items-center">
                <span className="font-semibold text-brand-text-secondary mr-1.5">Time:</span>
                <span className="text-brand-text-primary">{recipe.prepTime}</span>
            </div>
            <div className="flex items-center">
                <span className="font-semibold text-brand-text-secondary mr-1.5">Difficulty:</span>
                <span className="text-brand-text-primary">{recipe.difficulty}</span>
            </div>
             <div className="flex items-center">
                <span className="font-semibold text-brand-text-secondary mr-1.5">Calories:</span>
                <span className="text-brand-text-primary">{recipe.calories.replace(/ ?kcal/i, '')} kcal</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h5 className="font-semibold text-sm text-brand-text-primary mb-2">Ingredients</h5>
                <ul className="list-disc list-inside text-xs text-brand-text-secondary space-y-1">
                {recipe.ingredients.map(ing => <li key={ing.name} className="pl-1">{ing.quantity} {ing.name}</li>)}
                </ul>
            </div>
            <div>
                <h5 className="font-semibold text-sm text-brand-text-primary mb-2">Instructions</h5>
                 <ol className="space-y-3 text-xs text-brand-text-secondary">
                    {recipe.steps.map((step, i) => (
                        <li key={i} className="flex">
                            <span className="flex items-center justify-center h-4 w-4 rounded-full bg-brand-purple text-brand-background font-bold text-[10px] mr-2.5 flex-shrink-0 mt-0.5">{i + 1}</span>
                            <p>{step}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    </div>
  );
};

export default RecipeMessage;
