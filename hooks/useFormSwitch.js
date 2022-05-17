import { useState } from 'react';

export const useFormSwitch = () => {
  const [signUp, setSignUp] = useState(false);

  const handleFormSwitch = () => {
    setSignUp((prev) => !prev);
  };

  return { handleFormSwitch, signUp };
};
