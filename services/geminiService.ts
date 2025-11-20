import { GoogleGenAI, Type, Content } from "@google/genai";
import type { Recipe, DietaryFilter } from '../types';
import { DIETARY_FILTERS } from "../constants";

// Correct Vite env variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is missing. Add it inside .env.local");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });

const textRecipeSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    description: { type: Type.STRING },
    prepTime: { type: Type.STRING },
    calories: { type: Type.STRING },
    difficulty: { type: Type.STRING },
    category: { type: Type.STRING },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          quantity: { type: Type.STRING }
        },
        required: ["name", "quantity"]
      }
    },
    steps: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["name", "description", "prepTime", "calories", "difficulty", "category", "ingredients", "steps"]
};

const multiRecipeSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      description: { type: Type.STRING },
      prepTime: { type: Type.STRING },
      calories: { type: Type.STRING },
      difficulty: { type: Type.STRING },
      category: { type: Type.STRING },
      dietaryTags: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      ingredients: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            quantity: { type: Type.STRING },
            present: { type: Type.BOOLEAN }
          },
          required: ["name", "quantity", "present"]
        }
      },
      steps: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ["name", "description", "prepTime", "calories", "difficulty", "category", "dietaryTags", "ingredients", "steps"]
  }
};

const shoppingListSchema = {
  type: Type.OBJECT,
  properties: {
    "Produce": { type: Type.ARRAY, items: { type: Type.STRING } },
    "Dairy & Eggs": { type: Type.ARRAY, items: { type: Type.STRING } },
    "Meat & Seafood": { type: Type.ARRAY, items: { type: Type.STRING } },
    "Pantry Staples": { type: Type.ARRAY, items: { type: Type.STRING } },
    "Bakery": { type: Type.ARRAY, items: { type: Type.STRING } },
    "Frozen Foods": { type: Type.ARRAY, items: { type: Type.STRING } },
    "Beverages": { type: Type.ARRAY, items: { type: Type.STRING } },
    "Other": { type: Type.ARRAY, items: { type: Type.STRING } }
  }
};

export const categorizeShoppingList = async (items: string[]) => {
  if (!items.length) return {};

  const prompt = `Categorize these grocery items: ${items.join(", ")}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: shoppingListSchema
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch {
    return { Uncategorized: items };
  }
};

export const generateRecipeFromText = async (prompt: string): Promise<Recipe> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Create a recipe for: "${prompt}".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: textRecipeSchema
    }
  });

  const recipeData = JSON.parse(response.text.trim());
  return { ...recipeData, ingredients: recipeData.ingredients.map((ing: any) => ({ ...ing, present: false })) };
};

export const getRecipesFromImage = async (imageFile: File, filters: DietaryFilter[]) => {
  const base64Image = await fileToBase64(imageFile);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: imageFile.type,
            data: base64Image
          }
        },
        {
          text: `Analyze this fridge image and create 12 recipes.`
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: multiRecipeSchema
    }
  });

  return JSON.parse(response.text.trim());
};

export interface ChatbotResponse {
  text: string;
}

let chatHistory: Content[] = [
  { role: "model", parts: [{ text: "Hello! I am FridgeFriend. Ask me anything about cooking!" }] }
];

export const getChatbotResponse = async (message: string): Promise<ChatbotResponse> => {
  const userMessage: Content = { role: "user", parts: [{ text: message }] };
  const conversation = [...chatHistory, userMessage];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: conversation
  });

  const reply = response.text;
  chatHistory.push(userMessage, { role: "model", parts: [{ text: reply }] });

  return { text: reply };
};
