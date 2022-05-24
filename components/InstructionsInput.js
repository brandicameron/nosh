import { RiDeleteBinFill } from 'react-icons/ri';

export default function InstructionsInput({
  step,
  index,
  handleDeleteInput,
  handleListInputChange,
  instructions,
  setInstructions,
  handleAddAnotherStep,
  handleFocusNextOnEnter,
}) {
  return (
    <div className='relative flex flex-col w-full'>
      <label className='flex text-white' htmlFor='step'>
        Step {index + 1}
      </label>
      <textarea
        className='rounded p-1.5 mb-5 pr-10 leading-tight'
        rows={1}
        name='step'
        value={step.step}
        onChange={(e) => handleListInputChange(e, index, instructions, setInstructions)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleFocusNextOnEnter(e, handleAddAnotherStep());
          }
        }}
      />
      <button
        onClick={() => handleDeleteInput(index, instructions, setInstructions)}
        className='absolute top-[25px] right-0 p-1.5'
        type='button'
      >
        <RiDeleteBinFill className='text-xl text-neutral-400' />
      </button>
    </div>
  );
}
