import InstructionsInput from './InstructionsInput';

export default function AddInstructions({
  instructions,
  setInstructions,
  handleListInputChange,
  handleDeleteInput,
  handleAddStepInput,
}) {
  return (
    <fieldset className='flex flex-wrap border border-solid border-gray-300 p-3 pb-5 mt-5 rounded'>
      <legend className='text-white text-3xl font-black px-2'>Instructions</legend>
      {instructions.map((step, index) => (
        <InstructionsInput
          key={index}
          step={step}
          index={index}
          handleDeleteInput={handleDeleteInput}
          handleListInputChange={handleListInputChange}
          instructions={instructions}
          setInstructions={setInstructions}
        />
      ))}
      <button
        className='flex justify-center items-center rounded p-2 m-1 bg-white min-w-full'
        onClick={handleAddStepInput}
        type='button'
      >
        + Add Step
      </button>
    </fieldset>
  );
}
