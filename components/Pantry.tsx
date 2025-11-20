import React, { useState } from 'react';
import PantryIcon from './icons/PantryIcon';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

interface PantryProps {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const Pantry: React.FC<PantryProps> = ({ items, setItems }) => {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems(prev => [...prev, newItem.trim()].sort());
      setNewItem('');
    }
  };

  const handleRemoveItem = (itemToRemove: string) => {
    setItems(prev => prev.filter(item => item !== itemToRemove));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center space-x-3 mb-6">
          <PantryIcon className="w-8 h-8 text-accent"/>
          <h1 className="text-3xl font-bold text-white">My Pantry</h1>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        <form onSubmit={handleAddItem} className="flex items-center gap-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add an ingredient..."
            className="flex-grow p-3 bg-gray-900 border-2 border-border rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button type="submit" className="bg-accent hover:bg-accent-dark text-background font-bold p-3 rounded-lg flex items-center justify-center transition-colors">
            <PlusIcon className="w-6 h-6"/>
          </button>
        </form>

        {items.length === 0 ? (
          <p className="text-center text-gray-400 py-8">
            Your pantry is empty. Add ingredients you often have on hand.
          </p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item} className="flex items-center justify-between bg-gray-900 p-3 rounded-md animate-fade-in">
                <span className="text-gray-200 capitalize">{item}</span>
                <button onClick={() => handleRemoveItem(item)} className="text-gray-500 hover:text-red-400 transition-colors">
                  <TrashIcon className="w-5 h-5"/>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pantry;
