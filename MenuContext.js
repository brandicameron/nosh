import { createContext, useContext, useState } from 'react';

export const MenuContext = createContext();

export function MenuContextWrapper({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  const [recipeData, setRecipeData] = useState([]);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems, recipeData, setRecipeData }}>
      {children}
    </MenuContext.Provider>
  );
}
