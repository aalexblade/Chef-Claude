import React from "react";
import ReactMarkdown from "react-markdown";

interface ClaudeRecipeProps {
  recipe: string;
}

const ClaudeRecipe: React.FC<ClaudeRecipeProps> = ({ recipe }) => {
  return (
    <div className="claude-recipe">
      <h2 className="recipe-title">Recipe:</h2>
      <div className="recipe-content">
        <ReactMarkdown>{recipe}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ClaudeRecipe;

