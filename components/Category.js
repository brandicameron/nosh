import { useRef, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion';

export default function Category({ state, title }) {
  const scrollElement = useRef();

  const getScrollPosition = (e) => {
    sessionStorage.setItem(title, JSON.stringify(e.target.scrollLeft));
  };

  // retrieve scroll positions from local storage if available and set scroll position
  useEffect(() => {
    const xPos = JSON.parse(sessionStorage.getItem(title));
    if (xPos) {
      scrollElement.current.scrollLeft = xPos;
    }
  }, []);

  //works, but not sure I super love it
  // https://alvarotrigo.com/blog/scroll-horizontally-with-mouse-wheel-vanilla-java/

  // useEffect(() => {
  //   const scrollDiv = scrollElement.current;

  //   scrollDiv.addEventListener('wheel', (e) => {
  //     scrollDiv.scrollLeft += e.deltaY;
  //   });

  //   return () => {
  //     scrollDiv.removeEventListener('wheel', (e) => {
  //       scrollDiv.scrollLeft += e.deltaY;
  //     });
  //   };
  // }, []);

  return (
    <section>
      <h2 className='text-2xl ml-9 font-black tracking-tight capitalize'>
        {title === 'all' ? 'All Recipes' : title}{' '}
        <span className='text-neutral-500 text-lg pl-1'>&#62;</span>
      </h2>
      <div
        onScroll={getScrollPosition}
        ref={scrollElement}
        className='overflow-x-scroll no-scrollbar'
      >
        <motion.ul
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1, type: 'spring', bounce: 1, mass: 0.5 }}
          className='flex w-max space-x-3 mb-8 first:ml-7'
        >
          {state.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
