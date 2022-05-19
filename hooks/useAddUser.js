import { db } from '../firebase/config';
import { getAuth } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
// import { useUser } from './useUser';

export const useAddUser = () => {
  // const { userUID, userName, userProfileUrl, userEmail } = useUser();

  const addUserToFirebase = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user !== null) {
      const userData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      await setDoc(doc(db, 'Users', user.uid), {
        ...userData,
        created: Timestamp.now(),
      });
    }
  };

  return { addUserToFirebase };
};
