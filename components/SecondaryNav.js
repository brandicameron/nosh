import Link from 'next/link';
import { RiAccountCircleLine } from 'react-icons/ri';
import { RiAddCircleLine } from 'react-icons/ri';
import SearchBar from './SearchBar';

export default function SecondaryNav() {
  return (
    <ul className='flex space-x-2'>
      <li className='mr-1'>
        <SearchBar />
      </li>
      <li>
        <Link href='/add-recipe'>
          <a title='Add New Recipe'>
            <span className='text-white cursor-pointer hover:opacity-80 sr-only'>
              Add New Recipe
            </span>
            <RiAddCircleLine className='text-white text-3xl hover:opacity-80' />
          </a>
        </Link>
      </li>
      <li>
        <Link href='/account'>
          <a title='Your Account'>
            <span className='text-white cursor-pointer hover:opacity-80 sr-only'>Your Account</span>
            <RiAccountCircleLine className='text-white text-3xl hover:opacity-80' />
          </a>
        </Link>
      </li>
    </ul>
  );
}
