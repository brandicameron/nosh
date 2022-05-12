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
    <main className='flex flex-col h-screen mx-auto px-4 lg:max-w-7xl'>
      <Head>
        <title>Nosh | {category.charAt(0).toUpperCase() + category.slice(1)}</title>
        <meta name='description' content='Cameron family recipes, all in one place.' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>
      </Head>

      <h1 className='text-3xl text-center font-black capitalize tracking-tight'>
        {category === 'all' ? 'All Recipes' : category}
      </h1>
      <ul className='flex flex-wrap gap-6 mb-10 p-8'>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </main>
  );
}

export async function getStaticPaths() {
  const { paths } = getAllCategories();
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps() {
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

  console.log('data fetched for main nav categories: ' + recipes.length + ' docs at ' + time);

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
  };
}
