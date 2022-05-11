import { useRef } from 'react';
import Ingredient from './Ingredient';

export default function RecipeIngredients({ recipe, servings }) {
  const defaultServings = useRef(recipe.serves);
  return (
    <ul className='space-y-2 lg:w-1/2'>
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
