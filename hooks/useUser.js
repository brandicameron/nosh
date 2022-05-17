import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

export const useUser = () => {
  const [userUID, setUserUID] = useState(null);
  const [userName, setUserName] = useState('');
  const [userProfileUrl, setUserProfileUrl] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUID(user.uid);
        setUserName(user.displayName);
        setUserProfileUrl(user.photoURL);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return { userUID, userName, userProfileUrl, loggedIn };
};
