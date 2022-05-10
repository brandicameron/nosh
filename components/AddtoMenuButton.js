import { useState } from 'react';
import { RiBookmarkLine } from 'react-icons/ri';
import { RiBookmarkFill } from 'react-icons/ri';

export default function AddtoMenuButton({ position, recipeId }) {
  // THIS NEEDS TO BE DONE IN CONTEXT - LOOSES STATE BETWEEN PAGES
  const [addToMenuActive, setAddToMenuActive] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const handleAddRemoveMenu = () => {
    setAddToMenuActive((prev) => !prev);
    // addRemoveItemFromMenu();
  };

  // const addRemoveItemFromMenu = () => {
  //   if (!addToMenuActive) {
  //     console.log('added');
  //     setMenuItems([...menuItems, recipeId]);
  //   }

  //   if (addToMenuActive) {
  //     console.log('Removed');
  //     let filteredItems = menuItems.filter((item) => item !== recipeId);
  //     setMenuItems(filteredItems);
  //   }
  // };

  // console.log(menuItems);

  return (
    <button
      onClick={() => handleAddRemoveMenu(recipeId)}
      type='button'
      className={`absolute ${position} filter-shadow z-50`}
      aria-label='Add or Remove From Menu'
    >
      {addToMenuActive ? (
        <RiBookmarkFill className='text-white text-3xl lg:text-2xl' />
      ) : (
        <RiBookmarkLine className='text-white text-3xl lg:text-2xl' />
      )}
    </button>
  );
}
