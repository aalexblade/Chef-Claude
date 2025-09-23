export function validateIngredient(newIngredient, ingredients) {
  if (!newIngredient.trim()) {
    return "Ingredient cannot be empty!";
  }
  if (
    ingredients.some((ing) => {
      const name = typeof ing === "string" ? ing : ing.name;
      return name.toLowerCase() === newIngredient.trim().toLowerCase();
    })
  ) {
    return "This ingredient is already in the list!";
  }
  return "";
}
