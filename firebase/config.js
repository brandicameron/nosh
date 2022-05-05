import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAp73gk_-nM7ASXtJDtHkaqz3GaueD3eFk',
  authDomain: 'recipes-13eed.firebaseapp.com',
  projectId: 'recipes-13eed',
  storageBucket: 'recipes-13eed.appspot.com',
  messagingSenderId: '499394201877',
  appId: '1:499394201877:web:1ed52e2b7a60b16023411c',
};

const app = initializeApp(firebaseConfig); //new, made this a variable
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);

export { db, auth, storage };
