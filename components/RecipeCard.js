import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RiBookmarkLine } from 'react-icons/ri';
import { RiBookmarkFill } from 'react-icons/ri';

export default function RecipeCard({ recipe }) {
  const [addToMenu, setAddToMenu] = useState(false);

  const handleAddRemoveMenu = () => {
    setAddToMenu((prev) => !prev);
  };

  return (
    <li className='relative h-32 w-52 shadow-lg text-gradient rounded-xl transition-transform duration-50 ease-in-out hover:scale-105'>
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
          <Image
            src={recipe.featureImg}
            alt={recipe.title}
            width={208}
            height={128}
            className='mix-blend-overlay object-cover rounded-xl cursor-pointer'
          />
        </a>
      </Link>
    </li>
  );
}
