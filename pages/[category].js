import Head from 'next/head';
import { useRouter } from 'next/router';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import RecipeCard from '../components/RecipeCard';
import { getAllCategories } from '../lib/categories';

export default function Category({ recipes }) {
  const router = useRouter();
  const { category } = router.query;
  const filteredRecipes = recipes.filter((recipe) => recipe.tags.find((el) => el === category));

  return (
    <main>
      <Head>
        <title>Nosh | {category.charAt(0).toUpperCase() + category.slice(1)}</title>
        <meta name='description' content='Cameron family recipes, all in one place.' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>
      </Head>

      <h1 className='text-3xl text-center font-black capitalize tracking-tight'>{category}</h1>
      <ul className='flex space-x-4 mb-10 p-8'>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </main>
  );
}

export async function getStaticPaths() {
  const paths = getAllCategories();
  return {
    paths,
    fallback: false,
  };
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
