import { db } from '../firebase/config';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useUser } from '../hooks/useUser';

export function useUpdateDeleteProfilePic() {
  const { userUID, userProfileUrl } = useUser();

  const updateDeleteProfilePic = (state) => {
    const oldProfile = userProfileUrl
      .split(
        'https://firebasestorage.googleapis.com/v0/b/recipes-13eed.appspot.com/o/profileImages%2F'
      )[1]
      .split('?')[0];
    const auth = getAuth();
    // Add new pic
    updateProfile(auth.currentUser, {
      photoURL: state,
    })
      .then(() => {
        // Update image in Users collection
        const userProfileImgRef = doc(db, 'Users', `${userUID}`);
        updateDoc(userProfileImgRef, {
          photoURL: state,
        });
      })
      .then(() => {
        // Delete old pic from firebase storage unless it's the generic user image
        if (oldProfile !== 'generic-user.gif') {
          const storage = getStorage();
          const oldProfileRef = ref(storage, `profileImages/${oldProfile}`);
          deleteObject(oldProfileRef);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { updateDeleteProfilePic };
}
