import React from "react";

interface IngredientsHintProps {
  currentCount: number;
  minIngredients: number;
}

const IngredientsHint: React.FC<IngredientsHintProps> = ({ currentCount, minIngredients }) => {
  if (currentCount >= minIngredients) return null;

  return (
    <p className="hint-message">
      💡 Add at least **{minIngredients - currentCount}** more ingredient
      {minIngredients - currentCount > 1 ? "s" : ""} to get a recipe.
    </p>
  );
};

export default IngredientsHint;
