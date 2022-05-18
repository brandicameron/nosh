import { getAllCategories } from '../lib/categories';

export default function CategoryInput({ handleCategoriesChange }) {
  const { categories } = getAllCategories();

  return (
    <fieldset className='flex justify-center items-center flex-wrap border border-solid border-gray-300 p-3 pb-5 mt-5 rounded'>
      <legend className='flex justify-center items-center text-white text-3xl font-black px-2'>
        Category{' '}
        <small className='text-sm font-normal lg:ml-2'>
          <span className='text-[#ff6161] mr-1'>*</span>Required
        </small>
      </legend>
      {categories.slice(1).map((category) => (
        <div className='relative' key={category}>
          <input
            className='peer absolute w-[100px] h-[40px] top-1 opacity-0 cursor-pointer'
            type='checkbox'
            name={category}
            onChange={handleCategoriesChange}
          />
          <label
            className='flex justify-center items-center capitalize w-[100px] border p-2 rounded m-1 text-white peer-checked:bg-white peer-checked:text-indigo-600 peer-focus:outline-none peer-focus:ring peer-focus:ring-indigo-300'
            htmlFor={category}
          >
            {category}
          </label>
        </div>
      ))}
    </fieldset>
  );
}
