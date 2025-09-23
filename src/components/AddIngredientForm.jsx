import React from "react";

export default function AddIngredientForm({ onAdd, error }) {
  const formRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    onAdd(formData);
    formRef.current.reset();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="add-ingredient-form">
      <input
        type="text"
        placeholder="e.g. oregano"
        aria-label="Add ingredient"
        name="ingredient"
      />
      <button className="btn add-ingredient-btn" title="Add ingredient">
        Add ingredient
      </button>
      {error && <div style={{ color: "red", marginTop: "8px" }}>{error}</div>}
    </form>
  );
}
