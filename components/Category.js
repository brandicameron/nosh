import RecipeCard from './RecipeCard';

export default function Category({ state, title }) {
  return (
    <section>
      <h2 className='text-2xl ml-9 font-black tracking-tight'>
        {title} <span className='text-neutral-500 text-lg pl-1'>&#62;</span>
      </h2>
      <div className='overflow-x-scroll no-scrollbar'>
        <ul className='flex w-max space-x-4 mt-1 mb-10 first:ml-7'>
          {state.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      </div>
    </section>
  );
}
