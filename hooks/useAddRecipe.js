import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
// import { useUser } from '../hooks/useUser';

export const useAddRecipe = () => {
  // const { userUID } = useUser();

  const addRecipeToFirebase = async (recipeData) => {
    await addDoc(collection(db, 'recipes'), {
      addedBy: recipeData.addedBy,
      addedByImg: recipeData.addedByImg,
      cookHour: recipeData.cookHour,
      cookMin: recipeData.cookMin,
      featureImg: recipeData.featureImg,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
      preheat: recipeData.preheat,
      prepHour: recipeData.prepHour,
      prepMin: recipeData.prepMin,
      serves: recipeData.serves,
      slug: recipeData.slug,
      tags: recipeData.tags,
      title: recipeData.title,
      created: Timestamp.now(),
    });
  };

  return { addRecipeToFirebase };
};
