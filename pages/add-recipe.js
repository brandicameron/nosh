import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import { RiFileUploadLine } from 'react-icons/ri';
import CategoryInput from '../components/CategoryInput';
import AddIngredients from '../components/AddIngredients';
import StandardInput from '../components/StandardInput';
import EmbeddedLabelInput from '../components/EmbeddedLabelInput';
import AddInstructions from '../components/AddInstructions';
import { useAddRecipe } from '../hooks/useAddRecipe';
import { useStorage } from '../hooks/useStorage';

export default function AddRecipe() {
  const router = useRouter();
  const { addRecipeToFirebase } = useAddRecipe();
  const { uploadImage } = useStorage();
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState(['all']);
  const [instructions, setInstructions] = useState([{ step: '' }]);

  const [featureImgURL, setFeatureImgURL] = useState(
    'https://firebasestorage.googleapis.com/v0/b/recipes-13eed.appspot.com/o/featureImages%2Fno-image.jpg?alt=media&token=eb5ed515-b8c4-402e-a895-86586316674a'
  );
  const [recipeData, setRecipeData] = useState({
    title: '',
    serves: '',
    slug: '',
    preheat: '',
    prepHour: 0,
    prepMin: 0,
    cookHour: '',
    cookMin: '',
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

  const acceptStyle = {
    backgroundColor: '#d6fdd6',
  };

  const rejectStyle = {
    borderColor: '#ff1744',
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign({
            preview: URL.createObjectURL(file),
          })
        )
      );
      uploadImage(acceptedFiles, setFeatureImgURL);
    },
  });

  const style = useMemo(
    () => ({
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragAccept, isDragReject]
  );

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

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

  const saveNewRecipe = (e) => {
    e.preventDefault();
    const title = recipeData.title;
    const removeApostrophes = title.replace(/'/g, '');
    const slug = removeApostrophes.replace(/\s/g, '-').toLowerCase();
    let totalHour = parseInt(recipeData.prepHour) + parseInt(recipeData.cookHour) || 0;
    let totalMin = parseInt(recipeData.prepMin) + parseInt(recipeData.cookMin) || 0;

    if (totalMin > 60) {
      totalMin = totalMin % 60;
      totalHour = totalHour + 1;
    }

    const fullRecipe = Object.assign(
      recipeData,
      { slug: slug },
      { addedBy: 'Brandi' },
      { addedByImg: 'https://bc-portfolio.s3.amazonaws.com/Brandi_Cameron.jpg' },
      { featureImg: featureImgURL },
      { ingredients: ingredients },
      { instructions: instructions },
      { totalHour: totalHour },
      { totalMin: totalMin },
      { tags: tags }
    );

    setRecipeData(fullRecipe);
    addRecipeToFirebase(recipeData);
    router.push('/');
  };

  return (
    <section className='flex flex-col items-center bg-primary h-full w-screen -mt-10 pb-60'>
      <h1 className='my-10 text-3xl text-white font-black'>Add New Recipe</h1>
      <form
        onSubmit={saveNewRecipe}
        className='relative flex flex-col rounded px-5 w-11/12 md:max-w-xl md:px-8'
      >
        <StandardInput
          name='title'
          type='text'
          label='Title'
          placeholder="Grandma's Famous Cookies"
          value={recipeData.title}
          handleInputChange={handleInputChange}
          boolean={true}
        />
        <label className='text-white' htmlFor='featureImg'>
          Feature Image
        </label>
        <div
          {...getRootProps({ style })}
          className='flex justify-around items-center text-neutral-500 bg-white border-2 border-dashed border-gray-400 p-5 rounded mb-4'
        >
          <div className='flex flex-col justify-center items-center'>
            <input {...getInputProps()} />
            <RiFileUploadLine className='text-3xl text-neutral-400' />
            <p>Drag and drop, or click to select files</p>
          </div>
          {files[0] !== undefined && (
            <img
              width={96}
              height={64}
              src={files[0].preview}
              alt=''
              onLoad={() => {
                URL.revokeObjectURL(files[0].preview);
              }}
              className='rounded w-24 h-16 object-cover'
            />
          )}
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
    </section>
  );
}
