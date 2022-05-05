import { useState } from 'react';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { RiFileUploadFill } from 'react-icons/ri';
import CategoryInput from '../components/CategoryInput';
import AddIngredients from '../components/AddIngredients';
import StandardInput from '../components/StandardInput';
import EmbeddedLabelInput from '../components/EmbeddedLabelInput';
import AddInstructions from '../components/AddInstructions';
import { useAddRecipe } from '../hooks/useAddRecipe';

export default function AddRecipe() {
  const { addRecipeToFirebase } = useAddRecipe();
  const [tags, setTags] = useState([]);
  const [instructions, setInstructions] = useState([{ step: '' }]);
  // const [imageUpload, setImageUpload] = useState(null);
  const [featureImgURL, setFeatureImgURL] = useState('');
  const [recipeData, setRecipeData] = useState({
    title: '',
    serves: '',
    slug: '',
    addedBy: 'Brandi',
    addedByImg: 'https://bc-portfolio.s3.amazonaws.com/Brandi_Cameron.jpg',
    preheat: '',
    prepHour: '',
    prepMin: '',
    cookHour: '',
    cookMin: '',
    tags: [],
  });
  const [ingredients, setIngredients] = useState([
    {
      ingAmount: '',
      ingUnit: 'tsp',
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
        ingUnit: 'tsp',
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

  const uploadImage = (e) => {
    const imageUpload = e.target.files[0];
    if (imageUpload === null) return;

    const imageRef = ref(storage, `featureImages/${imageUpload.name + uuidv4()}`);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);
    //upload to firebase
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setFeatureImgURL(downloadURL);
      });
    });
  };

  const saveNewRecipe = (e) => {
    e.preventDefault();

    const title = recipeData.title;
    const removeApostrophes = title.replace(/'/g, '');
    const slug = removeApostrophes.replace(/\s/g, '-').toLowerCase();

    const fullRecipe = Object.assign(
      recipeData,
      { slug: slug },
      { featureImg: featureImgURL },
      { ingredients: ingredients },
      { instructions: instructions },
      { tags: tags }
    );
    setRecipeData(fullRecipe);

    // reset form inputs
    setIngredients([
      {
        ingAmount: '',
        ingUnit: 'tsp',
        ingredient: '',
      },
    ]);

    setRecipeData({
      title: '',
      serves: '',
      preheat: '',
      prepHour: '',
      prepMin: '',
      cookHour: '',
      cookMin: '',
      tags: [],
    });

    setInstructions([{ step: '' }]);

    // console.log(recipeData);
    saveToFirebase();
  };

  const saveToFirebase = () => {
    addRecipeToFirebase(recipeData);
  };

  return (
    <div className='flex flex-col items-center bg-indigo-600 h-full w-screen -mt-10 pb-60'>
      <h1 className='my-10 text-3xl text-white font-black'>Add New Recipe</h1>
      <form
        onSubmit={saveNewRecipe}
        className='relative flex flex-col shadow-lg rounded px-5 w-11/12 md:max-w-xl md:px-8'
      >
        <StandardInput
          name='title'
          type='text'
          label='Title'
          placeholder='Your Great Recipe'
          value={recipeData.title}
          handleInputChange={handleInputChange}
          boolean={true}
        />
        <label className='text-white' htmlFor='featureImg'>
          Feature Image
        </label>
        <div className='flex'>
          <input onChange={uploadImage} className='mb-5 text-white' type='file' name='featureImg' />
        </div>
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
        />

        <AddInstructions
          instructions={instructions}
          setInstructions={setInstructions}
          handleListInputChange={handleListInputChange}
          handleDeleteInput={handleDeleteInput}
          handleAddAnotherStep={handleAddAnotherStep}
        />

        <button
          className='flex justify-center items-center w-full bg-white text-indigo-600 py-5 rounded my-6 text-3xl font-black shadow-lg'
          type='submit'
        >
          Save
        </button>
      </form>
    </div>
  );
}
