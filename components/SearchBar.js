import { useState } from 'react';
import { CgSearch } from 'react-icons/cg';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchBtn = (e) => {
    e.preventDefault();
    setSearchTerm('');
  };

  console.log(searchTerm);

  return (
    <form className='relative' role='search'>
      <input
        className='appearance-none p-1 pl-3 text-indigo-600 lg:rounded-md'
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
  );
}
