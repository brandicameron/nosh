import { useState, useRef, useEffect } from 'react';
import RecipeCard from './RecipeCard';

export default function Category({ state, title }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollElement = useRef();
  const scrollRef = useRef(0);

  const getScrollPosition = (e) => {
    setScrollPosition(e.target.scrollLeft);
  };

  const handleSetScrollPosition = () => {
    //save scroll pos to local
    console.log('This saved to local: ' + scrollPosition);
    sessionStorage.setItem('scrollXPos', JSON.stringify(scrollPosition));
  };

  useEffect(() => {
    const xPos = JSON.parse(sessionStorage.getItem('scrollXPos'));
    if (xPos) {
      // console.log('This was retrieved: ' + xPos);
      scrollElement.current.scrollLeft = xPos;
    }
  }, []);

  return (
    <section>
      <h2 className='text-2xl ml-9 font-black tracking-tight'>
        {title} <span className='text-neutral-500 text-lg pl-1'>&#62;</span>
      </h2>
      <div
        onScroll={getScrollPosition}
        ref={scrollElement}
        className='overflow-x-scroll no-scrollbar'
      >
        <ul className='flex w-max space-x-4 mt-1 mb-10 first:ml-7'>
          {state.map((recipe) => (
            <RecipeCard
              handleSetScrollPosition={handleSetScrollPosition}
              key={recipe.id}
              recipe={recipe}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
