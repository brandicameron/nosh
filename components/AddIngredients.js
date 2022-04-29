import IngredientInput from './IngredientInput';

export default function AddIngredients({
  ingredients,
  setIngredients,
  handleListInputChange,
  handleDeleteInput,
  handleAddIngredientInput,
}) {
  return (
    <fieldset className='flex flex-wrap border border-solid border-gray-300 p-3 pb-5 mt-5 rounded'>
      <legend className='text-white text-3xl font-black px-2'>Ingredients</legend>
      {ingredients.map((ing, index) => (
        <IngredientInput
          key={index}
          ing={ing}
          index={index}
          handleListInputChange={handleListInputChange}
          handleDeleteInput={handleDeleteInput}
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      ))}
      <button
        className='flex justify-center items-center rounded p-2 m-1 bg-white min-w-full'
        onClick={handleAddIngredientInput}
        type='button'
      >
        + Add Ingredient
      </button>
    </fieldset>
  );
}
