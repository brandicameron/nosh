import Image from 'next/image';
import Link from 'next/link';
import { useCategories } from '../hooks/useCategories';
import { RiAccountCircleLine } from 'react-icons/ri';
import { RiAddCircleLine } from 'react-icons/ri';
import { CgSearch } from 'react-icons/cg';

export default function Header() {
  const { categories } = useCategories();

  const handleSearchInput = (e) => {
    console.log(e.target.value);
  };

  const handleSearchBtn = (e) => {
    e.preventDefault();
    console.log('Submit clicked!');
  };

  return (
    <header className='flex justify-between items-center px-3 bg-indigo-600 h-16 mb-10 border-b border-indigo-500 lg:px-5'>
      <Link href='/'>
        <a>
          <Image
            src='/images/nosh-logo.svg'
            alt='Logo'
            width={75}
            height={20}
            title='Go back home.'
          />
        </a>
      </Link>
      <ul className='hidden space-x-5 lg:flex'>
        {categories.map((category) => (
          <li className='text-white cursor-pointer hover:opacity-80' key={category}>
            <Link href={`/recipes/${category}`}>
              <a className='capitalize'>{category}</a>
            </Link>
          </li>
        ))}
      </ul>
      <ul className='flex space-x-2'>
        <li>
          <form className='relative' role='search'>
            <input
              className='rounded-md p-1 pl-7 text-indigo-600'
              name='search'
              type='search'
              title='Search recipes.'
              placeholder='Search recipes...'
              aria-label='Search recipes.'
              onChange={handleSearchInput}
            />{' '}
            <CgSearch className='absolute text-xl text-neutral-400 -mt-[25px] ml-0.5' />
            <button onClick={handleSearchBtn} type='submit' className='hidden'>
              Search
            </button>
          </form>
        </li>
        <li>
          <Link href='/add-recipe'>
            <a>
              {/* make sr-only for desktop so links show on mobile - move icon to left for mobile with flex  */}
              <span className='text-white cursor-pointer hover:opacity-80 sr-only'>
                Add New Recipe
              </span>
              <RiAddCircleLine className='text-white text-3xl hover:opacity-80' />
            </a>
          </Link>
        </li>
        <li>
          <Link href='/account'>
            <a>
              <span className='text-white cursor-pointer hover:opacity-80 sr-only'>
                Your Account
              </span>
              <RiAccountCircleLine className='text-white text-3xl hover:opacity-80' />
            </a>
          </Link>
        </li>
      </ul>
    </header>
  );
}
