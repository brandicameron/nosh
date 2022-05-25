import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CgSearch } from 'react-icons/cg';

export default function SearchBar() {
  const { recipeData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const filterSearchTerm = (searchTerm) => {
    let results = recipeData.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  useEffect(() => {
    if (searchTerm) {
      filterSearchTerm(searchTerm);
    }
  }, [searchTerm]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm('');
    setTimeout(() => {
      setSearchResults([]);
    }, 200);
  };

  return (
    <div className='relative'>
      <form className='relative' role='search' onSubmit={handleSubmit}>
        <input
          className='appearance-none p-1 pl-3 w-[190px] text-indigo-600 lg:rounded-md'
          name='search'
          type='search'
          value={searchTerm}
          title='Search recipes.'
          aria-label='Search recipes.'
          autoComplete='off'
          onChange={handleSearchInput}
        />
        <button
          className='absolute text-xl text-white bg-indigo-200 rounded-r px-1 -ml-7 h-full'
          type='submit'
        >
          <span className='sr-only'>Submit Search</span>
          <CgSearch />
        </button>
      </form>
      {searchTerm && (
        <ul className='absolute w-full bg-white shadow-lg rounded-b-lg z-[200]'>
          {searchResults.map((result) => (
            <li
              key={result.id}
              onClick={handleSubmit}
              className='px-2 py-4 border-b last:border-b-0 leading-tight hover:bg-neutral-100 hover:rounded-b-lg'
            >
              <Link href={`/recipes/${result.slug}`}>
                <a className='flex items-center'>
                  <div className='pr-1'>
                    <Image
                      src={result.featureImg}
                      alt={result.title}
                      width={25}
                      height={25}
                      className='object-cover rounded-full cursor-pointer'
                    />
                  </div>
                  {result.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
