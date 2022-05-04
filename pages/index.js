import Head from 'next/head';
import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import Category from '../components/Category';

export default function Home({ recipes }) {
  const [filteredRecipes, setFilteredRecipes] = useState({
    appetizers: recipes.filter((recipe) => recipe.tags.find((el) => el === 'appetizers')),
    sauces: recipes.filter((recipe) => recipe.tags.find((el) => el === 'sauces')),
    soups: recipes.filter((recipe) => recipe.tags.find((el) => el === 'soups')),
    entrees: recipes.filter((recipe) => recipe.tags.find((el) => el === 'entrees')),
    sides: recipes.filter((recipe) => recipe.tags.find((el) => el === 'sides')),
    desserts: recipes.filter((recipe) => recipe.tags.find((el) => el === 'desserts')),
    breakfast: recipes.filter((recipe) => recipe.tags.find((el) => el === 'breakfast')),
    drinks: recipes.filter((recipe) => recipe.tags.find((el) => el === 'drinks')),
  });

  return (
    <main>
      <Head>
        <title>Nosh | Family Recipes</title>
        <meta name='description' content='Your family recipes, easy to share and maintain.' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>
        <meta name='author' content='Brandi Cameron | hello@brandicameron.com' />
        <meta name='theme-color' content='#ffffff' />
        <meta property='og:title' content='Your family recipes, easy to share and maintain.' />
        <meta property='og:image' content='/nosh-share.jpg' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Category state={recipes} title={'All Recipes >'} />
      {/* <Category state={filteredRecipes.appetizers} title={'Appetizers >'} /> */}
      <Category state={filteredRecipes.sauces} title={'Sauces >'} />
      {/* <Category state={filteredRecipes.soups} title={'Soups >'} /> */}
      <Category state={filteredRecipes.entrees} title={'Entrees >'} />
      <Category state={filteredRecipes.sides} title={'Sides >'} />
      <Category state={filteredRecipes.desserts} title={'Desserts >'} />
      <Category state={filteredRecipes.breakfast} title={'Breakfast >'} />
    </main>
  );
}

export async function getStaticProps() {
  let recipes = [];

  const querySnapshot = await getDocs(collection(db, 'recipes'));
  querySnapshot.forEach((doc) => {
    recipes.push({ id: doc.id, ...doc.data() });
  });

  console.log('data fetched');

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
    // revalidate: 3600  //regenerates the static pages with fresh data every hour (set to however often you'd like)
  };
}
