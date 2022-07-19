import { useState, useRef, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion';

export default function Category({ state, title }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const [elementWidth, setElementWidth] = useState(0);
  const [elementScrollPos, setElementScrollPos] = useState(0);
  const scrollElement = useRef();
  const listElement = useRef();

  const getScrollPosition = (e) => {
    sessionStorage.setItem(title, JSON.stringify(e.target.scrollLeft));
  };

  useEffect(() => {
    // retrieve scroll positions from local storage if available and set scroll position
    const xPos = JSON.parse(sessionStorage.getItem(title));
    if (xPos) {
      scrollElement.current.scrollLeft = xPos;
    }
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setElementWidth(listElement.current.offsetWidth);
  }, [listElement.current]);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
    };
  }, []);

  const handleScrollRight = () => {
    const scrollDiv = scrollElement.current;
    scrollDiv.scrollLeft += windowWidth;
    setElementScrollPos((prev) => prev + windowWidth);
  };

  const handleScrollLeft = () => {
    const scrollDiv = scrollElement.current;
    scrollDiv.scrollLeft -= windowWidth;
    setElementScrollPos((prev) => prev - windowWidth);
  };

  return (
    <section className='relative'>
      {elementScrollPos > 0 && (
        <button
          onClick={handleScrollLeft}
          className='hidden absolute fine:flex justify-center items-center bg-neutral-800 bg-opacity-50 h-2/3 w-10 text-white text-6xl pb-3 left-0 top-8 z-40'
        >
          &#8249;
        </button>
      )}
      {elementWidth > windowWidth && (
        <button
          onClick={handleScrollRight}
          className='hidden absolute fine:flex justify-center items-center bg-neutral-800 bg-opacity-50 h-2/3 w-10 text-white text-6xl pb-3 right-0 top-8 z-40'
        >
          &#8250;
        </button>
      )}
      <h2 className='text-2xl ml-9 font-black tracking-tight capitalize'>
        {title === 'all' ? 'All Recipes' : title}{' '}
        <span className='text-neutral-500 text-lg pl-1'>&#62;</span>
      </h2>
      <div
        onScroll={getScrollPosition}
        ref={scrollElement}
        className='relative overflow-x-scroll no-scrollbar pr-2 scroll-smooth'
      >
        <motion.ul
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.1, type: 'spring', bounce: 1, mass: 0.5 }}
          className='relative flex w-max space-x-3 mb-8 first:ml-7'
          ref={listElement}
        >
          {state.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
