export const getStringPathname = (pathname) => {
  if (pathname.includes("companies")) {
    return "Компании";
  } else if (pathname.includes("proposals")) {
    return "Заявки";
  } else if (pathname.includes("basket")) {
    return "Загрузочные листы";
  } else if (pathname.includes("warehouse")) {
    return "Склады";
  } else if (pathname.includes("archive")) {
    return "Архивные Заявки";
  }
  return pathname;
};
