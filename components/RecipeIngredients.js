import { useRef } from 'react';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import Ingredient from './Ingredient';

export default function RecipeIngredients({ recipe, servings }) {
  const { menuItems } = useContext(AppContext);
  const defaultServings = useRef(recipe.serves);

  return (
    <ul className={`space-y-2 ${menuItems < 1 ? 'w-full' : 'w-[65%]'} lg:w-1/2`}>
      {recipe.ingredients.map((ing) => (
        <Ingredient
          key={ing.ingredient}
          ing={ing}
          servings={servings}
          defaultServings={defaultServings}
        />
      ))}
    </ul>
  );
}
