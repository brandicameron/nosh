import Head from 'next/head';
import { useUser } from '../hooks/useUser';
import { useFormSwitch } from '../hooks/useFormSwitch';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { AddRecipeForm } from './../components/AddRecipeForm';

export default function AddRecipe() {
  const { loggedIn } = useUser();
  const { handleFormSwitch, signUp } = useFormSwitch();

  return (
    <>
      <Head>
        <title>Nosh | Add a New Recipe</title>
      </Head>
      <section
        className={`flex flex-col items-center justify-center bg-primary w-screen -mt-9 pb-20 ${
          loggedIn ? 'h-full' : 'h-screen'
        }`}
      >
        {loggedIn && <AddRecipeForm />}
        {!loggedIn && (
          <h1 className='absolute text-white text-center text-2xl top-[15vh] lg:text-3xl'>
            Please sign in to add a recipe.
          </h1>
        )}
        {!loggedIn && !signUp && <Login handleFormSwitch={handleFormSwitch} />}
        {!loggedIn && signUp && <Signup handleFormSwitch={handleFormSwitch} />}
      </section>
    </>
  );
}
