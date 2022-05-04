import Head from 'next/head';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState, useRef, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';
import Ingredient from '../../components/Ingredient';

export default function Recipe({ recipe }) {
  const [servings, setServings] = useState(recipe.serves);
  const [totalHours, setTotalHours] = useState(recipe.prepHour + recipe.cookHour);
  const [totalMins, setTotalMins] = useState(recipe.prepMin + recipe.cookMin);
  const defaultServings = useRef(recipe.serves);
  const title = useRef(recipe.title);

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
    <main className='flex flex-col h-full gap-10 px-4 pb-20 lg:flex-row lg:px-8 lg:pb-0'>
      <Head>
        <title>Nosh | {recipe.title}</title>
        <meta name='description' content={`Whatcha cooking today? How about ${recipe.title}?`} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>
        <meta property='og:title' content={`Try making ${recipe.title} today!`} />
        <meta property='og:image' content={recipe.featureImg} />
      </Head>
      {/* only show sidebar if user logged in & has items added to menu */}
      <nav className='hidden bg-neutral-100 w-6/12 h-3/4 lg:h-5/6 lg:block'>
        <h2 className='text-xl font-black text-white text-center py-2 bg-indigo-600 rounded-t-xl'>
          On the Menu
        </h2>
        <ul className='space-y-4 p-4'>
          {/* future loop through items added to menu */}
          <li className='flex items-center border-b last:border-b-0 py-2 leading-tight'>
            {recipe.featureImg && (
              <img
                className='rounded-full w-8 h-8 object-cover border border-neutral-200 mr-3'
                src={recipe.featureImg}
                alt={recipe.title}
              />
            )}
            {recipe.title}
          </li>
          <li className='flex items-center border-b last:border-b-0 py-2 leading-tight'>
            {recipe.featureImg && (
              <img
                className='rounded-full w-8 h-8 object-cover border border-neutral-200 mr-3'
                src={recipe.featureImg}
                alt={recipe.title}
              />
            )}
            {recipe.title}
          </li>
        </ul>
      </nav>

      <section className='flex flex-col items-center w-full px-1 lg:w-screen lg:p-0'>
        <header className='flex space-x-3'>
          {recipe.featureImg && (
            <img
              className='w-1/3 h-40 object-cover rounded-xl lg:w-1/2'
              src={recipe.featureImg}
              alt={recipe.title}
            />
          )}
          <div className='flex flex-col justify-between'>
            <h1
              className={`font-black leading-none ${
                title.current.length > 20 ? 'text-[28px]' : 'text-4xl'
              }`}
            >
              {recipe.title}
            </h1>
            {recipe.addedByImg && (
              <figure className='flex items-center'>
                <img
                  className='rounded-full w-8 h-8 object-cover border border-neutral-200 mr-2'
                  src={recipe.addedByImg}
                  alt={recipe.title}
                />
                <figcaption className='text-neutral-500 text-sm'>by Brandi</figcaption>
              </figure>
            )}

            <div className='flex justify-between w-11/12 items-center h-10 bg-indigo-600 text-white font-black rounded-xl'>
              <button
                onClick={changeServings}
                type='button'
                value='decrement'
                aria-label='Decrement number of servings.'
                className='text-3xl font-black border w-1/3 pb-1'
              >
                -
              </button>
              <p className='border-indigo-400 border-x h-full flex flex-col justify-center items-center px-4 text-xl leading-[80%]'>
                <span className='text-xs -mt-1'>Serves</span> {servings}
              </p>
              <button
                onClick={changeServings}
                type='button'
                value='increment'
                aria-label='Increment number of servings.'
                className='text-3xl font-black border w-1/3 border-none pb-1'
              >
                +
              </button>
            </div>
          </div>
        </header>
        <ul className='flex justify-around w-full border-y border-neutral-300 py-2 my-6 text-sm leading-tight'>
          <li className='flex items-center flex-col lg:flex-row'>
            <FiClock className='mr-1 mb-1 lg:mb-0' />
            <span className='block lg:mr-1'>Prep</span> {recipe.prepHour && recipe.prepHour}{' '}
            {recipe.prepHour && 'Hour'} {recipe.prepMin && recipe.prepMin} Mins
          </li>
          <li className='flex items-center flex-col lg:flex-row'>
            <FiClock className='mr-1 mb-1 lg:mb-0' />
            <span className='block lg:mr-1'>Cook</span> {recipe.cookHour && recipe.cookHour}{' '}
            {recipe.cookHour && 'Hour'} {recipe.cookMin && recipe.cookMin}{' '}
            {recipe.cookMin && 'Mins'}
          </li>
          <li className='flex items-center flex-col lg:flex-row'>
            <FiClock className='mr-1 mb-1 lg:mb-0' />
            <span className='lg:flex'>
              <span className='block text-center lg:mr-1'>Total</span>
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

        <div className='overflow-auto w-full h-3/4 lg:h-5/6 lg:pb-14'>
          <ul className='space-y-2 w-full overflow-y-scroll'>
            {recipe.ingredients.map((ing) => (
              <Ingredient
                key={ing.ingredient}
                ing={ing}
                servings={servings}
                defaultServings={defaultServings}
              />
            ))}
          </ul>
        </div>
      </section>

      <section className='bg-neutral-100 w-full min-h-min lg:h-5/6 lg:w-10/12 lg:overflow-auto'>
        <h2 className='text-xl font-black text-white text-center py-2 bg-indigo-600 rounded-t-xl'>
          {recipe.preheat ? `Preheat to ${recipe.preheat}°` : 'Instructions'}
        </h2>

        <ul className='space-y-4 p-4 lg:overflow-y-scroll'>
          {recipe.instructions.map((step, index) => (
            <li key={step.step} className='p-2'>
              <span className='block text-indigo-600 font-black text-2xl'>Step {index + 1}</span>{' '}
              {step.step}
            </li>
          ))}
        </ul>
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
    fallback: false,
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
