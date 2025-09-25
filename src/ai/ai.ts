import { HfInference } from "@huggingface/inference";

// --- Prompt for HF ---
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY as string;
const BASE_URL = "https://api.spoonacular.com/recipes/findByIngredients";

// --- Tupe of Spoonacular ---
export interface SpoonacularIngredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  image: string;
}

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  usedIngredients: SpoonacularIngredient[];
  missedIngredients: SpoonacularIngredient[];
  [key: string]: any;
}

// --- fn from Spoonacular ---
export async function getRecipeFromChefClaude(
  ingredientsArr: string[]
): Promise<string> {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await fetch(
      `${BASE_URL}?ingredients=${encodeURIComponent(
        ingredientsString
      )}&number=1&ranking=1&apiKey=${SPOONACULAR_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipe from Spoonacular");
    }

    const data: SpoonacularRecipe[] = await response.json();

    if (!data.length) {
      return "Sorry, no recipes found with those ingredients.";
    }

    const recipe = data[0];
    return `**${recipe.title}**\n![Image](${recipe.image})\n\nYou can find more info about this recipe [here](https://spoonacular.com/recipes/${recipe.title.replace(
      /\s+/g,
      "-"
    )}-${recipe.id})`;
  } catch (err) {
    console.error("Spoonacular API error:", err);
    return "Oops! Something went wrong while fetching the recipe.";
  }
}

// --- Hugging Face ---
const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN as string);

export interface HFChatChoiceMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface HFChatCompletionChoice {
  message: HFChatChoiceMessage;
  [key: string]: any;
}

export interface HFChatCompletionResponse {
  choices: HFChatCompletionChoice[];
  [key: string]: any;
}

// --- Функція для Hugging Face ---
export async function getRecipeFromMistral(
  ingredientsArr: string[]
): Promise<string | undefined> {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = (await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    })) as HFChatCompletionResponse;

    return response.choices[0].message.content;
  } catch (err: any) {
    console.error(err.message);
    return undefined;
  }
}


