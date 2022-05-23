import CopyAmountBtn from './CopyAmountBtn';
import IngredientInput from './IngredientInput';

export default function AddIngredients({
  ingredients,
  setIngredients,
  handleListInputChange,
  handleDeleteInput,
  handleAddAnotherIngredient,
}) {
  const fractionDecimalButtons = [
    {
      content: '⅛ = .125',
      value: 0.125,
    },
    {
      content: '⅓ = .33',
      value: 0.33,
    },
    {
      content: '½ = .5',
      value: 0.5,
    },
    {
      content: '⅔ = .66',
      value: 0.66,
    },
    {
      content: '¾ = .75',
      value: 0.75,
    },
  ];
  return (
    <fieldset className='flex flex-wrap border border-solid border-gray-300 p-3 pb-5 mt-5 rounded'>
      <legend className='text-white text-3xl font-black px-2'>Ingredients</legend>

      <div className='hidden lg:flex flex-col justify-center mx-auto pt-3 pb-5'>
        <p className='text-white text-center pb-2 leading-tight mb-2'>
          Please enter fractions as decimals. (click to copy)
        </p>
        <ul className='flex flex-wrap justify-center items-center text-white space-x-2'>
          {fractionDecimalButtons.map((item) => (
            <CopyAmountBtn key={item.value} value={item.value} content={item.content} />
          ))}
        </ul>
      </div>

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
        className='flex justify-center items-center rounded p-2 m-1 bg-white min-w-full font-black'
        onClick={handleAddAnotherIngredient}
        type='button'
      >
        + Add Ingredient
      </button>
    </fieldset>
  );
}
