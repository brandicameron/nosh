import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
// import { useUser } from '../hooks/useUser';

export const useAddRecipe = () => {
  // const { userUID } = useUser();

  const addRecipeToFirebase = async (recipeData) => {
    await addDoc(collection(db, 'recipes'), {
      ...recipeData,
      created: Timestamp.now(),
    });
  };

  return { addRecipeToFirebase };
};
