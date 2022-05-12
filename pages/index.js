import { useEffect } from 'react';
import Head from 'next/head';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { getAllCategories } from '../lib/categories';
import Category from '../components/Category';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

export default function Home({ recipes }) {
  const { categories } = getAllCategories();
  const { setRecipeData } = useContext(AppContext);

  useEffect(() => {
    if (recipes) {
      setRecipeData(recipes);
    }
  }, []);

  const filterRecipes = (category) => {
    let filtered = recipes.filter((recipe) => recipe.tags.find((el) => el === category));
    return filtered;
  };

  return (
    <main>
      <Head>
        <title>Nosh | Family Recipes</title>
        <meta name='description' content='Cameron family recipes, all in one place.' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>
        <meta name='author' content='Brandi Cameron | hello@brandicameron.com' />
        <meta name='theme-color' content='#ffffff' />
        <meta property='og:title' content='Cameron family recipes, all in one place.' />
        <meta property='og:image' content='/nosh-share.jpg' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {categories.map((category) => (
        <Category key={category} state={filterRecipes(category)} title={category} />
      ))}
    </main>
  );
}

export async function getServerSideProps() {
  let recipes = [];

  const querySnapshot = await getDocs(collection(db, 'recipes'));
  querySnapshot.forEach((doc) => {
    recipes.push({ id: doc.id, ...doc.data() });
  });

  const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  console.log('data fetched at index.js: ' + recipes.length + ' docs at ' + time);

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
    // revalidate: 3600  //regenerates the static pages with fresh data every hour (set to however often you'd like)
  };
}
