import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
// import { useUser } from '../hooks/useUser';

export const useAddRecipe = () => {
  // const { userUID } = useUser();

  const addRecipe = async (recipeData) => {
    await addDoc(collection(db, 'recipes'), {
      cookHour: recipeData.cookHour,
      cookMin: recipeData.cookMin,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
      preheat: recipeData.preheat,
      prepHour: recipeData.prepHour,
      prepMin: recipeData.prepMin,
      serves: recipeData.serves,
      tags: recipeData.tags,
      title: recipeData.title,
      created: Timestamp.now(),
    });
  };

  return { addRecipe };
};
