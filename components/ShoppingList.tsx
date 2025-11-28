import React, { useState, useEffect, useMemo } from 'react';
import type { ShoppingListItem } from '../types';
import { categorizeShoppingList } from '../services/geminiService';
import ShoppingListIcon from './icons/ShoppingListIcon';
import LoadingSpinner from './icons/LoadingSpinner';

interface ShoppingListProps {
  items: ShoppingListItem[];
  onToggleItem: (itemName: string) => void;
  onClearPurchased: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ items, onToggleItem, onClearPurchased }) => {
  const [categorizedItems, setCategorizedItems] = useState<Record<string, string[]> | null>(null);
  const [isCategorizing, setIsCategorizing] = useState(false);

  const itemNamesJson = useMemo(() => JSON.stringify(items.map(i => i.name).sort()), [items]);

  useEffect(() => {
    const itemNames = JSON.parse(itemNamesJson);
    if (itemNames.length > 0) {
      setIsCategorizing(true);
      categorizeShoppingList(itemNames)
        .then(setCategorizedItems)
        .catch(() => setCategorizedItems({ "Uncategorized": itemNames }))
        .finally(() => setIsCategorizing(false));
    } else {
      setCategorizedItems(null);
      setIsCategorizing(false);
    }
  }, [itemNamesJson]);

  const purchasedItemsCount = items.filter(i => i.purchased).length;

  const renderContent = () => {
    if (items.length === 0) {
      return (
        <p className="text-center text-gray-400 py-8">
          Your shopping list is empty. Add missing ingredients from a recipe to see them here.
        </p>
      );
    }

    if (isCategorizing) {
      return (
        <div className="flex flex-col justify-center items-center py-16 gap-4">
          <svg className="animate-spin h-10 w-10 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-300 text-lg">Categorizing your list...</p>
        </div>
      );
    }

    const itemStatusMap = new Map(items.map(i => [i.name.toLowerCase(), i.purchased]));
    const categoryOrder = ["Produce", "Meat & Seafood", "Dairy & Eggs", "Bakery", "Pantry Staples", "Frozen Foods", "Beverages", "Other", "Uncategorized"];
    
    const sortedCategories = categorizedItems ? Object.keys(categorizedItems).sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    }) : [];

    return (
      <div className="space-y-6">
        {sortedCategories.map(category => (
          <div key={category} className="animate-fade-in">
            <h3 className="text-xl font-semibold text-cyan-400 mb-3 border-b-2 border-gray-700 pb-2">{category}</h3>
            <ul className="space-y-3">
              {categorizedItems![category].map((itemName) => {
                const isPurchased = !!itemStatusMap.get(itemName.toLowerCase());
                return (
                  <li key={itemName} className={`flex items-center bg-gray-700 p-3 rounded-md transition-opacity duration-300 ${isPurchased ? 'opacity-60' : 'opacity-100'}`}>
                    <input
                      id={`item-${itemName}`}
                      type="checkbox"
                      checked={isPurchased}
                      onChange={() => onToggleItem(itemName)}
                      className="h-5 w-5 rounded bg-gray-600 border-gray-500 text-cyan-500 focus:ring-cyan-600 cursor-pointer"
                      aria-label={`Mark ${itemName} as purchased`}
                    />
                    <label
                      htmlFor={`item-${itemName}`}
                      className={`ml-3 text-lg text-gray-200 capitalize cursor-pointer transition-all ${isPurchased ? 'line-through text-gray-400' : ''}`}
                    >
                      {itemName}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <ShoppingListIcon className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">My Shopping List</h2>
        </div>
        {purchasedItemsCount > 0 && (
          <button
            onClick={onClearPurchased}
            className="bg-red-800 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm animate-fade-in"
            aria-label={`Clear ${purchasedItemsCount} purchased items`}
          >
            Clear {purchasedItemsCount} Purchased
          </button>
        )}
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-xl p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ShoppingList;