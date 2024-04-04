"use client";

import Button from "@/shared/button/button";
import {
  Alert,
  Autocomplete,
  Checkbox,
  Fab,
  FormControlLabel,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DatePicker from "@/shared/datePicker/datePicker";
import SelectLabels from "@/shared/select/select";
import {
  accountantColorsOption,
  currencyOptions,
  formDefaultValues,
  proposalStatusOptions,
} from "@/data/proposals";
import { Plus, Trash2 } from "lucide-react";
import { useGetCompanyLabelsQuery } from "@/services/companiesService";
import {
  useDeleteExpenseMutation,
  useGetAllProposalsQuery,
  useGetProposalQuery,
} from "@/services/proposalsService";
import Heading from "@/shared/heading/heading";
import { useSelector } from "react-redux";
import { selectUser } from "@/slice/authSlice";

function FormCompany({
  proposal = formDefaultValues,
  onSubmit,
  isLoading,
  error,
  isSuccess,
  successMessage,
  buttonTitle,
  newProposal = false,
}) {
  const [form, setForm] = useState(proposal);
  const { refetch: refetchProposals } = useGetAllProposalsQuery();
  const { refetch: refetchProposal } = useGetProposalQuery(form.id);
  const { data: labels } = useGetCompanyLabelsQuery();
  const [deleteExpense] = useDeleteExpenseMutation();

  const { role } = useSelector(selectUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await onSubmit(form);
    if (result?.data?.status === "success") {
      if (newProposal) {
        setForm(formDefaultValues);
      }

      setTimeout(() => {
        refetchProposals();
        refetchProposal(form.id);
      }, 200);
    }
  };

  const handleNewLocalExpense = () => {
    setForm((prevForm) => ({
      ...prevForm,
      local_expenses: [
        ...prevForm.local_expenses,
        {
          unique: Math.random().toString(36).substr(2, 9),
          currency: "USD",
          price: 0,
          description: "",
        },
      ],
    }));
  };

  const handleDeleteLocalExpense = (expense, index) => {
    const updatedForm = {
      ...form,
      local_expenses: form.local_expenses.filter((_, i) => i !== index),
    };
    setForm(updatedForm);
  };

  const handleLocalExpPriceChange = (event, index) => {
    const updatedForm = {
      ...form,
      local_expenses: form.local_expenses.map((expense, i) => {
        if (i === index) {
          return { ...expense, price: event.target.value };
        }
        return expense;
      }),
    };
    setForm(updatedForm);
  };

  const handleLocalExpDescriptionChange = (event, index) => {
    const updatedForm = {
      ...form,
      local_expenses: form.local_expenses.map((expense, i) => {
        if (i === index) {
          return { ...expense, description: event.target.value };
        }
        return expense;
      }),
    };
    setForm(updatedForm);
  };

  const handleLocalExpCurrencyChange = (event, index) => {
    const updatedForm = {
      ...form,
      local_expenses: form.local_expenses.map((expense, i) => {
        if (i === index) {
          return { ...expense, currency: event.target.value };
        }
        return expense;
      }),
    };
    setForm(updatedForm);
  };

  useEffect(() => {
    if (proposal) {
      setForm((prevForm) => ({
        ...prevForm,
        ...proposal,
      }));
    }
  }, [proposal]);

  return (
    <form className="mt-5 form" onSubmit={handleSubmit}>
      {(role === "manager" || role === "admin") && (
        <>
          <Heading text="Основная информация" level={4} />
          <TextField
            required
            error={false}
            id="outlined-error-helper-text"
            label="№ внутренний"
            value={form?.proposal_number || ""}
            helperText={false}
            onChange={(e) =>
              setForm({ ...form, proposal_number: e.target.value })
            }
          />
          {labels ? (
            <>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={labels}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField required {...params} label="Получатель" />
                )}
                value={
                  labels.find((option) => option.id === form?.client_id) || null
                }
                onChange={(e, newValue) =>
                  setForm({ ...form, client_id: newValue?.id || null })
                }
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={labels}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Отправитель" />
                )}
                value={
                  labels.find((option) => option.id === form?.company_id) ||
                  null
                }
                onChange={(e, newValue) =>
                  setForm({ ...form, company_id: newValue?.id || null })
                }
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={labels}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Посредник" />
                )}
                value={
                  labels.find((option) => option.id === form?.broker_id) || null
                }
                onChange={(e, newValue) =>
                  setForm({ ...form, broker_id: newValue?.id || null })
                }
              />
            </>
          ) : (
            <Alert severity="error">Не найдены компании для выбора</Alert>
          )}

          <Heading text="Данные по грузу" level={4} />

          <TextField
            required
            error={false}
            id="outlined-error-helper-text"
            label="Откуда"
            value={form?.location_from || ""}
            helperText={false}
            onChange={(e) =>
              setForm({ ...form, location_from: e.target.value })
            }
          />
          <TextField
            required
            error={false}
            id="outlined-error-helper-text"
            label="Куда"
            value={form?.location_to || ""}
            helperText={false}
            onChange={(e) => setForm({ ...form, location_to: e.target.value })}
          />
          <TextField
            required
            label="Наименование груза"
            id="outlined-size-normal"
            value={form?.cargo_name || ""}
            onChange={(e) => setForm({ ...form, cargo_name: e.target.value })}
          />

          <TextField
            label="Тип груза"
            id="outlined-size-normal"
            value={form?.cargo_type || ""}
            onChange={(e) => setForm({ ...form, cargo_type: e.target.value })}
          />
          <div className="flexAlignEnd">
            <TextField
              label="Стоимость груза"
              id="outlined-size-normal"
              value={form?.cargo_value || ""}
              onChange={(e) =>
                setForm({ ...form, cargo_value: e.target.value })
              }
            />

            <SelectLabels
              options={currencyOptions}
              onChange={(e) =>
                setForm({ ...form, cargo_value_currency: e.target.value })
              }
              value={form?.cargo_value_currency || ""}
              label="Валюта стоимости груза"
            />
          </div>

          <DatePicker
            onChange={(date) => setForm({ ...form, pickup_date: date })}
            value={form?.pickup_date || null}
            label="Дата забора груза"
          />
          <Heading text="Заявленные характеристики" level={5} />
          <TextField
            required
            label="Количество мест, ед (заявл.)"
            id="outlined-size-normal"
            value={form?.declared_quantity || ""}
            onChange={(e) =>
              setForm({ ...form, declared_quantity: e.target.value })
            }
          />

          <TextField
            required
            label="Вес, кг (заявл.)"
            id="outlined-size-normal"
            value={form?.declared_weight || ""}
            onChange={(e) =>
              setForm({ ...form, declared_weight: e.target.value })
            }
          />

          <TextField
            required
            label="Объем, м3 (заявл.)"
            id="outlined-size-normal"
            value={form?.declared_volume || ""}
            onChange={(e) =>
              setForm({ ...form, declared_volume: e.target.value })
            }
          />
          {(!newProposal && role === "admin") ||
          (!newProposal && role === "manager") ? (
            <>
              <Heading text="Фактические характеристики" level={5} />

              <TextField
                label="Количество мест, ед (фактич.)"
                id="outlined-size-normal"
                value={form?.actual_quantity || ""}
                onChange={(e) =>
                  setForm({ ...form, actual_quantity: e.target.value })
                }
              />

              <TextField
                label="Вес, кг (фактич.)"
                id="outlined-size-normal"
                value={form?.actual_weight || ""}
                onChange={(e) =>
                  setForm({ ...form, actual_weight: e.target.value })
                }
              />

              <TextField
                label="Объем, м3 (фактич.)"
                id="outlined-size-normal"
                value={form?.actual_volume || ""}
                onChange={(e) =>
                  setForm({ ...form, actual_volume: e.target.value })
                }
              />
            </>
          ) : null}

          <Heading text="Финансовые детали" level={4} />

          <Heading text="Заявленная ставка" level={5} />
          <TextField
            required
            label="Ставка (USD) (заявл.)"
            id="outlined-size-normal"
            value={form?.declared_rate_usd || ""}
            onChange={(e) =>
              setForm({ ...form, declared_rate_usd: e.target.value })
            }
          />
          {(!newProposal && role === "admin") ||
          (!newProposal && role === "manager") ? (
            <>
              <Heading text="Фактическая ставка" level={5} />
              <TextField
                label="Ставка (USD) (фактич.)"
                id="outlined-size-normal"
                value={form?.actual_rate_usd || ""}
                onChange={(e) =>
                  setForm({ ...form, actual_rate_usd: e.target.value })
                }
              />
            </>
          ) : null}

          <TextField
            label="Предоплата (USD)"
            id="outlined-size-normal"
            value={form?.prepayment || ""}
            onChange={(e) => setForm({ ...form, prepayment: e.target.value })}
          />

          <TextField
            label="Курс предоплаты"
            id="outlined-size-normal"
            value={form?.prepayment_rate || ""}
            onChange={(e) =>
              setForm({ ...form, prepayment_rate: e.target.value })
            }
          />

          <TextField
            label="Количество инвойсов"
            id="outlined-size-normal"
            value={form?.invoices_count || ""}
            onChange={(e) =>
              setForm({ ...form, invoices_count: e.target.value })
            }
          />

          <Heading text="Прочее" level={4} />

          <TextField
            label="Примечание к заявке"
            id="outlined-size-normal"
            value={form?.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {(!newProposal && role === "admin") ||
          (!newProposal && role === "manager") ? (
            <SelectLabels
              options={proposalStatusOptions}
              label="Статус заявки"
              onChange={(e) =>
                setForm({ ...form, proposal_status: e.target.value })
              }
              value={form?.proposal_status || ""}
            />
          ) : null}
        </>
      )}

      {((!newProposal && role === "admin") ||
        (!newProposal && role === "accountant")) && (
        <>
          <Heading text="Бух. данные" level={4} />
          <div className="flexAlignCenter">
            <TextField
              label="Счет"
              id="outlined-size-normal"
              value={form?.account_number || ""}
              onChange={(e) =>
                setForm({ ...form, account_number: e.target.value })
              }
            />
            <DatePicker
              onChange={(date) =>
                setForm({ ...form, account_number_date: date })
              }
              value={form?.account_number_date || null}
              label="Дата счета"
            />
          </div>
          <div className="flexAlignCenter">
            <TextField
              label="Счет-фактура"
              id="outlined-size-normal"
              value={form?.invoice || ""}
              onChange={(e) => setForm({ ...form, invoice: e.target.value })}
            />
            <DatePicker
              onChange={(date) => setForm({ ...form, invoice_date: date })}
              value={form?.invoice_date || null}
              label="Дата счет-фактуры"
            />
          </div>
          <div className="flexAlignCenter">
            <TextField
              label="АВР"
              id="outlined-size-normal"
              value={form?.avr_number || ""}
              onChange={(e) => setForm({ ...form, avr_number: e.target.value })}
            />
            <DatePicker
              onChange={(date) => setForm({ ...form, avr_date: date })}
              value={form?.avr_date || null}
              label="Дата АВР"
            />
          </div>

          <Button type="outline" onClick={handleNewLocalExpense}>
            Добавить локальный расход
          </Button>

          {form?.local_expenses?.length > 0 ? (
            <>
              {form?.local_expenses.map((expense, index) => (
                <div
                  key={expense.id || expense.unique}
                  className="flexAlignCenter"
                >
                  <TextField
                    label="Цена"
                    id="outlined-size-normal"
                    value={expense?.price || ""}
                    onChange={(e) => handleLocalExpPriceChange(e, index)}
                  />
                  <SelectLabels
                    options={currencyOptions}
                    label="Валюта"
                    value={expense?.currency || ""}
                    onChange={(e) => handleLocalExpCurrencyChange(e, index)}
                  />
                  <TextField
                    label="Описание"
                    id="outlined-size-normal"
                    value={expense?.description || ""}
                    onChange={(e) => handleLocalExpDescriptionChange(e, index)}
                  />
                  <IconButton
                    onClick={() => handleDeleteLocalExpense(expense, index)}
                  >
                    <Trash2 />
                  </IconButton>
                </div>
              ))}
            </>
          ) : (
            <p>Нет локальных расходов</p>
          )}

          <TextField
            label="Примечание бухгалтера"
            id="outlined-size-normal"
            value={form?.accountant_note || ""}
            onChange={(e) =>
              setForm({ ...form, accountant_note: e.target.value })
            }
          />
          <SelectLabels
            options={accountantColorsOption}
            label="Цвет примечания"
            value={form?.accountant_note_color || ""}
            onChange={(e) =>
              setForm({ ...form, accountant_note_color: e.target.value })
            }
          />
        </>
      )}

      {isSuccess && <Alert severity="success">{successMessage}</Alert>}
      {error && <Alert severity="error">{error.data.error}</Alert>}
      <Button className="w-full" type="submit">
        {isLoading ? "Загрузка..." : buttonTitle}
      </Button>
    </form>
  );
}

export default FormCompany;
