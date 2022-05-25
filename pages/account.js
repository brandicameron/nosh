import Head from 'next/head';
import { useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useUser } from '../hooks/useUser';
import { useFormSwitch } from '../hooks/useFormSwitch';
import Login from '../components/Login';
import Signup from '../components/Signup';
import AccountProfilePic from '../components/AccountProfilePic';
import AccountGreeting from '../components/AccountGreeting';
import AccountChangePic from '../components/AccountChangePic';
import AccountChangeName from '../components/AccountChangeName';

export default function Account() {
  const [uxDisplayName, setUxDisplayName] = useState('');
  const [newProfileURL, setNewProfileURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { userName, loggedIn, userProfileUrl } = useUser();
  const { handleFormSwitch, signUp } = useFormSwitch();
  const { logoutUser } = useLogout();

  return (
    <>
      <Head>
        <title>{loggedIn ? `${userName}'s Account` : 'Nosh | Login to Manage Your Account'}</title>
      </Head>

      <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-b from-primary to-primaryM -mt-9 pb-20'>
        {!loggedIn && !signUp && <Login handleFormSwitch={handleFormSwitch} />}
        {!loggedIn && signUp && <Signup handleFormSwitch={handleFormSwitch} />}

        {loggedIn && (
          <section className='bg-neutral-50 rounded-xl p-5 w-11/12  max-w-xs'>
            <AccountProfilePic
              isUploading={isUploading}
              newProfileURL={newProfileURL}
              userName={userName}
              userProfileUrl={userProfileUrl}
            />
            <AccountGreeting uxDisplayName={uxDisplayName} userName={userName} />
            <AccountChangePic
              setIsUploading={setIsUploading}
              newProfileURL={newProfileURL}
              setNewProfileURL={setNewProfileURL}
            />
            <AccountChangeName setUxDisplayName={setUxDisplayName} />

            <button
              className='bg-primary text-white rounded-md w-full text-xl font-black p-2 mt-8 transition-colors duration-150 hover:bg-primaryM'
              onClick={logoutUser}
            >
              Log Out
            </button>
          </section>
        )}
      </div>
    </>
  );
}
