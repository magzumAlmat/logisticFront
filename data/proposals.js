import { formatDate } from "@/helpers/formatDate";
import { formatMoney } from "@/helpers/formatMoney";
import { formatNumber } from "@/helpers/formatNumber";

export const formatRows = (
  rows,
  groupBy = "all",
  filter = "withoutWarehouse"
) => {
  let copied = [...rows];

  let filtered = copied.filter((row) => {
    if (filter === "withoutWarehouse") {
      return row.warehouse_statuses.length === 0;
    } else if (filter === "archived") {
      return row.warehouse_statuses.length > 0;
    } else {
      return (
        row.warehouse_statuses[row.warehouse_statuses.length - 1]?.warehouse
          .warehouse_name === filter
      );
    }
  });

  if (groupBy === "В работе") {
    filtered = filtered.filter((row) => row.proposal_status === "В работе");
  }

  if (groupBy === "Согласован") {
    filtered = filtered.filter((row) => row.proposal_status === "Согласован");
  }

  if (groupBy === "Внимание") {
    filtered = filtered.filter((row) => row.proposal_status === "Внимание");
  }

  return filtered.map((row) => {
    const client = row.client
      ? {
          client_name: row.client.company_name || "",
          client_address: row.client.address || "",
          client_contacts: `${row.client.phone} ${row.client.email}` || "",
        }
      : {};

    const company = row.company
      ? {
          company_name: row.company.company_name || "",
          company_bin: row.company.company_bin || "",
          company_address: row.company.address || "",
          company_contacts: `${row.company.phone} ${row.company.email}` || "",
        }
      : {};

    const broker = row.broker
      ? {
          broker_name: row.broker.company_name || "",
          broker_bin: row.broker.company_bin || "",
          broker_address: row.broker.address || "",
          broker_contacts: `${row.broker.phone} ${row.broker.email}` || "",
        }
      : {};

    const managerName = row.sales_manager?.full_name || "";

    let totalExpenses = 0;

    if (row.local_expenses.length > 0) {
      const local_expensesCHY = row.local_expenses?.filter(
        (expense) => expense.currency === "CHY"
      );

      const local_expensesUSD = row?.local_expenses?.filter(
        (expense) => expense.currency === "USD"
      );

      const local_expensesKZT = row?.local_expenses?.filter(
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

      totalExpenses = `CHY ${totalLocalExpensesCHY} USD ${totalLocalExpensesUSD} KZT ${totalLocalExpensesKZT}`;
    }

    let warehouse_statuses = [];

    if (row.warehouse_statuses.length > 0) {
      warehouse_statuses = row.warehouse_statuses?.map((status, index) => {
        return `${index + 1}) ${status.warehouse.warehouse_name} ${new Date(
          status.date
        ).toLocaleDateString("ru-RU")} `;
      });
    }

    let arrival_date = null;
    if (row.arrival_date) {
      arrival_date = new Date(row.arrival_date).toLocaleDateString("ru-RU");
    }

    // Return a new object with transformed data
    return {
      ...row,
      ...client,
      ...company,
      ...broker,
      pickup_date: formatDate(row.pickup_date),
      invoice_date: formatDate(row.invoice_date),
      avr_date: formatDate(row.avr_date),
      account_number_date: formatDate(row.account_number_date),
      manager: managerName,
      local_expenses: totalExpenses,
      warehouse_statuses: warehouse_statuses,
      arrival_date: arrival_date,
      actual_weight: formatNumber(row.actual_weight),
      actual_quantity: formatNumber(row.actual_quantity),
      actual_volume: formatNumber(row.actual_volume),
      declared_quantity: formatNumber(row.declared_quantity),
      declared_weight: formatNumber(row.declared_weight),
      declared_volume: formatNumber(row.declared_volume),
      invoices_count: formatNumber(row.invoices_count),
      declared_rate_usd: formatMoney(row.declared_rate_usd),
      actual_quantity_usd: formatMoney(row.actual_quantity_usd),
      rate_kzt: formatMoney(row.rate_kzt),
      cargo_value: formatMoney(row.cargo_value),
      prepayment: formatMoney(row.prepayment),
    };
  });
};

export const formDefaultValues = {
  id: "",
  proposal_number: "",
  client_id: "",
  company_id: "",
  broker_id: "",
  location_from: "",
  location_to: "",
  cargo_name: "",
  cargo_type: "",
  cargo_value: "",
  cargo_value_currency: "",
  invoices_count: "",
  declared_quantity: "",
  declared_weight: "",
  declared_volume: "",
  actual_quantity: "",
  actual_weight: "",
  actual_volume: "",
  pickup_date: null,
  warehouse_statuses: "",
  proposal_status: "",
  declared_rate_usd: "",
  actual_rate_usd: "",
  rate_kzt: "",
  prepayment_rate: "",
  account_number: "",
  account_number_date: "",
  invoice: "",
  invoice_date: "",
  avr_number: "",
  avr_date: "",
  prepayment: "",
  payment_percent: "",
  accountant_note: "",
  description: "",
  local_expenses: [],
};

export const proposalStatusOptions = [
  {
    value: "В работе",
    label: "В работе",
  },
  {
    value: "Согласован",
    label: "Согласован",
  },
  {
    value: "Внимание",
    label: "Внимание",
  },
];

export const currencyOptions = [
  {
    value: "USD",
    label: "USD",
  },
  {
    value: "KZT",
    label: "KZT",
  },
  {
    value: "CHY",
    label: "CHY",
  },
];

export const accountantColorsOption = [
  {
    value: "black",
    label: "Черный",
  },
  {
    value: "green",
    label: "Зеленый",
  },
  {
    value: "red",
    label: "Красный",
  },
  {
    value: "blue",
    label: "Синий",
  },
];

export const headCells = [
  {
    id: "proposal_number",
    numeric: false,
    disablePadding: false,
    label: "№",
  },
  {
    id: "client_name",
    numeric: false,
    disablePadding: false,
    label: "Получатель",
  },
  {
    id: "client_address",
    numeric: false,
    disablePadding: false,
    label: "Адрес получателя",
  },
  {
    id: "client_contacts",
    numeric: false,
    disablePadding: false,
    label: "Контакты получателя",
  },
  {
    id: "company_name",
    numeric: false,
    disablePadding: false,
    label: "Отправитель",
  },
  {
    id: "company_bin",
    numeric: false,
    disablePadding: false,
    label: "БИН отправителя",
  },
  {
    id: "company_contacts",
    numeric: false,
    disablePadding: false,
    label: "Контакты отправителя",
  },
  {
    id: "broker_name",
    numeric: false,
    disablePadding: false,
    label: "Посредник",
  },
  {
    id: "broker_bin",
    numeric: false,
    disablePadding: false,
    label: "БИН посредника",
  },
  {
    id: "broker_contacts",
    numeric: false,
    disablePadding: false,
    label: "Контакты посредника",
  },
  {
    id: "location_from",
    numeric: false,
    disablePadding: false,
    label: "Откуда",
  },
  {
    id: "location_to",
    numeric: false,
    disablePadding: false,
    label: "Куда",
  },
  {
    id: "cargo_name",
    numeric: false,
    disablePadding: false,
    label: "Наименование груза",
  },
  {
    id: "cargo_type",
    numeric: false,
    disablePadding: false,
    label: "Тип груза",
  },
  {
    id: "cargo_value",
    numeric: false,
    disablePadding: false,
    label: "Стоимость груза",
  },
  {
    id: "cargo_value_currency",
    numeric: false,
    disablePadding: false,
    label: "Валюта стоимости груза",
  },
  {
    id: "invoices_count",
    numeric: false,
    disablePadding: false,
    label: "Кол-во инвойсов",
  },
  {
    id: "declared_quantity",
    numeric: false,
    disablePadding: false,
    label: "Кол-во мест, ед (заявл.)",
  },
  {
    id: "declared_weight",
    numeric: false,
    disablePadding: false,
    label: "Вес, кг (заявл.)",
  },
  {
    id: "declared_volume",
    numeric: false,
    disablePadding: false,
    label: "Объем, м3 (заявл.)",
  },
  {
    id: "actual_quantity",
    numeric: false,
    disablePadding: false,
    label: "Кол-во мест, ед (фактич.)",
  },
  {
    id: "actual_weight",
    numeric: false,
    disablePadding: false,
    label: "Вес, кг (фактич.)",
  },
  {
    id: "actual_volume",
    numeric: false,
    disablePadding: false,
    label: "Объем, м3 (фактич.)",
  },
  {
    id: "pickup_date",
    numeric: false,
    disablePadding: false,
    label: "Дата забора груза",
  },
  {
    id: "warehouse_statuses",
    numeric: false,
    disablePadding: false,
    label: "Статус груза",
  },

  {
    id: "declared_rate_usd",
    numeric: false,
    disablePadding: false,
    label: "Ставка (USD) (заявл.)",
  },
  {
    id: "actual_rate_usd",
    numeric: false,
    disablePadding: false,
    label: "Ставка (USD) (фактич.)",
  },
  {
    id: "rate_kzt",
    numeric: false,
    disablePadding: false,
    label: "Ставка (KZT)",
  },

  {
    id: "prepayment_rate",
    numeric: false,
    disablePadding: false,
    label: "Курс предоплаты",
  },
  {
    id: "local_expenses",
    numeric: false,
    disablePadding: false,
    label: "Локальные расходы",
  },
  {
    id: "account_number",
    numeric: false,
    disablePadding: false,
    label: "Счет",
  },
  {
    id: "account_number_date",
    numeric: false,
    disablePadding: false,
    label: "Дата счета",
  },
  {
    id: "invoice",
    numeric: false,
    disablePadding: false,
    label: "Счет-фактура",
  },
  {
    id: "invoice_date",
    numeric: false,
    disablePadding: false,
    label: "Дата счет-фактуры",
  },
  {
    id: "avr_number",
    numeric: false,
    disablePadding: false,
    label: "АВР",
  },
  {
    id: "avr_date",
    numeric: false,
    disablePadding: false,
    label: "Дата АВР",
  },
  {
    id: "prepayment",
    numeric: false,
    disablePadding: false,
    label: "Предоплата, USD",
  },
  {
    id: "payment_percent",
    numeric: false,
    disablePadding: false,
    label: "Процент оплаты (%)",
  },
  {
    id: "accountant_note",
    numeric: false,
    disablePadding: false,
    label: "Примечание бухгалтера",
  },
  {
    id: "proposal_status",
    numeric: false,
    disablePadding: false,
    label: "Статус заявки",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Примечание",
  },
  {
    id: "manager",
    numeric: false,
    disablePadding: false,
    label: "Менеджер",
  },
];

export const archiveCells = [
  {
    id: "loading_list_number",
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
    id: "car_registration_number",
    numeric: false,
    disablePadding: false,
    label: "Регистрационный номер машины",
  },
  ...headCells,
];

export const headCellsSpec = [
  {
    id: "proposal_number",
    numeric: false,
    disablePadding: false,
    label: "№",
  },
  {
    id: "client_name",
    numeric: false,
    disablePadding: false,
    label: "Получатель",
  },
  {
    id: "client_address",
    numeric: false,
    disablePadding: false,
    label: "Адрес получателя",
  },
  {
    id: "client_contacts",
    numeric: false,
    disablePadding: false,
    label: "Контакты получателя",
  },
  {
    id: "company_name",
    numeric: false,
    disablePadding: false,
    label: "Отправитель",
  },
  {
    id: "company_bin",
    numeric: false,
    disablePadding: false,
    label: "БИН отправителя",
  },
  {
    id: "company_contacts",
    numeric: false,
    disablePadding: false,
    label: "Контакты отправителя",
  },
  {
    id: "broker_name",
    numeric: false,
    disablePadding: false,
    label: "Посредник",
  },
  {
    id: "broker_bin",
    numeric: false,
    disablePadding: false,
    label: "БИН посредника",
  },
  {
    id: "broker_contacts",
    numeric: false,
    disablePadding: false,
    label: "Контакты посредника",
  },
  {
    id: "location_from",
    numeric: false,
    disablePadding: false,
    label: "Откуда",
  },
  {
    id: "location_to",
    numeric: false,
    disablePadding: false,
    label: "Куда",
  },
  {
    id: "cargo_name",
    numeric: false,
    disablePadding: false,
    label: "Наименование груза",
  },
  {
    id: "cargo_type",
    numeric: false,
    disablePadding: false,
    label: "Тип груза",
  },
  {
    id: "cargo_value",
    numeric: false,
    disablePadding: false,
    label: "Стоимость груза",
  },
  {
    id: "cargo_value_currency",
    numeric: false,
    disablePadding: false,
    label: "Валюта стоимости груза",
  },
  {
    id: "invoices_count",
    numeric: false,
    disablePadding: false,
    label: "Кол-во инвойсов",
  },
  {
    id: "declared_quantity",
    numeric: false,
    disablePadding: false,
    label: "Кол-во мест, ед (заявл.)",
  },
  {
    id: "declared_weight",
    numeric: false,
    disablePadding: false,
    label: "Вес, кг (заявл.)",
  },
  {
    id: "declared_dshv",
    numeric: false,
    disablePadding: false,
    label: "Размер (ДШВ) (заявл.)",
  },
  {
    id: "actual_quantity",
    numeric: false,
    disablePadding: false,
    label: "Кол-во мест, ед (фактич.)",
  },
  {
    id: "actual_weight",
    numeric: false,
    disablePadding: false,
    label: "Вес, кг (фактич.)",
  },
  {
    id: "actual_dshv",
    numeric: false,
    disablePadding: false,
    label: "Размер (ДШВ) (фактич.)",
  },
  {
    id: "pickup_date",
    numeric: false,
    disablePadding: false,
    label: "Дата забора груза",
  },
  {
    id: "warehouse_statuses",
    numeric: false,
    disablePadding: false,
    label: "Статус груза",
  },

  {
    id: "declared_rate_usd",
    numeric: false,
    disablePadding: false,
    label: "Ставка (USD) (заявл.)",
  },
  {
    id: "actual_rate_usd",
    numeric: false,
    disablePadding: false,
    label: "Ставка (USD) (фактич.)",
  },
  {
    id: "rate_kzt",
    numeric: false,
    disablePadding: false,
    label: "Ставка (KZT)",
  },

  {
    id: "prepayment_rate",
    numeric: false,
    disablePadding: false,
    label: "Курс предоплаты",
  },
  {
    id: "local_expenses",
    numeric: false,
    disablePadding: false,
    label: "Локальные расходы",
  },
  {
    id: "account_number",
    numeric: false,
    disablePadding: false,
    label: "Счет",
  },
  {
    id: "account_number_date",
    numeric: false,
    disablePadding: false,
    label: "Дата счета",
  },
  {
    id: "invoice",
    numeric: false,
    disablePadding: false,
    label: "Счет-фактура",
  },
  {
    id: "invoice_date",
    numeric: false,
    disablePadding: false,
    label: "Дата счет-фактуры",
  },
  {
    id: "avr_number",
    numeric: false,
    disablePadding: false,
    label: "АВР",
  },
  {
    id: "avr_date",
    numeric: false,
    disablePadding: false,
    label: "Дата АВР",
  },
  {
    id: "prepayment",
    numeric: false,
    disablePadding: false,
    label: "Предоплата, USD",
  },
  {
    id: "payment_percent",
    numeric: false,
    disablePadding: false,
    label: "Процент оплаты (%)",
  },
  {
    id: "accountant_note",
    numeric: false,
    disablePadding: false,
    label: "Примечание бухгалтера",
  },
  {
    id: "proposal_status",
    numeric: false,
    disablePadding: false,
    label: "Статус заявки",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Примечание",
  },
  {
    id: "manager",
    numeric: false,
    disablePadding: false,
    label: "Менеджер",
  },
];
