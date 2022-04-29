import { useState } from 'react';
import { RiFileUploadFill } from 'react-icons/ri';
import CategoryInput from '../components/CategoryInput';
import AddIngredients from '../components/AddIngredients';
import StandardInput from '../components/StandardInput';
import EmbeddedLabelInput from '../components/EmbeddedLabelInput';
import AddInstructions from '../components/AddInstructions';
import { useAddRecipe } from '../hooks/useAddRecipe';

export default function AddRecipe() {
  const { addRecipe } = useAddRecipe();
  const [tags, setTags] = useState([]);
  const [instructions, setInstructions] = useState([{ step: '' }]);
  const [recipeData, setRecipeData] = useState({
    title: '',
    serves: '',
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
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

  const handleListInputChange = (e, index, state, setState) => {
    const { name, value } = e.target;
    const list = [...state];
    list[index][name] = value;

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

  const handleAddIngredientInput = () => {
    setIngredients([
      ...ingredients,
      {
        ingAmount: '',
        ingUnit: 'tsp',
        ingredient: '',
      },
    ]);
  };

  const handleAddStepInput = () => {
    setInstructions([...instructions, { step: '' }]);
  };

  const handleDeleteInput = (index, state, setState) => {
    const list = [...state];
    list.splice(index, 1);
    setState(list);
  };

  const handleSaveNewRecipe = (e) => {
    e.preventDefault();

    const fullRecipe = Object.assign(
      recipeData,
      { ingredients: ingredients },
      { instructions: instructions },
      { tags: tags }
    );
    setRecipeData(fullRecipe);
    console.log(recipeData);
    saveToFirebase();

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
  };

  const saveToFirebase = () => {
    addRecipe(recipeData);
  };

  return (
    <div className='flex flex-col items-center bg-indigo-600 h-full w-screen -mt-10 pb-60'>
      <h1 className='my-10 text-3xl text-white font-black'>Add New Recipe</h1>
      <form
        onSubmit={handleSaveNewRecipe}
        className='relative flex flex-col shadow-lg rounded px-5 w-11/12 md:max-w-xl md:px-8'
      >
        <StandardInput
          name='title'
          type='text'
          label='Title'
          placeholder='Your Great Recipe'
          value={recipeData.title}
          handleInputChange={handleInputChange}
        />
        <StandardInput
          name='serves'
          type='number'
          label='Serves'
          placeholder={4}
          value={recipeData.serves}
          handleInputChange={handleInputChange}
        />
        <label className='text-white'>Preheat Oven?</label>
        <div className='flex'>
          <EmbeddedLabelInput
            name='preheat'
            type='number'
            label='deg'
            placeholder='--'
            value={recipeData.preheat}
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
            value={recipeData.prepHour}
            handleInputChange={handleInputChange}
          />
          <EmbeddedLabelInput
            name='prepMin'
            type='number'
            label='Min'
            placeholder='--'
            value={recipeData.prepMin}
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
            value={recipeData.cookHour}
            handleInputChange={handleInputChange}
          />
          <EmbeddedLabelInput
            name='cookMin'
            type='number'
            label='Min'
            placeholder='--'
            value={recipeData.cookMin}
            handleInputChange={handleInputChange}
          />
        </div>

        <CategoryInput handleCategoriesChange={handleCategoriesChange} />

        <AddIngredients
          ingredients={ingredients}
          setIngredients={setIngredients}
          handleListInputChange={handleListInputChange}
          handleDeleteInput={handleDeleteInput}
          handleAddIngredientInput={handleAddIngredientInput}
        />

        <AddInstructions
          instructions={instructions}
          setInstructions={setInstructions}
          handleListInputChange={handleListInputChange}
          handleDeleteInput={handleDeleteInput}
          handleAddStepInput={handleAddStepInput}
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
