import React from "react";

interface GetRecipeButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
  currentCount: number;
  minIngredients: number;
}

const GetRecipeButton: React.FC<GetRecipeButtonProps> = ({
  onClick,
  disabled,
  isLoading,
  currentCount,
  minIngredients,
}) => {
  const buttonText = isLoading
    ? "Generating..."
    : currentCount < minIngredients
    ? `Add ${minIngredients - currentCount} more ingredient${
        minIngredients - currentCount > 1 ? "s" : ""
      }`
    : "Get a Recipe";

  return (
    <button onClick={onClick} disabled={disabled} className="get-recipe-btn">
      {buttonText}
    </button>
  );
};

export default GetRecipeButton;
