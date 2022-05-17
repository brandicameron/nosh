import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useLogout } from '../hooks/useLogout';
import { useUser } from '../hooks/useUser';
import { useFormSwitch } from '../hooks/useFormSwitch';
import Image from 'next/image';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function Account() {
  const [message, setMessage] = useState('Hello');
  const { userName, userProfileUrl, loggedIn } = useUser();
  const { handleFormSwitch, signUp } = useFormSwitch();
  const { logoutUser } = useLogout();

  useEffect(() => {
    let time = new Date();
    let hour = time.getHours();

    if (hour < 12) {
      setMessage('Good morning');
    } else if (hour >= 12 && hour < 17) {
      setMessage('Good afternoon');
    } else if (hour >= 17 && hour < 24) {
      setMessage('Good evening');
    } else {
      setMessage('Hello');
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          {loggedIn ? `${userName.split(' ')[0]}'s Account` : 'Nosh | Login to Manage Your Account'}
        </title>
      </Head>
      <section
        className={`flex flex-col justify-center items-center ${
          loggedIn ? 'h-full' : 'h-screen bg-primary -mt-9 pb-20'
        }`}
      >
        {!loggedIn && !signUp && <Login handleFormSwitch={handleFormSwitch} />}
        {!loggedIn && signUp && <Signup handleFormSwitch={handleFormSwitch} />}
        {loggedIn && (
          <h1 className='text-3xl text-primary font-black text-center'>
            {message}, {userName.split(' ')[0]}!
          </h1>
        )}
        {loggedIn && userProfileUrl && (
          <div className='flex justify-center items-center border-2 rounded-full object-cover object-top w-24 h-24 mx-auto mt-3 mb-1 overflow-hidden'>
            <Image
              src={userProfileUrl}
              alt={`${userName} Profile Picture`}
              width={96}
              height={96}
              className='object-cover'
            />
          </div>
        )}
        {loggedIn && (
          <button
            className='bg-primary text-white rounded-md w-28 mx-auto text-xl font-black p-2 mt-8 transition-colors duration-150 hover:bg-primaryM'
            onClick={logoutUser}
          >
            Log Out
          </button>
        )}
      </section>
    </>
  );
}
