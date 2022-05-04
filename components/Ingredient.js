export default function Ingredient({ ing, servings, defaultServings }) {
  // Handle fractional amounts on ingredients
  const adjustIngredientAmounts = (amount) => {
    const singleServing = amount / defaultServings.current;
    let newAmount = singleServing * servings;
    const splitAmount = newAmount.toString().split('.');
    const integer = splitAmount[0] === '0' ? '' : splitAmount[0];
    const fractional = '.' + splitAmount[1];

    if (newAmount.toString().includes('.')) {
      if (fractional >= 0.0625 && fractional <= 0.1875) {
        return integer + ' ' + '1/8';
      } else if (fractional >= 0.1876 && fractional <= 0.2915) {
        return integer + ' ' + '1/4';
      } else if (fractional >= 0.2916 && fractional <= 0.4165) {
        return integer + ' ' + '1/3';
      } else if (fractional >= 0.4166 && fractional <= 0.583) {
        return integer + ' ' + '1/2';
      } else if (fractional >= 0.584 && fractional <= 0.708) {
        return integer + ' ' + '2/3';
      } else if (fractional >= 0.709 && fractional <= 0.875) {
        return integer + ' ' + '3/4';
      } else if (fractional >= 0.876 && fractional < 1.0625) {
        return parseInt(integer) + 1;
      }
    } else {
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
    <li key={ing.ingredient} className='bg-neutral-100 rounded-xl p-2'>
      <span className='pr-1'>{adjustIngredientAmounts(ing.ingAmount)}</span>{' '}
      {makePlural(ing.ingAmount, ing.ingUnit)} {ing.ingredient}
    </li>
  );
}
