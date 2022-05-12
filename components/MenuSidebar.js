import Image from 'next/image';
import Link from 'next/link';
import { RiBookmarkLine } from 'react-icons/ri';
import { useContext } from 'react';
import { AppContext } from '../AppContext';

export default function MenuSidebar({ recipe }) {
  const { menuItems } = useContext(AppContext);
  const { setMenuItems } = useContext(AppContext);
  const slug = recipe.slug;

  const handleClearMenu = () => {
    setMenuItems([]);
  };

  return (
    <aside
      className={`${
        menuItems < 1 ? 'hidden lg:block' : 'flex flex-col left-0 lg:relative'
      } bg-neutral-50 rounded-t-xl w-1/4 lg:w-1/4`}
    >
      <h2 className='text-xl font-black text-center py-2 rounded-t-xl bg-primary text-white'>
        Menu
      </h2>
      {menuItems < 1 && (
        <div className='w-16 m-auto leading-snug lg:w-24 lg:mt-12'>
          <p className='text-center my-12'>
            Click the <RiBookmarkLine className='m-auto text-4xl my-2' />
            button on any recipe to add it to your menu.
          </p>
        </div>
      )}
      {menuItems && (
        <ul className='space-y-4 text-sm'>
          {menuItems.map((item) => (
            <Link key={item.id} href={`/recipes/${item.slug}`}>
              <a>
                <li
                  className='flex items-center justify-center border-b border-neutral-200 p-3 leading-none'
                  style={{
                    backgroundColor: `${slug === item.slug ? '#eef2ff' : '#fafafa'}`,
                    fontWeight: `${slug === item.slug ? 'bold' : 'inherit'}`,
                  }}
                >
                  {item.featureImg && (
                    <div className='mr-2 w-12 h-12 rounded-full shadow-lg aspect-square border border-neutral-200 lg:w-8 lg:h-8'>
                      <Image
                        src={item.featureImg}
                        alt={item.title}
                        width={32}
                        height={32}
                        layout='responsive'
                        className='object-cover object-center rounded-full'
                      />
                    </div>
                  )}
                  <span className='hidden lg:block'>{item.title}</span>
                </li>
              </a>
            </Link>
          ))}
        </ul>
      )}
      {menuItems.length > 0 && (
        <button
          onClick={handleClearMenu}
          className='bg-primaryM rounded-xl text-white mt-auto leading-none font-black p-3 transition-colors duration-300 hover:bg-indigo-600'
        >
          Clear Menu
        </button>
      )}
    </aside>
  );
}
