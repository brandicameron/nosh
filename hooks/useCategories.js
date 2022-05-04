export const useCategories = () => {
  // Must also make changes in [category].js under getStaticPaths
  const categories = [
    'appetizers',
    'sauces',
    'soups',
    'entrees',
    'sides',
    'desserts',
    'breakfast',
    'drinks',
  ];

  return { categories };
};
