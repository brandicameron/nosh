export function getAllCategories() {
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

  const paths = categories.map((cat) => {
    return {
      params: {
        category: cat,
      },
    };
  });

  return { categories, paths };
}
