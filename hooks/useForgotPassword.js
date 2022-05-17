import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';

export const useForgotPassword = () => {
  const [messageText, setMessageText] = useState('Forgot password?');

  const sendPasswordReset = (email) => {
    if (email === '') {
      setMessageText('Please enter your email address.');
      setTimeout(() => {
        setMessageText('Forgot password?');
      }, 2000);
    }
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessageText('Password reset email sent.');
        setTimeout(() => {
          setMessageText('Forgot password?');
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessageText(errorMessage);
      });
  };

  return { sendPasswordReset, messageText };
};
