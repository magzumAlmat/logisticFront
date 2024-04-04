export const formatRows = (rows, groupBy = "all") => {
  if (groupBy === "all") {
    return rows.map((row) => {
      // Преобразование данных для поля "cars"
      const formattedCars = row.cars
        ?.map((car) => car.car_registration_number)
        .join(", ");
      const formattedDates = row.contract_date
        ? new Date(row.contract_date).toLocaleDateString("ru-RU")
        : null;

      // Возвращение нового объекта с преобразованными данными
      return {
        ...row,
        cars: formattedCars,
        contract_date: formattedDates,
      };
    });
  } else if (groupBy === "executors") {
    return rows
      .filter((row) => row.isExecutor)
      .map((row) => {
        // Преобразование данных для поля "cars"
        const formattedCars = row.cars
          ?.map((car) => car.car_registration_number)
          .join(", ");
        const formattedDates = row.contract_date
          ? new Date(row.contract_date).toLocaleDateString("ru-RU")
          : null;

        // Возвращение нового объекта с преобразованными данными

        return {
          ...row,
          cars: formattedCars,
          contract_date: formattedDates,
        };
      });
  } else if (groupBy === "clients") {
    return rows
      .filter((row) => !row.isExecutor)
      .map((row) => {
        // Преобразование данных для поля "cars"
        const formattedCars = row.cars
          ?.map((car) => car.car_registration_number)
          .join(", ");
        const formattedDates = row.contract_date
          ? new Date(row.contract_date).toLocaleDateString("ru-RU")
          : null;

        // Возвращение нового объекта с преобразованными данными

        return {
          ...row,
          cars: formattedCars,
          contract_date: formattedDates,
        };
      });
  }
};

export const companyFormDefaultValues = {
  company_name: "",
  address: "",
  company_bin: "",
  contact_name: "",
  contact_email: "",
  phone: "",
  email: "",
  contract: "",
  contract_date: null,
  contract_color: "",
  isExecutor: false,
  cars: [],
};

export const contractColorsOption = [
  {
    value: "green",
    label: "Зеленый",
  },
  {
    value: "red",
    label: "Красный",
  },
];

export const headCells = [
  {
    id: "company_name",
    numeric: false,
    disablePadding: false,
    label: "Название компании",
    sortable: false,
  },
  {
    id: "company_bin",
    numeric: false,
    disablePadding: false,
    label: "БИН",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Адрес",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Электронная почта",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Номер телефона",
  },
  {
    id: "contact_name",
    numeric: false,
    disablePadding: false,
    label: "Контактное лицо",
  },
  {
    id: "cars",
    numeric: false,
    disablePadding: false,
    label: "Автомашины",
  },
  {
    id: "contract",
    numeric: false,
    disablePadding: false,
    label: "Договор",
  },
  {
    id: "contract_date",
    numeric: false,
    disablePadding: false,
    label: "Договор дата",
  },
];
