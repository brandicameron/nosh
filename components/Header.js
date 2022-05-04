import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCategories } from '../hooks/useCategories';
import { RiAccountCircleLine } from 'react-icons/ri';
import { RiAddCircleLine } from 'react-icons/ri';
import { CgSearch } from 'react-icons/cg';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const { categories } = useCategories();

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchBtn = (e) => {
    e.preventDefault();
    setSearchTerm('');
  };

  return (
    <header className='flex justify-between items-center px-3 bg-indigo-600 h-16 mb-8 border-b border-indigo-500 lg:px-5'>
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
            <Link href={`/${category}`}>
              <a className='capitalize'>{category}</a>
            </Link>
          </li>
        ))}
      </ul>
      <ul className='flex space-x-2'>
        <li className='mr-1'>
          <form className='relative' role='search'>
            <input
              className='appearance-none p-1 pl-3 w-44 text-indigo-600 lg:w-56 lg:rounded-md'
              name='search'
              type='search'
              value={searchTerm}
              title='Search recipes.'
              aria-label='Search recipes.'
              onChange={handleSearchInput}
            />
            <button
              onClick={handleSearchBtn}
              className='absolute text-xl text-white bg-indigo-200 rounded-r px-1 -ml-7 h-full'
              type='submit'
            >
              <span className='sr-only'>Submit Search</span>
              <CgSearch />
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
