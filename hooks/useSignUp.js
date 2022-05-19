import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAddUser } from './useAddUser';
import { useState } from 'react';

export const useSignUp = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const { addUserToFirebase } = useAddUser();

  const signUpUser = async (email, password, name) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/recipes-13eed.appspot.com/o/profileImages%2Fgeneric-user.gif?alt=media&token=171d4ae6-32dc-43ef-9bde-3c9173db236d',
        });
      })
      .then(() => {
        addUserToFirebase();
      })
      .catch((error) => {
        setErrorMessage('This email already has an account.');
        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      });
  };

  return { signUpUser, errorMessage };
};
