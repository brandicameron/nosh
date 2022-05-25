import { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import Image from 'next/image';

export default function RecipeDetails({ recipe, servings, setServings }) {
  const [recipeAddedBy, setRecipeAddedBy] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'Users', `${recipe.addedByUid}`), (doc) => {
      if (doc.data()) {
        setRecipeAddedBy({ ...doc.data() });
      } else {
        setRecipeAddedBy('');
      }
    });
    return () => {
      unsub();
    };
  }, []);

  const changeServings = (e) => {
    if (e.target.value === 'decrement') {
      setServings((prev) => prev - 1);
    } else if (e.target.value === 'increment') {
      setServings((prev) => prev + 1);
    }
  };

  return (
    <aside className='flex flex-col items-center justify-between w-full lg:h-11 lg:flex-row lg:border-b'>
      {recipeAddedBy && (
        <figure className='flex w-full h-full justify-center items-center border-b py-1 lg:border-r lg:flex lg:w-1/5 lg:border-b-0 lg:py-0'>
          <div className='mr-1 pt-1'>
            <Image
              src={recipeAddedBy.photoURL}
              alt={recipe.title}
              width={25}
              height={25}
              className='rounded-full object-cover border border-neutral-200'
            />
          </div>
          <figcaption className='text-sm leading-none'>
            by {recipeAddedBy.displayName.split(' ')[0]}
          </figcaption>
        </figure>
      )}
      <ul className='flex justify-around w-full text-sm leading-tight py-3'>
        <li className='flex items-center flex-col lg:flex-row'>
          <FiClock className='mr-1 mb-1 text-lg lg:mb-0' />
          <span className='block lg:mr-1 font-black'>Prep</span>{' '}
          {recipe.prepHour > 0 && recipe.prepHour} {recipe.prepHour > 1 ? 'Hours' : ''}{' '}
          {recipe.prepHour === 1 ? 'Hour' : ''} {recipe.prepMin > 0 && recipe.prepMin}{' '}
          {recipe.prepMin > 0 && 'Mins'}
        </li>
        <li className='flex items-center flex-col lg:flex-row'>
          <FiClock className='mr-1 mb-1 text-lg lg:mb-0' />
          <span className='block lg:mr-1 font-black'>Cook</span>{' '}
          {recipe.cookHour > 0 && recipe.cookHour} {recipe.cookHour > 1 ? 'Hours' : ''}{' '}
          {recipe.cookHour === 1 ? 'Hour' : ''} {recipe.cookMin > 0 && recipe.cookMin}{' '}
          {recipe.cookMin > 0 && 'Mins'}
        </li>
        <li className='flex items-center flex-col lg:flex-row'>
          <FiClock className='mr-1 mb-1 text-lg lg:mb-0' />
          <span className='lg:flex'>
            <span className='block text-center font-black'>Total</span>
            {recipe.totalHour > 0 && (
              <span className='ml-1'>
                {recipe.totalHour} {recipe.totalHour > 1 ? 'Hours' : 'Hour'}
              </span>
            )}
            {recipe.totalMin > 1 && (
              <span className='ml-1'>
                {recipe.totalMin} {recipe.totalMin > 1 ? 'Mins' : 'Min'}
              </span>
            )}
          </span>
        </li>
      </ul>

      <div className='flex justify-around h-14 w-full items-center bg-primaryM text-white font-black lg:w-1/3 lg:h-full'>
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
