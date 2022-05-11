export default function RecipeInstructions({ recipe }) {
  return (
    <section className='bg-neutral-100 w-full mt-8 lg:h-full lg:w-10/12 lg:mt-0'>
      <h2 className='text-xl font-black text-white text-center py-2 bg-indigo-600 rounded-t-xl'>
        {recipe.preheat ? `Preheat Oven to ${recipe.preheat}°` : 'Instructions'}
      </h2>
      <ul className='space-y-4 p-4 h-full lg:pb-20'>
        {recipe.instructions.map((step, index) => (
          <li key={step.step} className='p-2'>
            <span className='block text-indigo-600 font-black text-2xl'>Step {index + 1}</span>{' '}
            {step.step}
          </li>
        ))}
      </ul>
    </section>
  );
}
