import { formatDate } from "@/helpers/formatDate";
import { formatNumber } from "@/helpers/formatNumber";
import { formatMoney } from "@/helpers/formatMoney";

export const formatRows = (rows) => {
  if (!rows) return rows;
  return rows.map((row) => {
    const client = row.client
      ? {
          client_name: row.client.company_name || "",
          client_address: row.client.address || "",
          client_contacts: `${row.client.phone} ${row.client.email}` || "",
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
    const agent_knr = row.agent_knr
      ? {
          agent_knr_name: row.agent_knr.company_name || "",
          agent_knr_bin: row.agent_knr.company_bin || "",
          agent_knr_address: row.agent_knr.address || "",
          agent_knr_contacts:
            `${row.agent_knr.phone} ${row.agent_knr.email}` || "",
        }
      : {};

    return {
      ...row,
      ...client,
      ...agent_knr,
      ...broker,
      arrival_date: formatDate(row.arrival_date),
      payment_percent_rk: formatNumber(row.payment_percent_rk),
      payment_percent_knr: formatNumber(row.payment_percent_knr),
      quantity: formatNumber(row.quantity),
      weight: formatNumber(row.weight),
      volume: formatNumber(row.volume),
      rate_knr_dollars: formatMoney(row.rate_knr_dollars),
      rate_rk_dollars: formatMoney(row.rate_rk_dollars),
      price_kzt: formatMoney(row.price_kzt),
      price_knr: formatMoney(row.price_knr),
      prepayment_knr: formatMoney(row.prepayment_knr),
      prepayment_rk: formatMoney(row.prepayment_rk),
      usd_exchange_rate: formatMoney(row.usd_exchange_rate),
      insurance: row.insurance_value,
      manager: row.sales_manager.full_name,
      status: `${formatDate(row.status_date)} ${row.status_date_description}`,
    };
  });
};

export const formDefaultValues = {
  id: "",
  proposal_number: "",
  client_id: "",
  agent_knr_id: "",
  sender_id: "",
  broker_id: "",
  route: "",
  container_type: "",
  cargo_name: "",
  quantity: "",
  weight: "",
  volume: "",
  rate_knr_dollars: "",
  rate_rk_dollars: "",
  price_kzt: "",
  insurance: "",
  prepayment_knr: "",
  prepayment_rk: "",
  extra_services: "",
  arrival_date: null,
  description: "",
  usd_exchange_rate: "",
  price_knr: "",
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
  {
    value: "Завершено",
    label: "Завершено",
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
    id: "agent_knr_name",
    numeric: false,
    disablePadding: false,
    label: "Агент КНР",
  },
  {
    id: "agent_knr_address",
    numeric: false,
    disablePadding: false,
    label: "Адрес агента КНР",
  },
  {
    id: "agent_knr_contacts",
    numeric: false,
    disablePadding: false,
    label: "Контакты агента КНР",
  },
  {
    id: "broker_name",
    numeric: false,
    disablePadding: false,
    label: "Посредник",
  },
  {
    id: "broker_address",
    numeric: false,
    disablePadding: false,
    label: "Адрес посредника",
  },
  {
    id: "broker_contacts",
    numeric: false,
    disablePadding: false,
    label: "Контакты посредника",
  },
  {
    id: "sender",
    numeric: false,
    disablePadding: false,
    label: "Отправитель",
  },

  {
    id: "container_number",
    numeric: false,
    disablePadding: false,
    label: "Номер контейнера",
  },
  {
    id: "route",
    numeric: false,
    disablePadding: false,
    label: "Маршрут",
  },
  {
    id: "container_type",
    numeric: false,
    disablePadding: false,
    label: "Вид контейнера",
  },
  {
    id: "cargo_name",
    numeric: false,
    disablePadding: false,
    label: "Наименование груза",
  },
  {
    id: "quantity",
    numeric: false,
    disablePadding: false,
    label: "Кол-во мест, ед",
  },
  {
    id: "weight",
    numeric: false,
    disablePadding: false,
    label: "Вес, кг",
  },
  {
    id: "volume",
    numeric: false,
    disablePadding: false,
    label: "Объём, м3",
  },
  {
    id: "rate_knr_dollars",
    numeric: false,
    disablePadding: false,
    label: "Ставка цена КНР, $",
  },
  {
    id: "rate_rk_dollars",
    numeric: false,
    disablePadding: false,
    label: "Ставка цена РК, $",
  },
  {
    id: "price_kzt",
    numeric: false,
    disablePadding: false,
    label: "Ставка KZT",
  },
  {
    id: "insurance",
    numeric: false,
    disablePadding: false,
    label: "Страхование",
  },
  {
    id: "prepayment_knr",
    numeric: false,
    disablePadding: false,
    label: "Предоплата КНР",
  },
  {
    id: "prepayment_rk",
    numeric: false,
    disablePadding: false,
    label: "Предоплата РК",
  },
  {
    id: "payment_percent_knr",
    numeric: false,
    disablePadding: false,
    label: "Статус оплаты КНР, %",
  },
  {
    id: "payment_percent_rk",
    numeric: false,
    disablePadding: false,
    label: "Статус оплаты РК, %",
  },
  {
    id: "extra_services",
    numeric: false,
    disablePadding: false,
    label: "Доп. услуги",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Статус",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Примечание",
  },
  {
    id: "usd_exchange_rate",
    numeric: false,
    disablePadding: false,
    label: "Курс доллара",
  },
  // {
  //   id: "price_knr",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Ставка КНР",
  // },
  {
    id: "account_number",
    numeric: false,
    disablePadding: false,
    label: "№ Счета",
  },
  {
    id: "manager",
    numeric: false,
    disablePadding: false,
    label: "Менеджер",
  },
];
