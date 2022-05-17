import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSignUp } from '../hooks/useSignUp';
import { useRouter } from 'next/router';

export default function Signup({ handleFormSwitch }) {
  const [inputValues, setInputValues] = useState({ email: '', displayName: '', password: '' });
  const [showPasswordMessage, setShowPasswordMessage] = useState(true);
  const { signUpUser, errorMessage } = useSignUp();
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  // Show/hide password length requirement message
  useEffect(() => {
    setShowPasswordMessage(true);
    if (inputValues.password) {
      if (inputValues.password.length > 5) {
        setShowPasswordMessage(false);
      } else {
        setShowPasswordMessage(true);
      }
    }
  }, [inputValues.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser(inputValues.email, inputValues.password, inputValues.displayName);
    router.push(`/`);
  };

  return (
    <div className='relative flex flex-col bg-white rounded-lg p-8 w-80'>
      <h1 className='text-3xl text-primary font-black text-center'>Sign up</h1>
      <div className='flex justify-center items-center border-2 rounded-full object-cover object-top w-8 h-8 mx-auto mt-3 mb-1 overflow-hidden'>
        <Image src='/images/user.svg' alt='' width={45} height={45} />
      </div>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input
          className='bg-neutral-100 text-red-600 valid:text-neutral-700 border rounded-md p-1 my-3 placeholder:text-neutral-500'
          type='email'
          name='email'
          placeholder='Email'
          value={inputValues.email}
          onChange={handleInputChange}
        />
        <input
          className='bg-neutral-100 border rounded-md p-1 placeholder:text-neutral-500'
          type='text'
          name='displayName'
          placeholder='Display Name'
          value={inputValues.displayName}
          onChange={handleInputChange}
        />
        <div className='relative'>
          <input
            className='bg-neutral-100 text-red-600 valid:text-neutral-700 w-full border rounded-md p-1 my-3 placeholder:text-neutral-500'
            type='password'
            name='password'
            minLength={6}
            placeholder='Password'
            value={inputValues.password}
            onChange={handleInputChange}
          />
          {showPasswordMessage && (
            <p className='absolute text-sm text-red-600 -mt-1 leading-none'>
              Password must be at least 6 characters.
            </p>
          )}
        </div>

        <button
          type='submit'
          disabled={inputValues.password.length < 6}
          className='bg-primary disabled:bg-primaryM disabled:cursor-not-allowed text-white rounded-md text-xl font-black py-2 mt-8 mb-3 transition-colors duration-150 hover:bg-primaryM'
        >
          Sign up
        </button>
        {errorMessage && (
          <p className='text-sm text-red-600 border border-red-600 rounded py-2 mb-2 text-center'>
            {errorMessage}
          </p>
        )}
        <a
          onClick={handleFormSwitch}
          className='text-sm text-center cursor-pointer transition-colors duration-150 text-primary hover:text-primaryM'
        >
          Already a user? <span className='underline'>LOGIN</span>
        </a>
      </form>
    </div>
  );
}
