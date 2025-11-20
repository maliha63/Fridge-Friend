
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Recipe, AppView, DietaryFilter, ShoppingListItem, ChatMessage } from './types';
import { getRecipesFromImage } from './services/geminiService';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import CookingMode from './components/CookingMode';
import ShoppingList from './components/ShoppingList';
import FilterSidebar from './components/FilterSidebar';
import History from './components/History';
import RecipeGeneratorChatbot from './components/RecipeGeneratorChatbot';
import SparklesIcon from './components/icons/SparklesIcon';
import LoadingView from './components/LoadingView';

const BackgroundDecoration = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-cyan-500/10 blur-3xl animate-fade-in" />
        <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full bg-brand-purple/10 blur-3xl animate-fade-in" />
    </div>
);


const App: React.FC = () => {
  const [view, setView] = useState<AppView>('upload');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(() => {
    const saved = localStorage.getItem('shoppingList');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Basic check to handle migration from old string[] format
      if (parsed.length > 0 && typeof parsed[0] === 'string') {
        return parsed.map((name: string) => ({ name, purchased: false }));
      }
      return parsed;
    }
    return [];
  });
  const [recipeHistory, setRecipeHistory] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('recipeHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<DietaryFilter[]>([]);
  const [activeCategoryFilters, setActiveCategoryFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Chatbot State - Lifted to App to persist history
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
      {
          role: 'model',
          text: 'Hello! I am FridgeFriend, your personal culinary assistant. You can ask me for recipe ideas, cooking tips, or any other culinary questions.'
      }
  ]);

  const [cookingStep, setCookingStep] = useState(0);

  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('recipeHistory', JSON.stringify(recipeHistory));
  }, [recipeHistory]);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setView('loading');
    try {
      const result = await getRecipesFromImage(file, activeDietaryFilters);
      setRecipes(result);
      setRecipeHistory(prevHistory => {
        const newRecipes = result.filter(
          newRecipe => !prevHistory.some(oldRecipe => oldRecipe.name === newRecipe.name)
        );
        const updatedHistory = [...newRecipes, ...prevHistory];
        return updatedHistory.slice(0, 50); 
      });
      setView('list');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setView('upload');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setView('detail');
  };

  const handleAddToShoppingList = (item: string) => {
    if (!shoppingList.find(i => i.name.toLowerCase() === item.toLowerCase())) {
        setShoppingList(prev => [...prev, { name: item, purchased: false }]);
    }
  };
  
  const handleToggleShoppingItem = (itemName: string) => {
    setShoppingList(prev =>
      prev.map(item =>
        item.name.toLowerCase() === itemName.toLowerCase()
          ? { ...item, purchased: !item.purchased }
          : item
      )
    );
  };
  
  const handleClearPurchasedItems = () => {
    setShoppingList(prev => prev.filter(item => !item.purchased));
  };


  const handleReset = () => {
    setView('upload');
    setRecipes([]);
    setSelectedRecipe(null);
    setError(null);
    setSearchQuery('');
  };

  const handleToggleDietaryFilter = (filter: DietaryFilter) => {
    setActiveDietaryFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };
  
  const handleToggleCategoryFilter = (filter: string) => {
    setActiveCategoryFilters(prev =>
        prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  }

  const handleNextCookingStep = useCallback(() => {
      if (selectedRecipe && cookingStep < selectedRecipe.steps.length - 1) {
          setCookingStep(prev => prev + 1);
      }
  }, [selectedRecipe, cookingStep]);

  const handlePrevCookingStep = useCallback(() => {
      if (cookingStep > 0) {
          setCookingStep(prev => prev - 1);
      }
  }, [cookingStep]);

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];
    
    let filtered = recipes;

    if (activeDietaryFilters.length > 0) {
        filtered = filtered.filter(recipe => {
            if (!recipe.dietaryTags || recipe.dietaryTags.length === 0) {
                return false;
            }
            return activeDietaryFilters.every(filter => recipe.dietaryTags?.includes(filter));
        });
    }

    if (activeCategoryFilters.length > 0) {
        filtered = filtered.filter(recipe => activeCategoryFilters.includes(recipe.category));
    }
    
    if (searchQuery) {
        filtered = filtered.filter(recipe =>
            recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }

    return filtered;

  }, [recipes, searchQuery, activeDietaryFilters, activeCategoryFilters]);
  
  const shoppingListCount = useMemo(() => shoppingList.filter(item => !item.purchased).length, [shoppingList]);

  const renderContent = () => {
    switch (view) {
      case 'upload':
        return <div className="container mx-auto p-4"><ImageUpload onImageUpload={handleImageUpload} error={error} /></div>;
      case 'loading':
        return <LoadingView />;
      case 'list':
        return (
          <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4 pt-2">
            <FilterSidebar 
                activeDietaryFilters={activeDietaryFilters} 
                onToggleDietaryFilter={handleToggleDietaryFilter}
                activeCategoryFilters={activeCategoryFilters}
                onToggleCategoryFilter={handleToggleCategoryFilter}
            />
            <div className="flex-grow w-full">
              <RecipeList 
                recipes={filteredRecipes} 
                onSelectRecipe={handleSelectRecipe} 
                onReset={handleReset}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                hasInitialRecipes={recipes.length > 0}
              />
            </div>
          </div>
        );
      case 'detail':
        if (!selectedRecipe) { setView('list'); return null; }
        return <RecipeDetail recipe={selectedRecipe} onStartCooking={() => { setCookingStep(0); setView('cooking'); }} onClose={() => setView('list')} onAddToShoppingList={handleAddToShoppingList}/>;
      case 'cooking':
        if (!selectedRecipe) { setView('list'); return null; }
        return <CookingMode 
                    recipe={selectedRecipe} 
                    onAddToShoppingList={handleAddToShoppingList} 
                    onBack={() => setView('detail')}
                    currentStep={cookingStep}
                    onNextStep={handleNextCookingStep}
                    onPrevStep={handlePrevCookingStep}
                />;
      case 'shopping':
        return <ShoppingList items={shoppingList} onToggleItem={handleToggleShoppingItem} onClearPurchased={handleClearPurchasedItems} />;
      case 'history':
        return <History recipes={recipeHistory} setView={setView} setGeneratedRecipe={setSelectedRecipe} />;
      default:
        return <div className="container mx-auto p-4"><ImageUpload onImageUpload={handleImageUpload} error={error} /></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative isolate overflow-hidden">
      <BackgroundDecoration />
      
      {/* Hide Header when in cooking mode to ensure full screen experience */}
      {view !== 'cooking' && (
        <Header currentView={view} setView={setView} shoppingListCount={shoppingListCount} hasRecipes={recipes.length > 0} />
      )}

      <main className="relative z-10 pb-24 pt-8">
        {renderContent()}
      </main>
      
      {!isChatbotOpen && view !== 'cooking' && (
          <button
              onClick={() => setIsChatbotOpen(true)}
              className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-brand-purple to-brand-pink shadow-2xl transition-all duration-300 hover:scale-110"
              aria-label="Open AI Recipe Generator"
          >
              <SparklesIcon className="w-8 h-8 text-white" />
          </button>
      )}
      
      {isChatbotOpen && (
          <RecipeGeneratorChatbot 
              onClose={() => setIsChatbotOpen(false)} 
              messages={chatMessages}
              setMessages={setChatMessages}
          />
      )}
    </div>
  );
};

export default App;
