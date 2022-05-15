export default function Ingredient({ ing, servings, recipe }) {
  // Handle fractional amounts on ingredients
  const adjustIngredientAmounts = (amount) => {
    const singleServing = amount / recipe.serves;
    let newAmount = singleServing * servings;

    if (newAmount.toString().includes('.')) {
      const splitAmount = newAmount.toString().split('.');
      const integer = splitAmount[0] === '0' ? '' : splitAmount[0];
      const fractional = '.' + splitAmount[1];
      if (fractional >= 0.001 && fractional <= 0.1875) {
        return integer + ' ' + '1/8';
      } else if (fractional >= 0.1876 && fractional <= 0.2915) {
        return integer + ' ' + '1/4';
      } else if (fractional >= 0.2916 && fractional <= 0.4165) {
        return integer + ' ' + '1/3';
      } else if (fractional >= 0.4166 && fractional <= 0.58333333333333333) {
        return integer + ' ' + '1/2';
      } else if (fractional >= 0.584 && fractional <= 0.708333333333333333) {
        return integer + ' ' + '2/3';
      } else if (fractional >= 0.709 && fractional <= 0.875) {
        return integer + ' ' + '3/4';
      } else if (fractional >= 0.876 && fractional <= 1) {
        if (integer === '') {
          return integer + 1;
        }
        if (integer > 0) {
          return parseInt(integer) + 1;
        }
      } else {
        return newAmount;
      }
    }

    if (!newAmount.toString().includes('.')) {
      return newAmount;
    }
  };

  const makePlural = (amount, unit) => {
    if (unit) {
      if (amount > 1) {
        if (unit === 'cup') {
          return unit + 's';
        } else {
          return unit;
        }
      } else {
        return unit;
      }
    }
  };

  return (
    <li key={ing.ingredient} className='bg-neutral-100 rounded-xl p-3 leading-tight'>
      <span className='pr-1'>{adjustIngredientAmounts(ing.ingAmount)}</span>{' '}
      {makePlural(ing.ingAmount, ing.ingUnit)} {ing.ingredient}
    </li>
  );
}
