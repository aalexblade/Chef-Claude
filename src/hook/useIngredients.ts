import { useState, useRef } from "react";

  const useIngredients = (initialIngredients: string[] = []) => {
  const [ingredients, setIngredients] = useState<string[]>(initialIngredients);
  const [inputIngredient, setInputIngredient] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [duplicateError, setDuplicateError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addIngredient = (): void => {
    const newIngredient = inputIngredient.trim();
    setError(null);
    setDuplicateError(null);

    if (newIngredient === "") return;

    if (!/[a-zA-Z]/.test(newIngredient)) {
      setError("Ingredient must contain letters (A-Z).");
      return;
    }

    const MAX_INGREDIENTS = 10;
    if (ingredients.length >= MAX_INGREDIENTS) {
      setError(`Maximum ${MAX_INGREDIENTS} ingredients allowed. Please clear some.`);
      return;
    }

    const normalizedNewIngredient = newIngredient.toLowerCase();
    const isDuplicate = ingredients.some(
      (ing) => ing.toLowerCase() === normalizedNewIngredient
    );

    if (isDuplicate) {
      setDuplicateError(`Ingredient "${newIngredient}" is already in your list.`);
      return;
    }

    setIngredients((prev) => [...prev, newIngredient]);
    setInputIngredient("");
    inputRef.current?.focus();
  };

  const removeIngredient = (ingredientToRemove: string): void => {
    setIngredients((prev) => prev.filter((ing) => ing !== ingredientToRemove));
    setError(null);
    setDuplicateError(null);
  };

  const clearIngredients = (): void => {
    setIngredients([]);
    setError(null);
    setDuplicateError(null);
    inputRef.current?.focus();
  };

  return {
    ingredients,
    inputIngredient,
    setInputIngredient,
    addIngredient,
    removeIngredient,
    clearIngredients,
    error,
    duplicateError,
    inputRef,
  };
};

export default useIngredients