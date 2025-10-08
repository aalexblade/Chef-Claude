import React, { useState, FormEvent } from "react";
import IngredientsList from "../organisms/IngredientsList";
import AddIngredientForm from "../molecules/AddIngredientForm";
import ErrorMessages from "../atoms/ErrorMessages";
import LoadingMessage from "../atoms/LoadingMessage";
import RecipeSection from "../organisms/RecipeSection";
import { getRecipeFromChefClaude } from "../../ai/ai";
import useIngredients from "../../hook/useIngredients";
import { useScrollToRef } from "../../hook/useScrollToRef";

const Main: React.FC = () => {
  const {
    ingredients,
    inputIngredient,
    setInputIngredient,
    addIngredient,
    removeIngredient,
    clearIngredients,
    error,
    duplicateError,
    inputRef,
  } = useIngredients([
    "chicken",
    "all the main spices",
    "corn",
    "heavy cream",
    "pasta",
  ]);

  const [recipe, setRecipe] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { ref: recipeRef, scrollToRef } = useScrollToRef<HTMLDivElement>();

  const handleGetRecipe = async (): Promise<void> => {
    if (ingredients.length === 0) return;

    setIsLoading(true);
    setRecipe("");

    try {
      const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
      setRecipe(recipeMarkdown);
      scrollToRef(); // скролимо до рецепту
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddIngredient = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addIngredient();
  };

  return (
    <main>
      <AddIngredientForm
        inputIngredient={inputIngredient}
        setInputIngredient={setInputIngredient}
        addIngredient={handleAddIngredient}
        inputRef={inputRef}
      />

      <ErrorMessages error={error} duplicateError={duplicateError} />

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={handleGetRecipe}
          removeIngredient={removeIngredient}
          isLoading={isLoading}
          clearIngredients={clearIngredients}
        />
      )}

      {isLoading && <LoadingMessage />}

      {recipe && !isLoading && (
        <div ref={recipeRef}>
          <RecipeSection
            recipe={recipe}
            onShare={() => alert("Shared!")}
            onSave={() => alert("Saved!")}
          />
        </div>
      )}
    </main>
  );
};

export default Main;
