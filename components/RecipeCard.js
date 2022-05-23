import Image from 'next/image';
import Link from 'next/link';
import AddtoMenuButton from './AddtoMenuButton';
import { motion } from 'framer-motion';

export default function RecipeCard({ recipe }) {
  return (
    <motion.li
      whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
      className='relative h-24 w-44 shadow-xl rounded-xl lg:h-32 lg:w-52'
    >
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
    </motion.li>
  );
}
