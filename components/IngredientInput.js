import { RiDeleteBinFill } from 'react-icons/ri';

export default function IngredientInput({
  ing,
  index,
  handleListInputChange,
  handleDeleteInput,
  ingredients,
  setIngredients,
}) {
  return (
    <div className='flex flex-grow'>
      <div className='relative'>
        <label className='flex text-white' htmlFor='ingAmount'>
          Amount
        </label>
        <input
          className='w-16 rounded p-1.5 mb-5'
          type='number'
          name='ingAmount'
          value={ing.ingAmount || ''}
          onChange={(e) => handleListInputChange(e, index, ingredients, setIngredients)}
        />
      </div>
      <div className='flex justify-center items-center w-full ml-2'>
        <div className='relative flex flex-col w-full'>
          <label className=' text-white' htmlFor='ingredient'>
            Ingredient #{index + 1}
          </label>
          <input
            className='rounded p-1.5 mb-5'
            type='text'
            name='ingredient'
            value={ing.ingredient}
            onChange={(e) => handleListInputChange(e, index, ingredients, setIngredients)}
          />
          <button
            onClick={() => handleDeleteInput(index, ingredients, setIngredients)}
            className='absolute top-[25px] right-0 p-1.5'
            type='button'
          >
            <RiDeleteBinFill className='text-xl text-neutral-400' />
          </button>
        </div>
      </div>
    </div>
  );
}
