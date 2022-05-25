import { useState, useEffect } from 'react';

export default function AccountGreeting({ uxDisplayName, userName }) {
  const [message, setMessage] = useState('Hello');

  useEffect(() => {
    let time = new Date();
    let hour = time.getHours();

    if (hour < 12) {
      setMessage('Good morning');
    } else if (hour >= 12 && hour < 17) {
      setMessage('Good afternoon');
    } else if (hour >= 17 && hour < 24) {
      setMessage('Good evening');
    } else {
      setMessage('Hello');
    }
  }, []);

  return (
    <h1 className='text-3xl text-primary font-black text-center w-56 mt-6 mb-9 mx-auto lg:text-3xl'>
      {message}, {uxDisplayName.split(' ')[0] || userName.split(' ')[0]}!
    </h1>
  );
}
