import { createContext, useState, useRef, useEffect } from 'react';

export const AppContext = createContext();

export function AppContextWrapper({ children }) {
  const [menuItems, setMenuItems] = useState([]);
  const [recipeData, setRecipeData] = useState([]);

  return (
    <AppContext.Provider value={{ menuItems, setMenuItems, recipeData, setRecipeData }}>
      {children}
    </AppContext.Provider>
  );
}
