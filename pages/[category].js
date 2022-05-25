import Head from 'next/head';
import { useRouter } from 'next/router';
import { db } from '../firebase/config';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { getAllCategories } from '../lib/categories';
import RecipeCard from '../components/RecipeCard';

export default function Category({ recipes }) {
  const router = useRouter();
  const { category } = router.query;

  return (
    <section className='mx-auto px-4 lg:max-w-7xl'>
      <Head>
        <title>
          Nosh |{' '}
          {category === 'all'
            ? 'All Recipes'
            : category.charAt(0).toUpperCase() + category.slice(1)}
        </title>
        <meta name='description' content='Cameron family recipes, all in one place.' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>
      </Head>

      <h1 className='text-3xl text-center font-black capitalize tracking-tight'>
        {category === 'all' ? 'All Recipes' : category}
      </h1>
      <ul className='flex flex-col items-center gap-6 mb-10 p-8 sm:flex-row sm:flex-wrap'>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </section>
  );
}

export async function getStaticPaths() {
  const { paths } = getAllCategories();
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const categorySlug = context.params.category;
  let recipes = [];

  const recipesRef = collection(db, 'recipes');
  const q = query(recipesRef, where('tags', 'array-contains', categorySlug), orderBy('title'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    recipes.push({ id: doc.id, ...doc.data() });
  });

  const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  console.log('data fetched at [category].js: ' + recipes.length + ' docs at ' + time);

  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
  };
}
