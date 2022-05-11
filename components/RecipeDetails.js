import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiClock } from 'react-icons/fi';

export default function RecipeDetails({ recipe, servings, setServings }) {
  const [totalHours, setTotalHours] = useState(recipe.prepHour + recipe.cookHour);
  const [totalMins, setTotalMins] = useState(recipe.prepMin + recipe.cookMin);

  const changeServings = (e) => {
    if (e.target.value === 'decrement') {
      setServings((prev) => prev - 1);
    } else if (e.target.value === 'increment') {
      setServings((prev) => prev + 1);
    }
  };

  const calculateTotalTime = () => {
    if (totalMins < 60) {
      setTotalMins(totalMins);
    }

    if (totalMins > 60) {
      setTotalMins(totalMins % 60);
      setTotalHours(totalHours + 1);
    }
  };

  useEffect(() => {
    calculateTotalTime();
  }, []);

  return (
    <aside className='flex flex-col items-center justify-between w-full lg:h-11 lg:flex-row lg:border-b'>
      {recipe.addedByImg && (
        <figure className='hidden h-full justify-center items-center border-r lg:flex lg:w-1/5'>
          <div className='mr-1 pt-1'>
            <Image
              src={recipe.addedByImg}
              alt={recipe.title}
              width={25}
              height={25}
              className='rounded-full object-cover border border-neutral-200'
            />
          </div>
          <figcaption className='text-sm'>by {recipe.addedBy}</figcaption>
        </figure>
      )}
      <ul className='flex justify-around w-full text-sm leading-tight py-3'>
        <li className='flex items-center flex-col lg:flex-row'>
          <FiClock className='mr-1 mb-1 text-lg lg:mb-0' />
          <span className='block lg:mr-1 font-black'>Prep</span>{' '}
          {recipe.prepHour && recipe.prepHour} {recipe.prepHour && 'Hour'}{' '}
          {recipe.prepMin && recipe.prepMin} Mins
        </li>
        <li className='flex items-center flex-col lg:flex-row'>
          <FiClock className='mr-1 mb-1 text-lg lg:mb-0' />
          <span className='block lg:mr-1 font-black'>Cook</span>{' '}
          {recipe.cookHour && recipe.cookHour} {recipe.cookHour && 'Hour'}{' '}
          {recipe.cookMin && recipe.cookMin} {recipe.cookMin && 'Mins'}
        </li>
        <li className='flex items-center flex-col lg:flex-row'>
          <FiClock className='mr-1 mb-1 text-lg lg:mb-0' />
          <span className='lg:flex'>
            <span className='block text-center font-black'>Total</span>
            {totalHours && (
              <span className='ml-1'>
                {totalHours} {totalHours > 1 ? 'Hours' : 'Hour'}
              </span>
            )}
            {totalMins > 1 && (
              <span className='ml-1'>
                {totalMins} {totalMins > 1 ? 'Mins' : 'Min'}
              </span>
            )}
          </span>
        </li>
      </ul>

      <div className='flex justify-around h-14 w-full items-center bg-indigo-500 text-white font-black lg:w-1/3 lg:h-full'>
        <button
          onClick={changeServings}
          type='button'
          value='decrement'
          aria-label='Decrement number of servings.'
          className='flex justify-center items-center text-xl font-black border w-1/3 pb-1'
        >
          —
        </button>
        <p className='border-indigo-400 border-x h-full flex flex-col justify-center items-center px-4 text-3xl leading-[70%] lg:text-lg lg:leading-[85%]'>
          <span className='text-[0.7rem] -mt-2 lg:-mt-1'>Serves</span> {servings}
        </p>
        <button
          onClick={changeServings}
          type='button'
          value='increment'
          aria-label='Increment number of servings.'
          className='text-4xl font-black border w-1/3 border-none pb-1 lg:text-3xl'
        >
          +
        </button>
      </div>
    </aside>
  );
}
