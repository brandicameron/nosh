import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export const useStorage = () => {
  const uploadImage = (acceptedFiles, setState, uploadFolder) => {
    const imageUpload = acceptedFiles[0];
    if (imageUpload === null) return;

    const imageRef = ref(storage, `${uploadFolder}/${imageUpload.name + uuidv4()}`);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);
    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        setState(downloadURL);
      });
    });
  };

  return { uploadImage };
};
