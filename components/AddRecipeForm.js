import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAddRecipe } from '../hooks/useAddRecipe';
import { useUser } from '../hooks/useUser';
import FeatureImageInput from './FeatureImageInput';
import CategoryInput from '../components/CategoryInput';
import AddIngredients from '../components/AddIngredients';
import StandardInput from '../components/StandardInput';
import EmbeddedLabelInput from '../components/EmbeddedLabelInput';
import AddInstructions from '../components/AddInstructions';

export function AddRecipeForm() {
  const router = useRouter();
  const { addRecipeToFirebase } = useAddRecipe();
  const { userUID } = useUser();
  const [tags, setTags] = useState(['all']);
  const [instructions, setInstructions] = useState([{ step: '' }]);
  const [featureImgURL, setFeatureImgURL] = useState(
    'https://firebasestorage.googleapis.com/v0/b/recipes-13eed.appspot.com/o/featureImages%2Fno-image.gif?alt=media&token=c12db75b-b766-4418-8492-ad977b1066ad'
  );
  const [recipeData, setRecipeData] = useState({
    title: '',
    serves: '',
    slug: '',
    preheat: '',
    prepHour: 0,
    prepMin: 0,
    cookHour: 0,
    cookMin: 0,
    tags: [],
  });
  const [ingredients, setIngredients] = useState([
    {
      ingAmount: '',
      ingredient: '',
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      setRecipeData({
        ...recipeData,
        [name]: parseInt(value),
      });
    } else {
      setRecipeData({
        ...recipeData,
        [name]: value,
      });
    }
  };

  const handleListInputChange = (e, index, state, setState) => {
    const { name, value, type } = e.target;
    const list = [...state];

    if (type === 'number') {
      list[index][name] = parseFloat(value);
    } else {
      list[index][name] = value;
    }

    setState(list);
  };

  const handleCategoriesChange = (e) => {
    let name = e.target.name;
    let checked = e.target.checked;

    if (checked === true) {
      setTags((prev) => [...prev, name]);
    }
    // remove tags that have been unchecked by user that were previously selected
    if (checked === false) {
      let result = tags.filter((tag) => tag !== name);
      setTags(result);
    }
  };

  const handleAddAnotherIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        ingAmount: '',
        ingredient: '',
      },
    ]);
  };

  const handleAddAnotherStep = () => {
    setInstructions([...instructions, { step: '' }]);
  };

  const handleDeleteInput = (index, state, setState) => {
    const list = [...state];
    list.splice(index, 1);
    setState(list);
  };

  const handleFocusNextOnEnter = (e, handler) => {
    e.preventDefault();
    handler;
    const form = e.target.form;
    const index = [...form].indexOf(e.target);
    setTimeout(() => {
      form.elements[index + 2].focus();
    }, 100);
  };

  const handleEnteredFractions = () => {
    let tempIngredients = ingredients;
    tempIngredients.map((ing) => {
      const string = ing.ingAmount.toString();

      if (string.includes(' ')) {
        const splitString = string.split(' ');
        const integer = splitString[0];
        const fraction = splitString[1];

        if (fraction !== undefined) {
          if (fraction === '1/8') {
            ing.ingAmount = parseFloat(integer + '.125');
          } else if (fraction === '1/4') {
            ing.ingAmount = parseFloat(integer + '.25');
          } else if (fraction === '1/3') {
            ing.ingAmount = parseFloat(integer + '.33');
          } else if (fraction === '1/2') {
            ing.ingAmount = parseFloat(integer + '.5');
          } else if (fraction === '2/3') {
            ing.ingAmount = parseFloat(integer + '.66');
          } else if (fraction === '3/4') {
            ing.ingAmount = parseFloat(integer + '.75');
          }
        }
      }

      if (!string.includes(' ')) {
        if (ing.ingAmount === '1/8') {
          ing.ingAmount = 0.125;
        } else if (ing.ingAmount === '1/4') {
          ing.ingAmount = 0.25;
        } else if (ing.ingAmount === '1/3') {
          ing.ingAmount = 0.33;
        } else if (ing.ingAmount === '1/2') {
          ing.ingAmount = 0.5;
        } else if (ing.ingAmount === '2/3') {
          ing.ingAmount = 0.66;
        } else if (ing.ingAmount === '3/4') {
          ing.ingAmount = 0.75;
        } else {
          ing.ingAmount = parseFloat(ing.ingAmount);
        }
      }
    });
    setIngredients(tempIngredients);
  };

  const saveNewRecipe = (e) => {
    e.preventDefault();
    // create slug
    const title = recipeData.title;
    const removeApostrophes = title.replace(/'/g, '');
    const slug = removeApostrophes.replace(/\s/g, '-').toLowerCase();
    // calculate total time
    let totalHour = parseInt(recipeData.prepHour) + parseInt(recipeData.cookHour);
    let totalMin = parseInt(recipeData.prepMin) + parseInt(recipeData.cookMin);
    // display total time
    if (totalMin > 60) {
      totalMin = totalMin % 60;
      totalHour = totalHour + 1;
    }

    handleEnteredFractions();

    const fullRecipe = Object.assign(
      recipeData,
      { slug: slug },
      { addedByUid: userUID },
      { featureImg: featureImgURL },
      { ingredients: ingredients },
      { instructions: instructions },
      { totalHour: totalHour },
      { totalMin: totalMin },
      { tags: tags }
    );

    setRecipeData(fullRecipe);
    // console.log(fullRecipe);
    addRecipeToFirebase(recipeData);
    router.push(`/recipes/${recipeData.slug}`);
  };

  return (
    <>
      <h1 className='my-10 text-3xl text-white font-black'>Add New Recipe</h1>
      <form className='relative flex flex-col rounded px-5 w-11/12 md:max-w-xl md:px-8'>
        <StandardInput
          name='title'
          type='text'
          label='Title'
          placeholder="Grandma's Famous Cookies"
          value={recipeData.title}
          handleInputChange={handleInputChange}
          boolean={true}
        />

        <FeatureImageInput setFeatureImgURL={setFeatureImgURL} />

        <StandardInput
          name='serves'
          type='number'
          label='Serves'
          placeholder={4}
          value={recipeData.serves || ''}
          handleInputChange={handleInputChange}
          boolean={true}
        />
        <label className='text-white'>Preheat Oven?</label>
        <div className='flex'>
          <EmbeddedLabelInput
            name='preheat'
            type='number'
            label='deg'
            placeholder='--'
            value={recipeData.preheat || ''}
            handleInputChange={handleInputChange}
          />
        </div>

        <label className='text-white'>Prep Time</label>
        <div className='flex'>
          <EmbeddedLabelInput
            name='prepHour'
            type='number'
            label='Hour'
            placeholder='--'
            value={recipeData.prepHour || ''}
            handleInputChange={handleInputChange}
          />
          <EmbeddedLabelInput
            name='prepMin'
            type='number'
            label='Min'
            placeholder='--'
            value={recipeData.prepMin || ''}
            handleInputChange={handleInputChange}
          />
        </div>
        <label className='text-white'>Cook Time</label>
        <div className='flex'>
          <EmbeddedLabelInput
            name='cookHour'
            type='number'
            label='Hour'
            placeholder='--'
            value={recipeData.cookHour || ''}
            handleInputChange={handleInputChange}
          />
          <EmbeddedLabelInput
            name='cookMin'
            type='number'
            label='Min'
            placeholder='--'
            value={recipeData.cookMin || ''}
            handleInputChange={handleInputChange}
          />
        </div>

        <CategoryInput handleCategoriesChange={handleCategoriesChange} />

        <AddIngredients
          ingredients={ingredients}
          setIngredients={setIngredients}
          handleListInputChange={handleListInputChange}
          handleDeleteInput={handleDeleteInput}
          handleAddAnotherIngredient={handleAddAnotherIngredient}
          handleFocusNextOnEnter={handleFocusNextOnEnter}
        />

        <AddInstructions
          instructions={instructions}
          setInstructions={setInstructions}
          handleListInputChange={handleListInputChange}
          handleDeleteInput={handleDeleteInput}
          handleAddAnotherStep={handleAddAnotherStep}
          handleFocusNextOnEnter={handleFocusNextOnEnter}
        />

        <button
          className='flex justify-center items-center w-full bg-white text-primary py-5 rounded my-6 text-3xl font-black shadow-lg'
          type='button'
          onClick={saveNewRecipe}
        >
          Save
        </button>
      </form>
    </>
  );
}
