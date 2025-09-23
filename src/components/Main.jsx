import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import Modal from "./Modal";
import { getRecipeFromChefClaude } from "../ai";
import AddIngredientForm from "./AddIngredientForm";
import RecipeHistory from "./RecipeHistory";
import Loader from "./Loader";
import { validateIngredient } from "../utils/validation";
import { loadFromStorage, saveToStorage } from "../utils/storage";

export default function Main() {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [history, setHistory] = React.useState(() =>
    loadFromStorage("recipeHistory", [])
  );
  const [ingredients, setIngredients] = React.useState(() =>
    loadFromStorage("ingredients", [
      "chicken",
      "all the main spices",
      "corn",
      "heavy cream",
      "pasta",
    ])
  );
  const [recipe, setRecipe] = React.useState(() =>
    loadFromStorage("recipe", "")
  );
  const recipeSection = React.useRef(null);

  // Save to localStorage
  React.useEffect(() => {
    saveToStorage("ingredients", ingredients);
  }, [ingredients]);
  React.useEffect(() => {
    saveToStorage("recipe", recipe);
  }, [recipe]);

  React.useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  function removeIngredient(ingredientToRemove) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ing) => {
        const name = typeof ing === "string" ? ing : ing.name;
        return name !== ingredientToRemove;
      })
    );
  }

  const [loading, setLoading] = React.useState(false);
  async function getRecipe() {
    setLoading(true);
    const recipeMarkdown = await getRecipeFromChefClaude(ingredients);
    setRecipe(recipeMarkdown);
    setLoading(false);
  }

  const [error, setError] = React.useState("");
  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    const validationError = validateIngredient(newIngredient, ingredients);
    if (validationError) {
      setError(validationError);
      return;
    }
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      newIngredient.trim(),
    ]);
    setError("");
  }

  function deleteRecipe() {
    setRecipe("");
    setShowDeleteModal(false);
  }

  function restoreRecipe(index) {
    setRecipe(history[index]);
  }

  function deleteHistoryItem(index) {
    setHistory((prev) => {
      const newHistory = prev.filter((item, i) => {
        if (i === index) {
          if (
            typeof item === "string" &&
            item.includes("Tuna Balls In Tomato Sauce")
          ) {
            return false;
          }
        }
        return i !== index;
      });
      saveToStorage("recipeHistory", newHistory);
      return newHistory;
    });
  }

  return (
    <main>
      <AddIngredientForm onAdd={addIngredient} error={error} />

      {ingredients.length > 0 && (
        <IngredientsList
          ingredients={ingredients}
          getRecipe={getRecipe}
          removeIngredient={removeIngredient}
        />
      )}

      {loading && <Loader />}

      {recipe && (
        <div ref={recipeSection}>
          <ClaudeRecipe recipe={recipe} />
          <button
            onClick={() => setShowDeleteModal(true)}
            className="btn delete-recipe-btn"
            title="Delete recipe"
          >
            Delete Recipe
          </button>
          {showDeleteModal && (
            <Modal
              title="Delete recipe?"
              message="Are you sure you want to delete this recipe?"
              confirmText="Delete"
              cancelText="Cancel"
              onConfirm={deleteRecipe}
              onCancel={() => setShowDeleteModal(false)}
            />
          )}
        </div>
      )}

      {history.length > 0 && (
        <RecipeHistory
          history={history}
          onRestore={restoreRecipe}
          onDelete={deleteHistoryItem}
        />
      )}
    </main>
  );
}
