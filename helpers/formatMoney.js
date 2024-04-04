export function formatMoney(moneyString) {
  const money = parseFloat(moneyString);
  if (Number.isNaN(money)) {
    // Если входная строка не является числом, вернем ее как есть
    return moneyString;
  }

  // Преобразуем число в строку и добавляем разделители тысяч
  return money.toLocaleString("ru-RU");
}
