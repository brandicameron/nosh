import Image from 'next/image';
import Link from 'next/link';
import AddtoMenuButton from './AddtoMenuButton';

export default function RecipeCard({ recipe }) {
  return (
    <li className='relative h-32 w-52 shadow-lg rounded-xl transition-transform duration-50 ease-in-out hover:scale-105'>
      <AddtoMenuButton position='right-2 top-1' recipe={recipe} />
      <Link href={`/recipes/${recipe.slug}`}>
        <a className='relative text-xl font-black text-white text-shadow'>
          <Image
            src={recipe.featureImg}
            alt={recipe.title}
            width={208}
            height={128}
            className='object-cover rounded-xl cursor-pointer brightness-60'
          />
          <span className='absolute left-2 bottom-3 leading-none'>{recipe.title}</span>
        </a>
      </Link>
    </li>
  );
}
