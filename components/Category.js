import { useRef, useEffect } from 'react';
import RecipeCard from './RecipeCard';

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
        <ul className='flex w-max space-x-4 mt-1 mb-10 first:ml-7'>
          {state.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      </div>
    </section>
  );
}
