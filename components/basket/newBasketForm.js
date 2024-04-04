"use client";

import Heading from "@/shared/heading/heading";
import SelectLabels from "@/shared/select/select";
import { Alert, Autocomplete, IconButton, TextField } from "@mui/material";
import DatePicker from "@/shared/datePicker/datePicker";
import { useEffect, useState } from "react";
import Button from "@/shared/button/button";
import { Car, Plus, PlusSquare, Trash2, Wallet2 } from "lucide-react";
import {
  useCreateBasketMutation,
  useDeleteBasketCarMutation,
  useEditBasketMutation,
  useGetBasketQuery,
  useGetCompanyCarLabelsQuery,
} from "@/services/basketService";
import { currencyOptions } from "@/data/proposals";
import { kppLabels, statusLabels } from "@/data/basket";
import { useSelector } from "react-redux";
import { selectUser } from "@/slice/authSlice";

function BasketForm({
  selectedIds,
  edit = false,
  basket = {
    warehouse_id: "",
    arrival_date: null,
    kpp: "",
    cars: [
      {
        unique: Math.random().toString(36).substr(2, 9),
        company_car: "",
        currency: "",
        frakht: "",
      },
    ],
  },
}) {
  const [form, setForm] = useState(basket);
  const [options, setOptions] = useState([]);

  const { refetch } = useGetBasketQuery();

  const { data } = useGetCompanyCarLabelsQuery();
  const [createBasket, { isSuccess, error, isLoading }] =
    useCreateBasketMutation();
  const [deleteBasketCar] = useDeleteBasketCarMutation();
  const [editBasket, { isSuccess: editSuccess, error: editError }] =
    useEditBasketMutation();

  const { role } = useSelector(selectUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      proposal_ids: selectedIds,
      ...form,
    };

    if (edit) {
      await editBasket(data);
      refetch();
    } else {
      await createBasket(data);
    }
  };

  const handleAddCar = () => {
    setForm({
      ...form,
      cars: [
        ...form.cars,
        {
          unique: Math.random().toString(36).substr(2, 9),
          company_car: "",
          frakht_currency: "",
          frakht: "",
        },
      ],
    });
  };

  const handleDeleteCar = async (car, index) => {
    setForm({
      ...form,
      cars: form.cars.filter((_, i) => i !== index),
    });
    if (car.id) {
      await deleteBasketCar(car.id);
      refetch();
    }
  };

  const handleAddStatus = () => {
    setForm({
      ...form,
      stock_statuses: [
        ...form.stock_statuses,
        {
          unique: Math.random().toString(36).substr(2, 9),
          stage: "",
          description: "",
          date: null,
        },
      ],
    });
  };

  const handleDeleteStatus = (status, index) => {
    setForm({
      ...form,
      stock_statuses: form.stock_statuses.filter((_, i) => i !== index),
    });
  };

  const handleAddExpense = () => {
    setForm({
      ...form,
      local_expenses: [
        ...form.local_expenses,
        {
          unique: Math.random().toString(36).substr(2, 9),
          description: "",
          price: "",
          currency: "",
        },
      ],
    });
  };

  const handleDeleteExpense = (expense, index) => {
    setForm({
      ...form,
      local_expenses: form.local_expenses.filter((_, i) => i !== index),
    });
  };

  useEffect(() => {
    if (basket.id) {
      setForm(basket);
    }
  }, [basket]);

  return (
    <form className="form mt-5" onSubmit={handleSubmit}>
      <Heading
        text={`Редактировать загрузочный лист`}
        level={2}
        className="mb-3"
      />
      {role === "admin" || role === "manager" ? (
        <>
          <TextField
            required
            id="outlined-required"
            label="Номер загрузочного листа"
            value={form.internal_order_number}
            onChange={(e) =>
              setForm({ ...form, internal_order_number: e.target.value })
            }
          />

          {data?.labels?.length > 0 &&
            form.cars?.map((item, index) => (
              <div className="flexAlignCenter" key={item.id || item.unique}>
                <Autocomplete
                  disabled={item.id ? true : false}
                  disablePortal
                  id="combo-box-demo"
                  options={data.labels}
                  getOptionLabel={(option) => option.label}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField required {...params} label="Автомашина" />
                  )}
                  value={data.labels.find(
                    (option) => option.id === form.cars[index].company_car
                  )}
                  onChange={(e, newValue) =>
                    setForm({
                      ...form,
                      cars: form.cars.map((car, i) =>
                        i === index
                          ? { ...car, company_car: newValue?.id || null }
                          : car
                      ),
                    })
                  }
                />
                <TextField
                  required
                  disabled={item.id ? true : false}
                  id="outlined-required"
                  label="Фрахт"
                  value={form.cars[index].frakht}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      cars: form.cars.map((car, i) =>
                        i === index ? { ...car, frakht: e.target.value } : car
                      ),
                    })
                  }
                />
                <SelectLabels
                  required={true}
                  disabled={item.id ? true : false}
                  options={currencyOptions}
                  label="Валюта"
                  value={form.cars[index].frakht_currency || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      cars: form.cars.map((car, i) =>
                        i === index
                          ? { ...car, frakht_currency: e.target.value }
                          : car
                      ),
                    })
                  }
                />
                <IconButton onClick={() => handleDeleteCar(item, index)}>
                  <Trash2 />
                </IconButton>
              </div>
            ))}

          <Button type="outline" icon={<Car />} onClick={handleAddCar}>
            Добавить номер автомашины
          </Button>

          <SelectLabels
            options={kppLabels}
            label="КПП"
            value={form.kpp || ""}
            onChange={(e) => setForm({ ...form, kpp: e.target.value })}
          />

          {edit && (
            <>
              <TextField
                id="outlined-required"
                label="Курс USD"
                value={form.usd_exchange_rate || ""}
                onChange={(e) =>
                  setForm({ ...form, usd_exchange_rate: e.target.value })
                }
              />
              <DatePicker
                label="Дата прибытия"
                value={form.arrival_date || null}
                onChange={(date) => setForm({ ...form, arrival_date: date })}
              />
              <Heading text="Статусы" level={4} />
              <Button type="outline" icon={<Plus />} onClick={handleAddStatus}>
                Добавить статус
              </Button>
              {form.stock_statuses?.map((item, index) => (
                <div className="flexAlignCenter" key={item.id || item.unique}>
                  <SelectLabels
                    options={statusLabels}
                    label="Статус"
                    value={form.stock_statuses[index].stage || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        stock_statuses: form.stock_statuses.map((status, i) =>
                          i === index
                            ? { ...status, stage: e.target.value }
                            : status
                        ),
                      })
                    }
                  />
                  <DatePicker
                    label="Дата"
                    value={form.stock_statuses[index].date || null}
                    onChange={(date) =>
                      setForm({
                        ...form,
                        stock_statuses: form.stock_statuses.map((status, i) =>
                          i === index ? { ...status, date: date } : status
                        ),
                      })
                    }
                  />
                  <TextField
                    id="outlined-required"
                    label="Примечание"
                    value={form.stock_statuses[index].description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        stock_statuses: form.stock_statuses.map((status, i) =>
                          i === index
                            ? { ...status, description: e.target.value }
                            : status
                        ),
                      })
                    }
                  />
                  <IconButton onClick={() => handleDeleteStatus(item, index)}>
                    <Trash2 />
                  </IconButton>
                </div>
              ))}
            </>
          )}
        </>
      ) : null}

      {(edit && role === "admin") || (edit && role === "accountant") ? (
        <>
          <Heading text="Локальные расходы" level={4} />
          <Button type="outline" icon={<Wallet2 />} onClick={handleAddExpense}>
            Добавить локальный расход
          </Button>
          {form.local_expenses?.map((item, index) => (
            <div className="flexAlignCenter" key={item.id || item.unique}>
              <SelectLabels
                options={currencyOptions}
                label="Валюта"
                value={form.local_expenses[index].currency}
                onChange={(e) => {
                  setForm({
                    ...form,
                    local_expenses: form.local_expenses.map((expense, i) =>
                      i === index
                        ? { ...expense, currency: e.target.value }
                        : expense
                    ),
                  });
                }}
              />
              <TextField
                id="outlined-required"
                label="Цена"
                value={form.local_expenses[index].price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    local_expenses: form.local_expenses.map((expense, i) =>
                      i === index
                        ? { ...expense, price: e.target.value }
                        : expense
                    ),
                  })
                }
              />
              <TextField
                id="outlined-required"
                label="Описание"
                value={form.local_expenses[index].description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    local_expenses: form.local_expenses.map((expense, i) =>
                      i === index
                        ? { ...expense, description: e.target.value }
                        : expense
                    ),
                  })
                }
              />
              <IconButton onClick={() => handleDeleteExpense(item, index)}>
                <Trash2 />
              </IconButton>
            </div>
          ))}
        </>
      ) : null}

      {editSuccess && <Alert severity="success">Заявка изменена</Alert>}

      {editError && <Alert severity="error">{editError?.data?.message}</Alert>}

      {isSuccess && <Alert severity="success">Загрузочный лист создан</Alert>}
      {error && <Alert severity="error">{error?.data?.message}</Alert>}
      <Button type="submit">
        {isLoading ? "Загрузка..." : edit ? "Сохранить" : "Создать"}
      </Button>
    </form>
  );
}

export default BasketForm;
