import React from "react";
export default function IngredientsList(props) {
  const [adding, setAdding] = React.useState([]);
  const [removing, setRemoving] = React.useState([]);
  

  React.useEffect(() => {
    setAdding(props.ingredients);
    const timeout = setTimeout(() => setAdding([]), 300);
    return () => clearTimeout(timeout);
  }, [props.ingredients]);

  function handleRemove(ingredient) {
    setRemoving((prev) => [...prev, ingredient]);
    setTimeout(() => {
      setRemoving((prev) => prev.filter((i) => i !== ingredient));
      props.removeIngredient(ingredient);
    }, 300);
  }

  const getIngredientName = (ingredient) =>
    typeof ingredient === "string" ? ingredient : ingredient.name;

  const ingredientsListItems = props.ingredients.map((ingredient) => {
    const name = getIngredientName(ingredient);
    let className = "ingredient-list-item";
    if (removing.includes(name)) className += " removing";
    if (adding.includes(name)) className += " adding";
    return (
      <li key={name} className={className}>
        <span className="ingredient-text">{name}</span>
        <button
          className="btn remove-ingredient-btn"
          onClick={() => handleRemove(name)}
          aria-label={`Remove ${name}`}
        >
          &#10006;
        </button>
      </li>
    );
  });

  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItems}
      </ul>
      {props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div ref={props.ref}>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button onClick={props.getRecipe}>Get a recipe</button>
        </div>
      )}
    </section>
  );
}
