import { formatDate } from "@/helpers/formatDate";

export const formatRows = (rows) => {
  return rows.map((row) => {
    let cars = "";
    let frakhtUSD = 0;
    let frakhtCHY = 0;
    let frakhtKZT = 0;
    let stock_statuses = "";
    let local_expenses = "";
    if (row.cars) {
      cars = row.cars
        .map((car) => car.company_car_number.car_registration_number)
        .join("\n");

      frakhtUSD = row.cars.reduce((acc, car) => {
        if (car.frakht_currency === "USD") {
          return acc + parseFloat(car.frakht);
        }
        return acc;
      }, 0);

      frakhtCHY = row.cars.reduce((acc, car) => {
        if (car.frakht_currency === "CHY") {
          return acc + parseFloat(car.frakht);
        }
        return acc;
      }, 0);

      frakhtKZT = row.cars.reduce((acc, car) => {
        if (car.frakht_currency === "KZT") {
          return acc + parseFloat(car.frakht);
        }
        return acc;
      }, 0);
    }

    if (row.stock_statuses.length > 0) {
      stock_statuses = row.stock_statuses
        .map((status, index) => {
          return `${index + 1}) ${status.stage} ${
            status.description
          } ${formatDate(status.date)}`;
        })
        .join(", ");
    }

    if (row.local_expenses.length > 0) {
      const local_expensesCHY = row.local_expenses.filter(
        (expense) => expense.currency === "CHY"
      );

      const local_expensesUSD = row.local_expenses.filter(
        (expense) => expense.currency === "USD"
      );

      const local_expensesKZT = row.local_expenses.filter(
        (expense) => expense.currency === "KZT"
      );

      const totalLocalExpensesCHY = local_expensesCHY.reduce(
        (acc, expense) => acc + parseFloat(expense.price),
        0
      );

      const totalLocalExpensesUSD = local_expensesUSD.reduce(
        (acc, expense) => acc + parseFloat(expense.price),
        0
      );

      const totalLocalExpensesKZT = local_expensesKZT.reduce(
        (acc, expense) => acc + parseFloat(expense.price),
        0
      );

      local_expenses = `CHY ${totalLocalExpensesCHY} USD ${totalLocalExpensesUSD} KZT ${totalLocalExpensesKZT}`;
    }

    return {
      ...row,
      cars,
      stock_statuses,
      local_expenses,
      frakhtUSD,
      frakhtCHY,
      frakhtKZT,
      arrival_date: row.arrival_date
        ? new Date(row.arrival_date).toLocaleDateString("ru-RU")
        : null,
    };
  });
};

export const typeOptions = [
  {
    value: "На авто",
    label: "На авто",
  },
  {
    value: "Самоход",
    label: "Самоход",
  },
];

export const kppLabels = [
  {
    value: "Зимунай-Майкапчагай",
    label: "Зимунай-Майкапчагай",
  },
  {
    value: "Тачен-Бахты",
    label: "Тачен-Бахты",
  },
  {
    value: "Алашанькоу-Достык",
    label: "Алашанькоу-Достык",
  },
  {
    value: "Хоргос-Нуржолы",
    label: "Хоргос-Нуржолы",
  },
  {
    value: "Дулаты-Кольжат",
    label: "Дулаты-Кольжат",
  },
];

export const statusLabels = [
  {
    value: "Встала на склад под загрузку",
    label: "Встала на склад под загрузку",
  },
  {
    value: "Загрузилась",
    label: "Загрузилась",
  },
  {
    value: "Выехала",
    label: "Выехала",
  },
];

export const headCells = [
  {
    id: "internal_order_number",
    numeric: false,
    disablePadding: false,
    label: "Номер загрузочного листа",
  },
  {
    id: "arrival_date",
    numeric: false,
    disablePadding: false,
    label: "Дата прибытия",
  },
  {
    id: "cars",
    numeric: false,
    disablePadding: false,
    label: "Автомашины",
  },
  {
    id: "kpp",
    numeric: false,
    disablePadding: false,
    label: "КПП",
  },

  {
    id: "frakhtUSD",
    numeric: false,
    disablePadding: false,
    label: "Фрахт USD",
  },
  {
    id: "frakhtCHY",
    numeric: false,
    disablePadding: false,
    label: "Фрахт CHY",
  },
  {
    id: "frakhtKZT",
    numeric: false,
    disablePadding: false,
    label: "Фрахт KZT",
  },
  {
    id: "total_quantity",
    numeric: false,
    disablePadding: false,
    label: "Общее количество",
  },
  {
    id: "total_weight",
    numeric: false,
    disablePadding: false,
    label: "Общий вес",
  },
  {
    id: "total_volume",
    numeric: false,
    disablePadding: false,
    label: "Общий объём",
  },
  {
    id: "usd_exchange_rate",
    numeric: false,
    disablePadding: false,
    label: "Курс",
  },
  {
    id: "total_rate_usd",
    numeric: false,
    disablePadding: false,
    label: "Общая стоимость USD",
  },
  {
    id: "total_rate_kzt",
    numeric: false,
    disablePadding: false,
    label: "Общая стоимость KZT",
  },
  {
    id: "local_expenses",
    numeric: false,
    disablePadding: false,
    label: "Локальные расходы",
  },
  {
    id: "stock_statuses",
    numeric: false,
    disablePadding: false,
    label: "Статус",
    width: 200,
  },
];

export const headCells2 = [
  {
    id: "internal_order_number",
    numeric: false,
    disablePadding: false,
    label: "Номер загрузочного листа",
  },
  {
    id: "arrival_date",
    numeric: false,
    disablePadding: false,
    label: "Дата прибытия",
  },
  {
    id: "cars",
    numeric: false,
    disablePadding: false,
    label: "Автомашины",
  },
  {
    id: "kpp",
    numeric: false,
    disablePadding: false,
    label: "КПП",
  },
  {
    id: "type",
    numeric: false,
    disablePadding: false,
    label: "Тип",
  },
  {
    id: "frakhtUSD",
    numeric: false,
    disablePadding: false,
    label: "Фрахт USD",
  },
  {
    id: "frakhtCHY",
    numeric: false,
    disablePadding: false,
    label: "Фрахт CHY",
  },
  {
    id: "frakhtKZT",
    numeric: false,
    disablePadding: false,
    label: "Фрахт KZT",
  },
  {
    id: "total_quantity",
    numeric: false,
    disablePadding: false,
    label: "Общее количество",
  },
  {
    id: "total_weight",
    numeric: false,
    disablePadding: false,
    label: "Общий вес",
  },
  // {
  //   id: "total_dshv",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Общий размер (ДШВ)",
  // },
  {
    id: "usd_exchange_rate",
    numeric: false,
    disablePadding: false,
    label: "Курс",
  },
  {
    id: "total_rate_usd",
    numeric: false,
    disablePadding: false,
    label: "Общая стоимость USD",
  },
  {
    id: "total_rate_kzt",
    numeric: false,
    disablePadding: false,
    label: "Общая стоимость KZT",
  },
  {
    id: "local_expenses",
    numeric: false,
    disablePadding: false,
    label: "Локальные расходы",
  },
  {
    id: "stock_statuses",
    numeric: false,
    disablePadding: false,
    label: "Статус",
    width: 200,
  },
];
