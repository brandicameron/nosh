import { useState, useEffect } from 'react';
import Head from 'next/head';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import RecipeHeader from '../../components/RecipeHeader';
import RecipeDetails from '../../components/RecipeDetails';
import MenuSidebar from '../../components/MenuSidebar';
import RecipeIngredients from '../../components/RecipeIngredients';
import RecipeInstructions from '../../components/RecipeInstructions';

export default function Recipe({ recipe }) {
  const [servings, setServings] = useState(recipe.serves);

  useEffect(() => {
    setServings(recipe.serves);
  }, [recipe]);

  return (
    <main>
      <Head>
        <title>Nosh | {recipe.title}</title>
        <meta name='description' content={`Whatcha cooking today? How about ${recipe.title}?`} />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>
        <meta property='og:title' content={`Try making ${recipe.title} today!`} />
        <meta property='og:image' content={recipe.featureImg} />
      </Head>

      <RecipeHeader recipe={recipe} />
      <RecipeDetails recipe={recipe} servings={servings} setServings={setServings} />
      <section className='relative flex justify-center flex-wrap py-6 px-6 gap-8 lg:flex-nowrap lg:p-8'>
        <MenuSidebar recipe={recipe} />
        <RecipeIngredients recipe={recipe} servings={servings} />
        <RecipeInstructions recipe={recipe} />
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
  const recipeSlug = context.params.slug;
  let recipe = {};

  const recipesRef = collection(db, 'recipes');
  const q = query(recipesRef, where('slug', '==', recipeSlug));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    recipe = { id: doc.id, ...doc.data() };
  });

  const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  console.log('data fetched: ' + recipe.title + ' docs at ' + time);

  return {
    props: {
      recipe: JSON.parse(JSON.stringify(recipe)),
    },
  };
}
