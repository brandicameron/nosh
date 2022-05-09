import { RiDeleteBinFill } from 'react-icons/ri';

export default function InstructionsInput({
  step,
  index,
  handleDeleteInput,
  handleListInputChange,
  instructions,
  setInstructions,
}) {
  return (
    <div className='relative flex flex-col w-full'>
      <label className='flex text-white' htmlFor='step'>
        Step {index + 1}
      </label>
      <input
        className='rounded p-1.5 mb-5 pr-10'
        type='text'
        name='step'
        value={step.step}
        onChange={(e) => handleListInputChange(e, index, instructions, setInstructions)}
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
