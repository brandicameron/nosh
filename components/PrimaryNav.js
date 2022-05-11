import Link from 'next/link';
import { getAllCategories } from '../lib/categories';

export default function PrimaryNav() {
  const { categories } = getAllCategories();

  return (
    <ul className='hidden space-x-5 lg:flex'>
      {categories.map((category) => (
        <li className='text-white cursor-pointer hover:opacity-80' key={category}>
          <Link href={`/${category}`}>
            <a className='capitalize'>{category}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
