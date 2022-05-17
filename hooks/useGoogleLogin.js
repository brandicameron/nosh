import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useState } from 'react';

export const useGoogleLogin = (e) => {
  const [errorMessageGoogle, setErrorMessageGoogle] = useState('');

  const googleLogin = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessageGoogle = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setErrorMessageGoogle(error.message);
        // ...
      });
  };
  return { googleLogin, errorMessageGoogle };
};
