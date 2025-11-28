import { GoogleGenAI, Type, Content } from "@google/genai";
import type { Recipe, DietaryFilter } from '../types';
import { DIETARY_FILTERS } from "../constants";

// Use VITE_ prefix for Vite environment variables
const API_KEY = process.env.VITE_GEMINI_API_KEY || "";
if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY is not set. Some features may not work.");
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
      name: { type: Type.STRING, description: 'Creative and appetizing name for the dish.' },
      description: { type: Type.STRING, description: 'A brief, enticing description of the dish (2-3 sentences).' },
      prepTime: { type: Type.STRING, description: 'Estimated total preparation and cooking time, e.g., "45 mins".' },
      calories: { type: Type.STRING, description: 'Estimated calories per serving, as a number string, e.g., "450".' },
      difficulty: { type: Type.STRING, description: 'The difficulty of the recipe, one of: "Easy", "Medium", or "Hard".' },
      category: { type: Type.STRING, description: 'The category for the dish, choose from: Breakfast, Lunch, Dinner, Snack, Juice, Starter, Roast, Dessert.' },
      ingredients: {
        type: Type.ARRAY,
        description: 'List of all ingredients required for the recipe.',
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: 'Name of the ingredient.' },
            quantity: { type: Type.STRING, description: 'Quantity and unit, e.g., "2 cups" or "1 tbsp".' },
          },
          required: ['name', 'quantity']
        }
      },
      steps: {
        type: Type.ARRAY,
        description: 'Step-by-step cooking instructions.',
        items: { type: Type.STRING }
      }
    },
    required: ['name', 'description', 'prepTime', 'calories', 'difficulty', 'category', 'ingredients', 'steps']
};


const multiRecipeSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: 'Creative and appetizing name for the dish.' },
      description: { type: Type.STRING, description: 'Concise description (1 sentence).' },
      prepTime: { type: Type.STRING, description: 'Time, e.g., "45 mins".' },
      calories: { type: Type.STRING, description: 'Calories, e.g., "450".' },
      difficulty: { type: Type.STRING, description: 'Difficulty: "Easy", "Medium", "Hard".' },
      category: { type: Type.STRING, description: 'Category: Breakfast, Lunch, Dinner, Snack, Juice, Starter, Roast, Dessert.' },
      dietaryTags: {
        type: Type.ARRAY,
        description: `List of dietary classifications. Options: ${DIETARY_FILTERS.join(', ')}.`,
        items: {
          type: Type.STRING
        }
      },
      ingredients: {
        type: Type.ARRAY,
        description: 'List of ingredients.',
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: 'Name.' },
            quantity: { type: Type.STRING, description: 'Qty.' },
            present: { type: Type.BOOLEAN, description: 'True if in image.' },
          },
          required: ['name', 'quantity', 'present']
        }
      },
      steps: {
        type: Type.ARRAY,
        description: 'Cooking steps.',
        items: { type: Type.STRING }
      }
    },
    required: ['name', 'description', 'prepTime', 'calories', 'difficulty', 'category', 'dietaryTags', 'ingredients', 'steps']
  }
};

const shoppingListSchema = {
    type: Type.OBJECT,
    properties: {
        "Produce": { type: Type.ARRAY, items: { type: Type.STRING }, description: "Fresh fruits and vegetables." },
        "Dairy & Eggs": { type: Type.ARRAY, items: { type: Type.STRING }, description: "Milk, cheese, yogurt, butter, eggs." },
        "Meat & Seafood": { type: Type.ARRAY, items: { type: Type.STRING }, description: "Fresh or packaged meat, poultry, and seafood." },
        "Pantry Staples": { type: Type.ARRAY, items: { type: Type.STRING }, description: "Flour, sugar, oil, spices, canned goods, pasta, rice, condiments." },
        "Bakery": { type: Type.ARRAY, items: { type: Type.STRING }, description: "Bread, bagels, pastries." },
        "Frozen Foods": { type: Type.ARRAY, items: { type: Type.STRING }, description: "Frozen meals, vegetables, fruits, and desserts." },
        "Beverages": { type: Type.ARRAY, items: { type: Type.STRING }, description: "Juice, soda, water, coffee, tea." },
        "Other": { type: Type.ARRAY, items: { type: Type.STRING }, description: "Items that do not fit into other categories." },
    },
};

