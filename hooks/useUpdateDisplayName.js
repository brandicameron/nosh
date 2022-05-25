import { db } from '../firebase/config';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useUser } from '../hooks/useUser';

export function useUpdateDisplayName() {
  const { userUID } = useUser();

  const handleNameChange = (e, state, setState) => {
    e.preventDefault();

    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: state,
    })
      .then(() => {
        // Update name in Users collection
        const userDisplayNameRef = doc(db, 'Users', `${userUID}`);
        updateDoc(userDisplayNameRef, {
          displayName: state,
        });
      })
      .then(() => {
        setState('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { handleNameChange };
}
