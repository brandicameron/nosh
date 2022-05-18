export default function RecipeInstructions({ recipe }) {
  return (
    <section className='bg-neutral-100 w-full mt-2 lg:h-full lg:w-10/12 lg:mt-0'>
      <h2 className='text-xl font-black text-white text-center py-2 bg-primary rounded-t-xl'>
        {recipe.preheat ? `Preheat Oven to ${recipe.preheat}°` : 'Instructions'}
      </h2>
      <ul className='space-y-3 px-3 py-4 h-full lg:pb-20'>
        {recipe.instructions.map((step, index) => (
          <li key={step.step} className='px-2 py-[6px] flex'>
            <span className='flex justify-center items-center text-white bg-primary rounded-full w-8 h-8 aspect-square font-black text-2xl mr-2 lg:-mt-1'>
              {index + 1}
            </span>{' '}
            {step.step}
          </li>
        ))}
      </ul>
    </section>
  );
}
