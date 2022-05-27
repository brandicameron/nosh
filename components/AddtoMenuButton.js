import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { useState, useEffect } from 'react';
import { RiBookmarkLine } from 'react-icons/ri';
import { RiBookmarkFill } from 'react-icons/ri';

export default function AddtoMenuButton({ position, recipe }) {
  const [showMenuAdded, setShowMenuAdded] = useState(false);
  const { menuItems } = useContext(AppContext);
  const { setMenuItems } = useContext(AppContext);

  const handleAddRemoveMenu = () => {
    addRemoveItemFromMenu();
  };

  const addRemoveItemFromMenu = () => {
    if (!menuItems.some((e) => e.id === recipe.id)) {
      setMenuItems([...menuItems, recipe]);
      setShowMenuAdded(true);
    }

    if (menuItems.some((e) => e.id === recipe.id)) {
      const filteredItems = menuItems.filter((item) => item.id !== recipe.id);
      setMenuItems(filteredItems);
      setShowMenuAdded(false);
    }
  };

  useEffect(() => {
    if (menuItems.some((e) => e.id === recipe.id)) {
      setShowMenuAdded(true);
    } else {
      setShowMenuAdded(false);
    }
  }, [menuItems, recipe]);

  return (
    <button
      onClick={() => handleAddRemoveMenu(recipe.id)}
      type='button'
      className={`absolute ${position} filter-shadow z-30`}
      aria-label='Add or Remove From Menu'
      title='Add or Remove From Menu'
    >
      {showMenuAdded ? (
        <RiBookmarkFill className='text-white text-4xl lg:text-3xl' />
      ) : (
        <RiBookmarkLine className='text-white text-4xl lg:text-3xl' />
      )}
    </button>
  );
}
