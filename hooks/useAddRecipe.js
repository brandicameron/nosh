import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const useAddRecipe = () => {
  const addRecipeToFirebase = async (recipeData) => {
    await addDoc(collection(db, 'recipes'), {
      ...recipeData,
      created: Timestamp.now(),
    });
  };

  return { addRecipeToFirebase };
};
