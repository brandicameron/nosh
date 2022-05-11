import { useRouter } from 'next/router';
import Image from 'next/image';
import { IoIosArrowBack } from 'react-icons/io';
import AddtoMenuButton from '../components/AddtoMenuButton';

export default function RecipeHeader({ recipe }) {
  const router = useRouter();

  return (
    <section className='relative flex flex-col justify-center items-center w-full h-32 -mt-8 bg-black'>
      <Image
        src={recipe.featureImg}
        alt={recipe.title}
        layout='fill'
        objectFit='cover'
        className='opacity-40'
        priority
      />
      <button
        className='absolute top-2/5 left-2 text-white font-black '
        onClick={() => router.back()}
      >
        <IoIosArrowBack className='h-10 w-10 lg:h-8 lg:w-8' />
      </button>
      <AddtoMenuButton position='right-5' recipe={recipe} />
      <h1 className='absolute text-white font-black text-4xl text-center max-w-[250px] lg:max-w-full'>
        {recipe.title}
      </h1>
    </section>
  );
}
