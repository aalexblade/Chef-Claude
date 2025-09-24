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
      <div className="add-ingredient-input-wrapper">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        {error && <span className="add-ingredient-error">{error}</span>}
      </div>
      <button className="btn add-ingredient-btn" title="Add ingredient">
        Add ingredient
      </button>
    </form>
  );
}
