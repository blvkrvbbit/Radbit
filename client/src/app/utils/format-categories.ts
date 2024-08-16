type Category = {
  id: number;
  name: string;
};

const formatCategoryUrl = (category: string) => {
  if (category.includes('&')) {
    return category.split('&').join('-').replace(/\s/g, '');
  } else if (category.includes(' ')) {
    return category.split(' ').join('-').replace(/\s/g, '');
  }
  return category;
};

export const formatCategory = (category: string) => {
  const formattedCategory = '';
  let categoryArr = [];
  if (category.includes('-') && category.toLowerCase() !== 'real-estate') {
    categoryArr = category.split('-');

    return categoryArr
      .map((c) => {
        return c.slice(0, 1).toUpperCase() + c.slice(1, c.length);
      })
      .join(' & ');
  } else if (
    category.includes('-') &&
    category.toLowerCase() === 'real-estate'
  ) {
    categoryArr = category.split('-');
    return categoryArr
      .map((c) => {
        return c.slice(0, 1).toUpperCase() + c.slice(1, c.length);
      })
      .join(' ');
  }
  return category;
};

export default formatCategoryUrl;
