import { useState, useEffect } from 'react';
import { RiFileUploadLine } from 'react-icons/ri';
import Head from 'next/head';
import { useLogout } from '../hooks/useLogout';
import { useUser } from '../hooks/useUser';
import { useFormSwitch } from '../hooks/useFormSwitch';
import Image from 'next/image';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useStorage } from '../hooks/useStorage';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, deleteObject } from 'firebase/storage';

export default function Account() {
  const { userName, userProfileUrl, loggedIn } = useUser();
  const [message, setMessage] = useState('Hello');
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newProfileURL, setNewProfileURL] = useState('');
  const { handleFormSwitch, signUp } = useFormSwitch();
  const { logoutUser } = useLogout();
  const { uploadImage } = useStorage();

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

  const handleProfileImageChange = (e) => {
    const newImage = e.target.files;
    uploadImage(newImage, setNewProfileURL);
  };

  useEffect(() => {
    setNewDisplayName(userName);
  }, []);

  const handleNameChange = () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: newDisplayName,
    })
      .then(() => {
        console.log('New name!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Updates user profile pic and deletes the old one from cloud storage
    if (newProfileURL) {
      const oldProfile = userProfileUrl
        .split(
          'https://firebasestorage.googleapis.com/v0/b/recipes-13eed.appspot.com/o/featureImages%2F'
        )[1]
        .split('?')[0];
      const auth = getAuth();
      // Add new pic
      updateProfile(auth.currentUser, {
        photoURL: newProfileURL,
      })
        .then(() => {
          // Delete old pic from firebase storage
          const storage = getStorage();
          const oldProfileRef = ref(storage, `featureImages/${oldProfile}`);
          deleteObject(oldProfileRef)
            .then(() => {
              console.log('File deleted successfully');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [newProfileURL]);

  return (
    <>
      <Head>
        <title>
          {loggedIn ? `${userName.split(' ')[0]}'s Account` : 'Nosh | Login to Manage Your Account'}
        </title>
      </Head>
      <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-b from-primary to-primaryM -mt-9 pb-20'>
        {!loggedIn && !signUp && <Login handleFormSwitch={handleFormSwitch} />}
        {!loggedIn && signUp && <Signup handleFormSwitch={handleFormSwitch} />}

        {loggedIn && (
          <section className='bg-neutral-50 rounded-xl p-5 max-w-xs'>
            <div className='bg-white border-2 rounded-full object-cover object-top w w-24 h-24 mx-auto -mt-14 mb-1 overflow-hidden'>
              <Image
                src={newProfileURL || userProfileUrl}
                alt={`${userName} Profile Picture`}
                width={96}
                height={96}
                className='object-cover'
              />
            </div>
            <h1 className='text-3xl text-primary font-black text-center mt-6 mb-9 lg:text-3xl'>
              {message}, {newDisplayName.split(' ')[0] || userName.split(' ')[0]}!
            </h1>

            <div
              aria-hidden
              className='dropzone relative flex flex-col justify-center items-center text-neutral-500 bg-white border-2 border-dashed border-gray-400 rounded w-full h-20'
            >
              <label
                htmlFor='fileDrop'
                className='absolute block w-full h-full'
                aria-hidden
              ></label>
              <input
                className='absolute w-full h-full opacity-0'
                type='file'
                name='fileDrop'
                onChange={handleProfileImageChange}
                aria-label='Click or Drag to Change Profile Pic'
              />
              <RiFileUploadLine className='text-3xl text-neutral-400' />
              <span className='w-48 text-center leading-tight text-sm'>Change Profile Pic</span>
            </div>

            <label className='block mt-9'>Change Display Name</label>
            <div className='flex justify-center items-center mb-5'>
              <input
                type='text'
                name='name'
                onChange={(e) => setNewDisplayName(e.target.value)}
                value={newDisplayName}
                className='border border-gray-400 border-r-0 appearance-none w-3/4 p-1.5 lg:rounded-l'
              />
              <button
                onClick={handleNameChange}
                className='bg-primary text-white rounded-r-md w-1/4 text-lg font-black p-1.5 -ml-1 transition-colors duration-150 hover:bg-primaryM'
              >
                Save
              </button>
            </div>

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
