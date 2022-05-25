import { useState } from 'react';
import { useUpdateDisplayName } from '../hooks/useUpdateDisplayName';

export default function AccountChangeName({ setUxDisplayName }) {
  const [newDisplayName, setNewDisplayName] = useState('');
  const { handleNameChange } = useUpdateDisplayName();

  const handleNameInput = (e) => {
    setNewDisplayName(e.target.value);
    setUxDisplayName(e.target.value);
  };

  return (
    <form className='mb-5' onSubmit={(e) => handleNameChange(e, newDisplayName, setNewDisplayName)}>
      <label htmlFor='name' className='block mt-6'>
        Change Display Name
      </label>
      <input
        type='text'
        name='name'
        onChange={handleNameInput}
        value={newDisplayName}
        className='border border-gray-400 border-r-0 rounded-l-md appearance-none w-3/4 p-1.5 lg:rounded-md'
      />
      <button
        type='submit'
        className='bg-primary text-white rounded-r-md w-1/4 text-lg font-black p-1.5 -ml-1 transition-colors duration-150 hover:bg-primaryM'
      >
        Save
      </button>
    </form>
  );
}
