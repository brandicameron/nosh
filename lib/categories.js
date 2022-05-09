export function getAllCategories() {
  const categories = [
    'all',
    'appetizers',
    'sauces',
    'soups',
    'entrees',
    'sides',
    'desserts',
    'breakfast',
  ];

  const paths = categories.map((cat) => {
    return {
      params: {
        category: cat,
      },
    };
  });

  return { categories, paths };
}
