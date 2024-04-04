export function formatNumber(numberString) {
  const number = parseFloat(numberString);
  if (Number.isNaN(number)) {
    // Если входная строка не является числом, вернем ее как есть
    return numberString;
  }

  // Проверим, является ли число целым
  if (number % 1 === 0) {
    // Если число целое, вернем его без десятичной части
    return number.toString();
  } else {
    // Если есть десятичная часть, вернем исходное число
    return numberString;
  }
}
