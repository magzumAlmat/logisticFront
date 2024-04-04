export function extractName(inputString) {
  if (!inputString) {
    return "";
  }

  // Используем регулярное выражение для поиска названия города после числа и перед датой
  const match = inputString.match(/^\d+\)\s*([^\d]+)/);

  // Если найдено совпадение, возвращаем извлеченное название
  if (match && match.length === 2) {
    return match[1].trim();
  }

  // В противном случае возвращаем пустую строку
  return "";
}
