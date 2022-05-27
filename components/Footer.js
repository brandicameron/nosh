import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAllCategories } from '../lib/categories';

export default function Footer() {
  const router = useRouter();
  const { categories } = getAllCategories();

  const d = new Date();
  const year = d.getFullYear();

  return (
    <footer className='bg-primary py-10 border-t border-primaryM  mb-auto flex flex-col justify-center items-center'>
      <ul className='space-y-3 columns-2 w-3/4 ml-14 lg:ml-0 lg:flex lg:justify-center lg:space-x-5 lg:space-y-0'>
        {categories.map((category) => (
          <li
            className={`text-white cursor-pointer hover:opacity-80 
          ${router.asPath == `/${category}` ? 'font-black' : ''}`}
            key={category}
          >
            <Link href={`/${category}`}>
              <a className='capitalize'> {category === 'all' ? 'All Recipes' : category}</a>
            </Link>
          </li>
        ))}
      </ul>

      <p className='text-white text-sm pt-8 text-center'>
        &copy; {year}
        <a className='ml-1 hover:text-primaryL' target='blank' href='https://www.brandicameron.com'>
          Brandi Cameron
        </a>
        <span className='px-2'>|</span>{' '}
        <Link href='/privacy'>
          <a className='text-white text-sm py-2 hover:text-primaryL'>Privacy Statement</a>
        </Link>
      </p>
    </footer>
  );
}
