import { useState } from 'react';
import { RiBookmarkLine } from 'react-icons/ri';
import { RiBookmarkFill } from 'react-icons/ri';
import Link from 'next/link';

export default function RecipeCard({ recipe }) {
  const [addToMenu, setAddToMenu] = useState(false);

  const handleAddRemoveMenu = () => {
    setAddToMenu((prev) => !prev);
  };

  return (
    <li className='relative shadow-lg text-gradient rounded-xl transition-transform duration-50 ease-in-out hover:scale-105'>
      <h3 className='absolute bottom-1 left-2 text-xl font-black text-white leading-tight'>
        {recipe.title}
      </h3>
      <button
        onClick={handleAddRemoveMenu}
        type='button'
        className='absolute right-2 top-1 filter-shadow z-50'
        aria-label='Add or Remove From Menu'
      >
        {addToMenu ? (
          <RiBookmarkFill className='text-white text-3xl lg:text-2xl' />
        ) : (
          <RiBookmarkLine className='text-white text-3xl lg:text-2xl' />
        )}
      </button>
      <Link href={`/recipes/${recipe.slug}`}>
        <a>
          <img
            className='w-56 h-32 object-cover rounded-xl mix-blend-overlay cursor-pointer'
            src={recipe.featureImg}
            alt={recipe.title}
            width={225}
            h={125}
          />
        </a>
      </Link>
    </li>
  );
}
