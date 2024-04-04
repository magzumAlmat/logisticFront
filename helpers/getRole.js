export const getRole = (role) => {
  switch (role) {
    case "admin":
      return "Администратор";
    case "manager":
      return "Менеджер";
    case "accountant":
      return "Бухгалтер";
    default:
      return "Пользователь";
  }
};
