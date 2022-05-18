import { useContext } from 'react';
import { AppContext } from '../AppContext';
import Ingredient from './Ingredient';

export default function RecipeIngredients({ recipe, servings }) {
  const { menuItems } = useContext(AppContext);

  return (
    <section
      className={`bg-neutral-100 w-full ${
        menuItems < 1 ? 'w-full' : 'w-[65%]'
      } lg:h-full lg:w-1/3 lg:mt-0`}
    >
      <h2 className='text-xl font-black text-white text-center py-2 bg-primary rounded-t-xl'>
        Ingredients
      </h2>
      <ul className='space-y-2 py-4 lg:w-full'>
        {recipe.ingredients.map((ing) => (
          <Ingredient key={ing.ingredient} ing={ing} servings={servings} recipe={recipe} />
        ))}
      </ul>
    </section>
  );
}
