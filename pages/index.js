import Head from 'next/head';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, orderBy, query, onSnapshot } from 'firebase/firestore';
import { getAllCategories } from '../lib/categories';
import Category from '../components/Category';
import SplashPage from '../components/SplashPage';

export default function Home({ recipes }) {
  const [isLoading, setIsLoading] = useState(true);
  const { recipeData, setRecipeData } = useContext(AppContext);
  const { categories } = getAllCategories();

  useEffect(() => {
    // keeps search data up to date (context)
    if (recipes) {
      setRecipeData(recipes);
    }
  }, []);

  useEffect(() => {
    // prevents splash page from showing every time a user returns home
    if (sessionStorage.getItem('shown')) {
      setIsLoading(false);
    }

    if (!sessionStorage.getItem('shown')) {
      const timer = setTimeout(() => {
        sessionStorage.setItem('shown', true);
        setIsLoading(false);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // realtime listener
    const collRef = collection(db, 'recipes');
    const q = query(collRef, orderBy('title'));

    const unsub = onSnapshot(q, (snapshot) => {
      let tempData = [];
      snapshot.docs.forEach((doc) => {
        tempData.push({ id: doc.id, ...doc.data() });
      });
      setRecipeData(tempData);
    });

    return () => unsub();
  }, []);

  const filterRecipes = (category) => {
    const filtered = recipeData.filter((recipe) => recipe.tags.find((el) => el === category));
    return filtered;
  };

  return (
    <>
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

      {isLoading && <SplashPage />}

      {categories.map((category) => (
        <Category key={category} state={filterRecipes(category)} title={category} />
      ))}
    </>
  );
}

export async function getStaticProps() {
  let recipes = [];

  const collRef = collection(db, 'recipes');
  const querySnapshot = await getDocs(query(collRef, orderBy('title')));
  querySnapshot.forEach((doc) => {
    recipes.push({ id: doc.id, ...doc.data() });
  });

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
  };
}
