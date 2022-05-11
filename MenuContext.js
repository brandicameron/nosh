import { createContext, useContext, useState } from 'react';

export const MenuContext = createContext();

export function MenuContextWrapper({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  console.log(menuItems);
  // console.log(menuItems[0].id);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>{children}</MenuContext.Provider>
  );
}
