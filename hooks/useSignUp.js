import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';

export const useSignUp = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const signUpUser = (email, password, name) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            'https://firebasestorage.googleapis.com/v0/b/recipes-13eed.appspot.com/o/featureImages%2Fgeneric-user.gif?alt=media&token=7f94e2f0-e570-45af-a8c6-99ff4437e27c',
        });
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
