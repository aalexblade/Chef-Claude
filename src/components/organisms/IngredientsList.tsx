import React from "react";
import ClearButton from "../atoms/ClearButton";
import GetRecipeButton from "../atoms/GetRecipeButton";
import IngredientsHint from "../atoms/IngredientsHint";

interface IngredientsListProps {
  ingredients: string[];
  getRecipe: () => void;
  removeIngredient: (ingredient: string) => void;
  clearIngredients: () => void;
  isLoading: boolean;
}

const IngredientsList: React.FC<IngredientsListProps> = ({
  ingredients,
  getRecipe,
  removeIngredient,
  isLoading,
  clearIngredients,
}) => {
  const MIN_INGREDIENTS = 4;
  const isGetRecipeDisabled = isLoading || ingredients.length < MIN_INGREDIENTS;

  const ingredientsListItems = ingredients.map((ingredient) => (
    <li key={ingredient} className="ingredient-item">
      <span className="ingredient-name">{ingredient}</span>
      <button
        onClick={() => removeIngredient(ingredient)}
        aria-label={`Remove ${ingredient}`}
        className="remove-ingredient-btn"
        disabled={isLoading}
      >
        &times;
      </button>
    </li>
  ));

  if (ingredients.length === 0) {
    return (
      <section>
        <h2>Ingredients on Hand:</h2>
        <p>Please add ingredients to get a recipe!</p>
      </section>
    );
  }

  return (
    <section>
      <div className="ingredients-container">
      <h2>Ingredients on Hand:</h2>
        <ul className="ingredients-list" aria-live="polite">
          {ingredientsListItems}
        </ul>

        <div className="ingredients-actions">
          <ClearButton
            onClick={clearIngredients}
            disabled={isLoading}
            count={ingredients.length}
          />

          <GetRecipeButton
            onClick={getRecipe}
            disabled={isGetRecipeDisabled}
            isLoading={isLoading}
            currentCount={ingredients.length}
            minIngredients={MIN_INGREDIENTS}
          />
        </div>

        <IngredientsHint
          currentCount={ingredients.length}
          minIngredients={MIN_INGREDIENTS}
        />
      </div>
    </section>
  );
};

export default IngredientsList;
