import Image from 'next/image';
import Link from 'next/link';
import { RiBookmarkLine } from 'react-icons/ri';
import { useContext } from 'react';
import { MenuContext } from '../MenuContext';

export default function MenuSidebar({ recipe }) {
  const { menuItems } = useContext(MenuContext);
  const { setMenuItems } = useContext(MenuContext);
  const slug = recipe.slug;

  const handleClearMenu = () => {
    setMenuItems([]);
  };

  return (
    <aside className='hidden bg-neutral-50 w-1/4 lg:block'>
      <h2 className='text-xl font-black text-white text-center py-2 bg-indigo-600 rounded-t-xl'>
        Menu
      </h2>
      {menuItems < 1 && (
        <div className='w-24 mt-12 m-auto'>
          <p className='text-center'>
            Click the <RiBookmarkLine className='m-auto text-4xl my-2' />
            button on any recipe to add them to your menu.
          </p>
        </div>
      )}
      {menuItems && (
        <ul className='space-y-4 text-sm'>
          {menuItems.map((item) => (
            <Link key={item.id} href={`/recipes/${item.slug}`}>
              <a>
                <li
                  className='flex items-center border-b border-neutral-200 p-3 leading-none'
                  style={{
                    backgroundColor: `${slug === item.slug ? '#eef2ff' : '#fafafa'}`,
                    fontWeight: `${slug === item.slug ? 'bold' : 'inherit'}`,
                  }}
                >
                  {item.featureImg && (
                    <div className='mr-2 w-8 h-8 rounded-full shadow-lg aspect-square border border-neutral-200'>
                      <Image
                        src={item.featureImg}
                        alt={item.title}
                        width={32}
                        height={32}
                        className='object-cover object-center rounded-full'
                      />
                    </div>
                  )}
                  {item.title}
                </li>
              </a>
            </Link>
          ))}
        </ul>
      )}
      {menuItems.length > 0 && (
        <button
          onClick={handleClearMenu}
          className='bg-indigo-500 text-white font-black w-full p-3 transition-colors duration-300 hover:bg-indigo-600'
        >
          Clear Menu
        </button>
      )}
    </aside>
  );
}
