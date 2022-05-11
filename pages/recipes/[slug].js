import { useContext } from 'react';
import { MenuContext } from '../../MenuContext';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FiClock } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import { FaMinus } from 'react-icons/fa';
import Ingredient from '../../components/Ingredient';
import AddtoMenuButton from '../../components/AddtoMenuButton';

export default function Recipe({ recipe }) {
  const { menuItems } = useContext(MenuContext);
  const [servings, setServings] = useState(recipe.serves);
  const [totalHours, setTotalHours] = useState(recipe.prepHour + recipe.cookHour);
  const [totalMins, setTotalMins] = useState(recipe.prepMin + recipe.cookMin);
  const defaultServings = useRef(recipe.serves);
  const router = useRouter();
  const slug = recipe.slug;

  const changeServings = (e) => {
    if (e.target.value === 'decrement') {
      setServings((prev) => prev - 1);
    } else if (e.target.value === 'increment') {
      setServings((prev) => prev + 1);
    }
  };

  const calculateTotalTime = () => {
    if (totalMins < 60) {
      setTotalMins(totalMins);
    }

    if (totalMins > 60) {
      setTotalMins(totalMins % 60);
      setTotalHours(totalHours + 1);
    }
  };

  useEffect(() => {
    calculateTotalTime();
  }, []);

  return (
    <main>
      <Head>
        <title>Nosh | {recipe.title}</title>
        <meta name='description' content={`Whatcha cooking today? How about ${recipe.title}?`} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>
        <meta property='og:title' content={`Try making ${recipe.title} today!`} />
        <meta property='og:image' content={recipe.featureImg} />
      </Head>

      <section className='relative flex flex-col justify-center items-center w-full h-24 -mt-8 bg-black'>
        <Image
          src={recipe.featureImg}
          alt={recipe.title}
          layout='fill'
          objectFit='cover'
          className='opacity-40'
          priority
        />
        <button
          className='absolute top-7 left-2 text-white font-black opacity-80'
          onClick={() => router.back()}
        >
          <IoIosArrowBack className='h-10 w-10 lg:h-8 lg:w-8' />
        </button>
        <AddtoMenuButton position='right-5' recipe={recipe} />
        <h1 className='absolute text-white font-black text-4xl text-center max-w-[250px] lg:max-w-full'>
          {recipe.title}
        </h1>
      </section>
      <aside className='flex flex-col items-center justify-between w-full lg:h-11 lg:flex-row lg:border-b'>
        {recipe.addedByImg && (
          <figure className='hidden h-full justify-center items-center border-r lg:flex lg:w-1/5'>
            <div className='mr-1 pt-1'>
              <Image
                src={recipe.addedByImg}
                alt={recipe.title}
                width={25}
                height={25}
                className='rounded-full object-cover border border-neutral-200'
              />
            </div>
            <figcaption className='text-sm'>by {recipe.addedBy}</figcaption>
          </figure>
        )}
        <ul className='flex justify-around w-full text-sm leading-tight py-3'>
          <li className='flex items-center flex-col lg:flex-row'>
            <FiClock className='mr-1 mb-1 text-lg lg:mb-0' />
            <span className='block lg:mr-1 font-black'>Prep</span>{' '}
            {recipe.prepHour && recipe.prepHour} {recipe.prepHour && 'Hour'}{' '}
            {recipe.prepMin && recipe.prepMin} Mins
          </li>
          <li className='flex items-center flex-col lg:flex-row'>
            <FiClock className='mr-1 mb-1 text-lg lg:mb-0' />
            <span className='block lg:mr-1 font-black'>Cook</span>{' '}
            {recipe.cookHour && recipe.cookHour} {recipe.cookHour && 'Hour'}{' '}
            {recipe.cookMin && recipe.cookMin} {recipe.cookMin && 'Mins'}
          </li>
          <li className='flex items-center flex-col lg:flex-row'>
            <FiClock className='mr-1 mb-1 text-lg lg:mb-0' />
            <span className='lg:flex'>
              <span className='block text-center font-black'>Total</span>
              {totalHours && (
                <span className='ml-1'>
                  {totalHours} {totalHours > 1 ? 'Hours' : 'Hour'}
                </span>
              )}
              {totalMins > 1 && (
                <span className='ml-1'>
                  {totalMins} {totalMins > 1 ? 'Mins' : 'Min'}
                </span>
              )}
            </span>
          </li>
        </ul>

        <div className='flex justify-around h-14 w-full items-center bg-indigo-500 text-white font-black lg:w-1/3 lg:h-full'>
          <button
            onClick={changeServings}
            type='button'
            value='decrement'
            aria-label='Decrement number of servings.'
            className='flex justify-center items-center text-xl font-black border w-1/3 pb-1'
          >
            <FaMinus className='mt-1' />
          </button>
          <p className='border-indigo-400 border-x h-full flex flex-col justify-center items-center px-4 text-3xl leading-[70%] lg:text-lg lg:leading-[85%]'>
            <span className='text-[0.7rem] -mt-2 lg:-mt-1'>Serves</span> {servings}
          </p>
          <button
            onClick={changeServings}
            type='button'
            value='increment'
            aria-label='Increment number of servings.'
            className='text-4xl font-black border w-1/3 border-none pb-1 lg:text-3xl'
          >
            +
          </button>
        </div>
      </aside>

      <section className='relative flex flex-col p-8 lg:flex-row lg:gap-8'>
        <aside className='hidden bg-neutral-50 w-1/4 lg:block'>
          <h2 className='text-xl font-black text-white text-center py-2 bg-indigo-600 rounded-t-xl'>
            Menu
          </h2>
          <ul className='space-y-4 py-2 text-sm'>
            {/* future loop through items added to menu */}
            {menuItems.map((item) => (
              <Link key={item.id} href={`/recipes/${item.slug}`}>
                <a>
                  <li
                    className='flex items-center border-b last:border-b-0 p-3 leading-none'
                    style={{
                      backgroundColor: `${slug === item.slug ? '#eef2ff' : '#fafafa'}`,
                      fontWeight: `${slug === item.slug ? 'bold' : 'inherit'}`,
                    }}
                  >
                    {item.featureImg && (
                      <div className='mr-2 w-8 h-8 rounded-full shadow-lg aspect-square border border-neutral-200'>
                        <Image
                          src={item.featureImg}
                          alt={item.title}
                          width={32}
                          height={32}
                          className='object-cover object-center rounded-full'
                        />
                      </div>
                    )}
                    {item.title}
                  </li>
                </a>
              </Link>
            ))}
          </ul>
        </aside>

        <ul className='space-y-2 lg:w-1/2'>
          {recipe.ingredients.map((ing) => (
            <Ingredient
              key={ing.ingredient}
              ing={ing}
              servings={servings}
              defaultServings={defaultServings}
            />
          ))}
        </ul>

        <section className='bg-neutral-100 w-full mt-8 lg:h-full lg:w-10/12 lg:mt-0'>
          <h2 className='text-xl font-black text-white text-center py-2 bg-indigo-600 rounded-t-xl'>
            {recipe.preheat ? `Preheat Oven to ${recipe.preheat}°` : 'Instructions'}
          </h2>

          <ul className='space-y-4 p-4 h-full lg:pb-20'>
            {recipe.instructions.map((step, index) => (
              <li key={step.step} className='p-2'>
                <span className='block text-indigo-600 font-black text-2xl'>Step {index + 1}</span>{' '}
                {step.step}
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export async function getStaticPaths() {
  let paths = [];

  const querySnapshot = await getDocs(collection(db, 'recipes'));
  querySnapshot.forEach((doc) => {
    paths.push(doc.data().slug);
  });

  return {
    fallback: 'blocking',
    paths: paths.map((slug) => ({ params: { slug: slug } })),
  };
}

export async function getStaticProps(context) {
  // Do simple queries from fb instead?
  const recipeSlug = context.params.slug;
  let recipe = {};

  const recipesRef = collection(db, 'recipes');
  const q = query(recipesRef, where('slug', '==', recipeSlug));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, ' => ', doc.data());
    recipe = { id: doc.id, ...doc.data() };
  });

  return {
    props: {
      recipe: JSON.parse(JSON.stringify(recipe)),
    },
    // revalidate: 3600  //regenerates the static pages with fresh data every hour (set to however often you'd like)
  };
}
