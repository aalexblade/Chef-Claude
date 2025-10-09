import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";

interface RecipeSectionProps {
  recipe: string;
}

const RecipeSection: React.FC<RecipeSectionProps> = ({ recipe }) => {
  if (!recipe) return null;

  return (
    <section className="recipe-section">
      <div className="recipe-content-wrapper">
        <ClaudeRecipe recipe={recipe} />
      </div>
    </section>
  );
};

export default RecipeSection;
