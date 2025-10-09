import React, { FormEvent, ChangeEvent } from "react";

interface AddIngredientFormProps {
  inputIngredient: string;
  setInputIngredient: (value: string) => void;
  addIngredient: (e: FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const AddIngredientForm: React.FC<AddIngredientFormProps> = ({
  inputIngredient,
  setInputIngredient,
  addIngredient,
  inputRef,
}) => {
  return (
    <form onSubmit={addIngredient} className="add-ingredient-form">
      <input
        ref={inputRef}
        type="text"
        placeholder="e.g. oregano"
        aria-label="Add ingredient"
        name="ingredient"
        value={inputIngredient}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInputIngredient(e.target.value)}
      />
      <button disabled={inputIngredient.trim() === ""}>Add ingredient</button>
    </form>
  );
};

export default AddIngredientForm;
