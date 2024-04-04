"use client";

import Button from "@/shared/button/button";
import {
  Alert,
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
  companyFormDefaultValues,
  contractColorsOption,
} from "@/data/companies";
import { Plus, Trash2 } from "lucide-react";
import {
  useDeleteCompanyCarMutation,
  useGetAllCompaniesQuery,
} from "@/services/companiesService";
import { useGetCompanyQuery } from "../../../services/companiesService";

function FormCompany({
  company = companyFormDefaultValues,
  onSubmit,
  isLoading,
  error,
  isSuccess,
  successMessage,
  buttonTitle,
  newForm = false,
}) {
  const [form, setForm] = useState(company);
  const [deleteCompanyCar] = useDeleteCompanyCarMutation();

  const { refetch: refetchCompanies } = useGetAllCompaniesQuery("");
  const { refetch: refetchCompany } = useGetCompanyQuery(form.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await onSubmit(form);

    if (result?.data?.status === "success") {
      if (newForm) {
        setForm(companyFormDefaultValues);
      }

      setTimeout(() => {
        refetchCompanies();
        refetchCompany();
      }, 200);
    }
  };

  const handleExecutorCheck = () => {
    setForm((prevForm) => {
      const toggled = !prevForm.isExecutor;

      const updatedForm = {
        ...prevForm,
        isExecutor: toggled,
        // Create a new car only when toggling to true
        cars: toggled
          ? [
              {
                unique: Math.random().toString(36).substr(2, 9),
                car_registration_number: "",
              },
            ]
          : prevForm.cars,
      };

      return updatedForm;
    });
  };

  const removeCar = async (car, index) => {
    // Создаем копию формы с удаленной машиной
    const updatedForm = { ...form };
    updatedForm.cars = form.cars.filter((_, i) => i !== index);

    // Обновляем форму
    setForm(updatedForm);

    // Происходит запрос на удаление машины
    if (car.id) {
      try {
        await deleteCompanyCar({ id: car.id });
        refetchCompany();
      } catch (error) {
        // Обработка ошибок удаления
        console.error("Error deleting car:", error);
      }
    }
  };

  const addCar = () => {
    setForm((prevForm) => {
      const newCars = [
        ...prevForm.cars,
        {
          unique: Math.random().toString(36).substr(2, 9),
          car_registration_number: "",
        },
      ];
      return { ...prevForm, cars: newCars };
    });
  };

  return (
    <form className="mt-5 form" onSubmit={handleSubmit}>
      <TextField
        required
        error={false}
        id="outlined-error-helper-text"
        label="Название компании"
        defaultValue={form?.company_name}
        helperText={false}
        onChange={(e) => setForm({ ...form, company_name: e.target.value })}
      />

      <TextField
        error={
          form?.company_bin?.length !== 0 && form?.company_bin?.length !== 12
        }
        helperText={
          form?.company_bin?.length !== 0 && form?.company_bin?.length !== 12
            ? "БИН должен состоять из 12 цифр"
            : ""
        }
        id="outlined-error-helper-text"
        label="БИН компании"
        defaultValue={form?.company_bin}
        onChange={(e) => setForm({ ...form, company_bin: e.target.value })}
      />

      <TextField
        required
        error={false}
        id="outlined-error-helper-text"
        label="Адрес компании"
        defaultValue={form?.address}
        helperText={false}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <TextField
        error={false}
        id="outlined-error-helper-text"
        label="Контакное лицо"
        defaultValue={form?.contact_name}
        helperText={false}
        onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
      />

      <TextField
        error={false}
        id="outlined-error-helper-text"
        label="Электронная почта"
        defaultValue={form?.email}
        helperText={false}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <TextField
        label="Телефон"
        id="outlined-size-normal"
        defaultValue={form?.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <div className="flexAlignCenter">
        <TextField
          error={false}
          id="outlined-size-normal"
          label="Договор"
          defaultValue={form?.contract}
          helperText={false}
          onChange={(e) => setForm({ ...form, contract: e.target.value })}
        />

        <DatePicker
          onChange={(date) => setForm({ ...form, contract_date: date })}
          value={form?.contract_date}
          label="Дата договора"
        />
      </div>

      <SelectLabels
        options={contractColorsOption}
        value={form?.contract_color}
        onChange={(e) => setForm({ ...form, contract_color: e.target.value })}
        label="Цвет договора"
        helperText="Цвет отобразится в таблице"
      />

      <FormControlLabel
        control={
          <Checkbox checked={form?.isExecutor} onChange={handleExecutorCheck} />
        }
        label="Исполнитель"
      />

      {form?.isExecutor &&
        form?.cars?.map((car, index) => (
          <div key={car.id || car.unique} className="flexAlignCenter">
            <TextField
              disabled={car.id ? true : false}
              sx={{ width: "100%" }}
              label={`Автомобиль ${index + 1}`}
              defaultValue={car.car_registration_number}
              onChange={(e) => {
                setForm((prevForm) => {
                  const newCars = [...prevForm.cars];
                  newCars[index] = {
                    ...newCars[index],
                    car_registration_number: e.target.value,
                  };
                  return { ...prevForm, cars: newCars };
                });
              }}
            />
            <Tooltip title="Удалить автомобиль">
              <IconButton onClick={() => removeCar(car, index)}>
                <Trash2 />
              </IconButton>
            </Tooltip>
            {index + 1 === form?.cars.length && (
              <Tooltip title="Добавить автомобиль">
                <IconButton color="primary" onClick={() => addCar()}>
                  <Plus />
                </IconButton>
              </Tooltip>
            )}
          </div>
        ))}

      {isSuccess && <Alert severity="success">{successMessage}</Alert>}
      {error && <Alert severity="error">{error.data.error}</Alert>}

      <Button className="w-full" type="submit">
        {isLoading ? "Загрузка..." : buttonTitle}
      </Button>
    </form>
  );
}

export default FormCompany;
