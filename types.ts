
export interface Ingredient {
  name: string;
  quantity: string;
  present?: boolean;
}

export interface Recipe {
  name:string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  prepTime: string;
  calories: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl?: string;
  category: string;
  dietaryTags?: string[];
}

export interface ShoppingListItem {
  name: string;
  purchased: boolean;
}

export type AppView = 'upload' | 'loading' | 'list' | 'detail' | 'cooking' | 'shopping' | 'history';

export type DietaryFilter = string;

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
