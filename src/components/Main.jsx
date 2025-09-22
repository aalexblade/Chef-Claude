import React from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { useEffect } from "react";
import Header from "./Header";
import { getRecipeFromChefClaude } from "../ai";

export default function Main() {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  // Dark theme state
  const [dark, setDark] = React.useState(() => {
    const saved = localStorage.getItem("darkTheme");
    return saved === "true";
  });

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
    localStorage.setItem("darkTheme", dark);
  }, [dark]);
  // Recipe history
  const [history, setHistory] = React.useState(() => {
    const saved = localStorage.getItem("recipeHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // Load from localStorage
  const [ingredients, setIngredients] = React.useState(() => {
    const saved = localStorage.getItem("ingredients");
    return saved
      ? JSON.parse(saved)
      : ["chicken", "all the main spices", "corn", "heavy cream", "pasta"];
  });
  const [recipe, setRecipe] = React.useState(() => {
    const saved = localStorage.getItem("recipe");
    return saved ? saved : "";
  });
  const recipeSection = React.useRef(null);

  // Save to localStorage
  React.useEffect(() => {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }, [ingredients]);
  React.useEffect(() => {
    localStorage.setItem("recipe", recipe);
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
    const newIngredient = formData.get("ingredient").trim();
    if (!newIngredient) {
      setError("Інгредієнт не може бути порожнім!");
      return;
    }
    if (
      ingredients.some((ing) => {
        const name = typeof ing === "string" ? ing : ing.name;
        return name.toLowerCase() === newIngredient.toLowerCase();
      })
    ) {
      setError("Такий інгредієнт вже є у списку!");
      return;
    }
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
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
          // Якщо це той самий індекс, перевіряємо чи містить потрібний текст
          if (
            typeof item === "string" &&
            item.includes("Tuna Balls In Tomato Sauce")
          ) {
            return false;
          }
        }
        return i !== index;
      });
      localStorage.setItem("recipeHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  }

  return (
    <>
      <Header />
      <main>
        <button
          className={dark ? "btn theme-toggle-btn" : "btn theme-toggle-btn"}
          style={{ position: "absolute", top: 18, right: 18, zIndex: 1001 }}
          onClick={() => setDark((prev) => !prev)}
          title={dark ? "Увімкнути світлу тему" : "Увімкнути темну тему"}
        >
          {dark ? "🌙 Чорна тема" : "☀️ Світла тема"}
        </button>
        <form action={addIngredient} className="add-ingredient-form">
          <input
            type="text"
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
            name="ingredient"
          />
          <button className="btn add-ingredient-btn" title="Додати інгредієнт">
            Add ingredient
          </button>
        </form>
        {error && <div style={{ color: "red", marginTop: "8px" }}>{error}</div>}

        {ingredients.length > 0 && (
          <IngredientsList
            ingredients={ingredients}
            getRecipe={getRecipe}
            removeIngredient={removeIngredient}
          />
        )}

        {loading && (
          <div className="loader" style={{ marginTop: "16px" }}>
            Генеруємо рецепт...
          </div>
        )}

        {recipe && (
          <div ref={recipeSection}>
            <ClaudeRecipe recipe={recipe} />
            <button
              onClick={() => setShowDeleteModal(true)}
              className="btn delete-recipe-btn"
              title="Видалити рецепт"
            >
              Delete Recipe
            </button>
            {showDeleteModal && (
              <div className="modal-overlay">
                <div className="modal">
                  <h3>Видалити рецепт?</h3>
                  <p>Ви дійсно хочете видалити цей рецепт?</p>
                  <button
                    className="btn modal-confirm-btn"
                    onClick={deleteRecipe}
                  >
                    Видалити
                  </button>
                  <button
                    className="btn modal-cancel-btn"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Скасувати
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {history.length > 0 && (
          <section style={{ marginTop: "32px" }}>
            <h3>Історія рецептів</h3>
            <ul style={{ paddingLeft: 0 }}>
              {history.map((rec, idx) => (
                <li
                  key={idx}
                  style={{
                    marginBottom: "12px",
                    listStyle: "none",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      whiteSpace: "pre-line",
                      maxHeight: "80px",
                      overflow: "auto",
                      fontSize: "0.95rem",
                    }}
                  >
                    {rec.slice(0, 200)}
                    {rec.length > 200 ? "..." : ""}
                  </div>
                  <button
                    onClick={() => restoreRecipe(idx)}
                    className="btn restore-recipe-btn"
                    style={{ marginRight: "8px" }}
                    title="Відновити рецепт"
                  >
                    Відновити
                  </button>
                  <button
                    onClick={() => deleteHistoryItem(idx)}
                    className="btn delete-history-btn"
                    title="Видалити з історії"
                  >
                    Видалити
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
