import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { useUser } from '../hooks/useUser';
import { RiAccountCircleLine } from 'react-icons/ri';
import { RiAddCircleLine } from 'react-icons/ri';
import SearchBar from './SearchBar';

export default function SecondaryNav() {
  const [profileImg, setProfileImg] = useState('');
  const { loggedIn, userName, userUID, userProfileUrl } = useUser();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'Users', `${userUID}`), (doc) => {
      const data = doc.data();
      if (data) {
        setProfileImg(data.photoURL);
      }
    });
  }, []);

  return (
    <ul className='flex space-x-2'>
      <li className='mr-1'>
        <SearchBar />
      </li>
      <li>
        <Link href='/add-recipe'>
          <a title='Add New Recipe'>
            <span className='text-white cursor-pointer hover:opacity-80 sr-only'>
              Add New Recipe
            </span>
            <RiAddCircleLine className='text-white text-3xl hover:opacity-80' />
          </a>
        </Link>
      </li>
      <li>
        <Link href='/account'>
          <a title='Your Account'>
            <span className='text-white cursor-pointer hover:opacity-80 sr-only'>Your Account</span>
            {loggedIn && profileImg ? (
              <div className='h-8 w-8'>
                <Image
                  src={profileImg || userProfileUrl}
                  alt={`${userName}'s Profile Picture`}
                  width={28}
                  height={28}
                  className='rounded-full object-cover'
                />
              </div>
            ) : (
              <RiAccountCircleLine className='text-white text-3xl hover:opacity-80' />
            )}
          </a>
        </Link>
      </li>
    </ul>
  );
}
