import RecipeCard from './RecipeCard';

export default function Category({ state, title }) {
  return (
    <section>
      <h2 className='text-3xl ml-7 font-black tracking-tight'>{title}</h2>
      <div className='overflow-x-scroll no-scrollbar'>
        <ul className='flex w-max space-x-4 mt-2 mb-10 first:ml-7'>
          {state.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      </div>
    </section>
  );
}
