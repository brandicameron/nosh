import Image from 'next/image';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useGoogleLogin } from '../hooks/useGoogleLogin';
import { useForgotPassword } from '../hooks/useForgotPassword';

export default function Login({ handleFormSwitch }) {
  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const { loginUser, errorMessage } = useLogin();
  const { googleLogin, errorMessageGoogle } = useGoogleLogin();
  const { sendPasswordReset, messageText } = useForgotPassword();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(inputValues.email, inputValues.password);
    setInputValues({ email: '', password: '' });
  };

  return (
    <div className='relative flex flex-col bg-white rounded-lg p-8 w-80'>
      <h1 className='text-3xl text-primary font-black text-center mb-2 leading-none'>Login</h1>

      <a
        onClick={googleLogin}
        className='flex justify-center items-center cursor-pointer mx-auto my-6 border rounded-full w-10 h-10'
      >
        <Image
          src='/images/google-icon.svg'
          alt='Logo'
          width={20}
          height={20}
          title='Login with Google'
        />
      </a>

      <form className='flex flex-col' onSubmit={handleSubmit}>
        <input
          className='bg-neutral-100 border rounded-md p-1 placeholder:text-neutral-500'
          type='email'
          name='email'
          placeholder='Email'
          value={inputValues.email}
          onChange={handleInputChange}
        />
        <input
          className='bg-neutral-100 border rounded-md mt-3 p-1 placeholder:text-neutral-500'
          type='password'
          name='password'
          placeholder='Password'
          value={inputValues.password}
          onChange={handleInputChange}
        />
        <a
          onClick={() => sendPasswordReset(inputValues.email)}
          className='text-sm cursor-pointer mt-1 mb-5 text-neutral-500 hover:text-primaryM'
        >
          {messageText}
        </a>
        <button
          type='submit'
          className='bg-primary text-white rounded-md text-xl font-black py-2 mb-3 transition-colors duration-150 hover:bg-primaryM'
        >
          Login
        </button>
        {errorMessage && (
          <p className='text-sm text-red-600 border border-red-600 rounded py-2 mb-2 text-center'>
            {errorMessage}
          </p>
        )}
        {errorMessageGoogle && (
          <p className='text-sm text-red-600 border border-red-600 rounded py-2 mb-2 text-center'>
            {errorMessageGoogle}
          </p>
        )}
        <a
          onClick={handleFormSwitch}
          className='text-sm text-center cursor-pointer transition-colors duration-150 text-primary hover:text-primaryM'
        >
          No account? <span className='underline'>SIGN UP</span>
        </a>
      </form>
    </div>
  );
}