export const categorizeShoppingList = async (items: string[]): Promise<Record<string, string[]>> => {
    if (items.length === 0) {
        return {};
    }
    const prompt = `You are an expert grocery shopper. Categorize the following shopping list items into logical grocery store aisles. The item list is: ${items.join(', ')}. Provide the output as a JSON object that strictly follows the provided schema. Each item from the list must appear in exactly one category. If a category has no items, do not include its key in the response.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: shoppingListSchema,
        }
    });

    try {
        return JSON.parse(response.text.trim());
    } catch (error) {
        console.error("Failed to parse shopping list categories:", error);
        return { "Uncategorized": items };
    }
};

export const generateRecipeFromText = async (prompt: string): Promise<Recipe> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert chef. Generate a single, complete, and creative recipe based on this user request: "${prompt}". Provide the output as a JSON object that strictly follows the provided schema. Do not include any markdown formatting or introductory text.`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: textRecipeSchema,
        }
    });

    try {
        const recipeData = JSON.parse(response.text.trim());
        return { ...recipeData, ingredients: recipeData.ingredients.map((ing: any) => ({...ing, present: false})) };
    } catch (error) {
        console.error("Failed to parse recipe from text response:", error);
        throw new Error("The AI failed to create a recipe for that request.");
    }
};


export const getRecipesFromImage = async (imageFile: File, filters: DietaryFilter[]): Promise<Recipe[]> => {
  const base64Image = await fileToBase64(imageFile);

  const imagePart = {
    inlineData: {
      mimeType: imageFile.type,
      data: base64Image,
    },
  };

  const dietFilterText = filters.length > 0 ? `It must adhere to the following dietary restrictions: ${filters.join(', ')}.` : "There are no dietary restrictions.";

  const textPart = {
    text: `You are an expert culinary AI.
    1. Identify edible ingredients in the fridge image.
    2. Generate 12 diverse and creative recipes using these ingredients.
    3. Include a strong variety of Indian cuisine as well as other global styles.
    4. Assign exactly one category (Breakfast, Lunch, Dinner, Snack, etc.) to each.
    5. Mark ingredients as present: true/false.
    6. ${dietFilterText}
    7. Populate 'dietaryTags'.
    8. Output strict JSON matching the schema. Keep descriptions concise to optimize speed.`,
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
    config: {
      responseMimeType: 'application/json',
      responseSchema: multiRecipeSchema,
    }
  });

  const jsonText = response.text.trim();
  try {
    const parsedJson = JSON.parse(jsonText);
    if (!Array.isArray(parsedJson) || parsedJson.length === 0) {
        throw new Error("No recipes were generated. Please try a different image.");
    }

    return parsedJson as Recipe[];

  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    console.error("Raw response text:", jsonText);
    throw new Error("The AI returned an unexpected response format. Please try again.");
  }
};

export interface ChatbotResponse {
    text: string;
}

// We will manage history manually for a more stable, stateless chat implementation.
let chatHistory: Content[] = [
    { role: 'model', parts: [{ text: 'Hello! I am FridgeFriend, your personal culinary assistant. You can ask me for recipe ideas, cooking tips, or any other culinary questions.' }] }
];

export const getChatbotResponse = async (newMessage: string): Promise<ChatbotResponse> => {
    const userMessageContent: Content = { role: 'user', parts: [{ text: newMessage }] };
    const conversationForApi: Content[] = [...chatHistory, userMessageContent];

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: conversationForApi,
            config: {
              systemInstruction: 'You are a helpful and friendly culinary assistant named FridgeFriend. Answer cooking-related questions conversationally. Provide creative recipe ideas when asked, but do not format them as structured data or JSON.',
            },
        });

        const modelResponseText = response.text;
        const modelMessageContent: Content = { role: 'model', parts: [{ text: modelResponseText }] };
        
        // Update history for the next turn
        chatHistory.push(userMessageContent);
        chatHistory.push(modelMessageContent);

        return { text: modelResponseText };
    } catch(e) {
        console.error("Chat API call failed:", e);
        const errorMessage = "I'm sorry, I encountered an error. Please try asking again.";
        return { text: errorMessage };
    }
};