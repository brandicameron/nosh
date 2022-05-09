import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const collRef = collection(db, 'recipes');
    const q = query(collRef, orderBy('created', 'desc'));
    const unsubscribe = () => {
      onSnapshot(q, (snapshot) => {
        let tempData = [];
        snapshot.docs.forEach((doc) => {
          tempData.push({ id: doc.id, ...doc.data() });
        });
        setData(tempData);
      });
    };
    unsubscribe();
  }, []);

  return { data };
};
