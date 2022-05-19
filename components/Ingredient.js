export default function Ingredient({ ing, servings, recipe }) {
  const calculateAndFormatIngredientAmount = (amount) => {
    const singleServing = amount / recipe.serves;
    const adjustedAmount = singleServing * servings;

    if (adjustedAmount.toString().includes('.')) {
      const splitAmount = adjustedAmount.toString().split('.');
      const integer = splitAmount[0] === '0' ? '' : splitAmount[0];
      const fractionalAmount = '.' + splitAmount[1];
      // prevents returning (ex) .583333333333333333333 in the recipe

      const fractional = fractionalAmount.slice(0, 3);
      if (fractional >= 0.001 && fractional <= 0.1875) {
        return integer + ' ' + '⅛';
      } else if (fractional >= 0.1876 && fractional <= 0.2915) {
        return integer + ' ' + '¼';
      } else if (fractional >= 0.2916 && fractional <= 0.4165) {
        return integer + ' ' + '⅓';
      } else if (fractional >= 0.4166 && fractional <= 0.583) {
        return integer + ' ' + '½';
      } else if (fractional >= 0.584 && fractional <= 0.708) {
        return integer + ' ' + '⅔';
      } else if (fractional >= 0.709 && fractional <= 0.875) {
        return integer + ' ' + '¾';
      } else if (fractional >= 0.876 && fractional <= 1) {
        if (integer === '') {
          return integer + 1;
        }
        if (integer > 0) {
          return parseInt(integer) + 1;
        }
      } else {
        return adjustedAmount;
      }
    }

    if (!adjustedAmount.toString().includes('.')) {
      return adjustedAmount;
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
    <li key={ing.ingredient} className='px-4 py-1 leading-tight'>
      {ing.ingAmount && (
        <span className='pr-1 font-bold'>{calculateAndFormatIngredientAmount(ing.ingAmount)}</span>
      )}
      {makePlural(ing.ingAmount, ing.ingUnit)} {ing.ingredient}
    </li>
  );
}
