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
  formDefaultValues,
  proposalStatusOptions,
} from "@/data/railwayProposals";
import { Plus, Trash2 } from "lucide-react";
import { useGetCompanyLabelsQuery } from "@/services/companiesService";
import {
  useGetAllRailwayProposalsQuery,
  useGetRailwayProposalQuery,
} from "@/services/railwayProposalsService";
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
  const { refetch: refetchProposals } = useGetAllRailwayProposalsQuery();
  const { refetch: refetchProposal } = useGetRailwayProposalQuery(form.id);
  const { data: labels } = useGetCompanyLabelsQuery();

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
                <TextField {...params} label="Агент КНР" />
              )}
              value={
                labels.find((option) => option.id === form?.agent_knr_id) ||
                null
              }
              onChange={(e, newValue) =>
                setForm({ ...form, agent_knr_id: newValue?.id || null })
              }
            />
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
            <TextField
              required
              error={false}
              id="outlined-error-helper-text"
              label="Отправитель"
              value={form?.sender || ""}
              helperText={false}
              onChange={(e) => setForm({ ...form, sender: e.target.value })}
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
          label="Маршрут"
          value={form?.route || ""}
          helperText={false}
          onChange={(e) => setForm({ ...form, route: e.target.value })}
        />
        <TextField
          required
          label="Наименование груза"
          id="outlined-size-normal"
          value={form?.cargo_name || ""}
          onChange={(e) => setForm({ ...form, cargo_name: e.target.value })}
        />
        <TextField
          label="Номер контейнера"
          id="outlined-size-normal"
          value={form?.container_number || ""}
          onChange={(e) =>
            setForm({ ...form, container_number: e.target.value })
          }
        />
        <TextField
          label="Тип контейнера"
          id="outlined-size-normal"
          value={form?.container_type || ""}
          onChange={(e) => setForm({ ...form, container_type: e.target.value })}
        />

        <div className="flexAlignCenter">
          <DatePicker
            onChange={(date) => setForm({ ...form, status_date: date })}
            value={form?.status_date || null}
            label="Статус"
          />
          <TextField
            label="Описание к статусу"
            id="outlined-size-normal"
            value={form?.status_date_description || ""}
            onChange={(e) =>
              setForm({ ...form, status_date_description: e.target.value })
            }
          />
        </div>

        <TextField
          required
          label="Количество мест, ед"
          id="outlined-size-normal"
          value={form?.quantity || ""}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <TextField
          required
          label="Вес, кг"
          id="outlined-size-normal"
          value={form?.weight || ""}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
        />
        <TextField
          label="Объем, м3"
          id="outlined-size-normal"
          value={form?.volume || ""}
          onChange={(e) => setForm({ ...form, volume: e.target.value })}
        />

        <Heading text="Финансовые детали" level={4} />

        <TextField
          required
          label="Ставка цена КНР"
          id="outlined-size-normal"
          value={form?.rate_knr_dollars || ""}
          onChange={(e) =>
            setForm({ ...form, rate_knr_dollars: e.target.value })
          }
        />

        <TextField
          required
          label="Ставка цена РК"
          id="outlined-size-normal"
          value={form?.rate_rk_dollars || ""}
          onChange={(e) =>
            setForm({ ...form, rate_rk_dollars: e.target.value })
          }
        />

        <TextField
          label="Предоплата КНР"
          id="outlined-size-normal"
          value={form?.prepayment_knr || ""}
          onChange={(e) => setForm({ ...form, prepayment_knr: e.target.value })}
        />
        <TextField
          label="Предоплата РК"
          id="outlined-size-normal"
          value={form?.prepayment_rk || ""}
          onChange={(e) => setForm({ ...form, prepayment_rk: e.target.value })}
        />

        <TextField
          label="Курс доллара"
          id="outlined-size-normal"
          value={form?.usd_exchange_rate || ""}
          onChange={(e) =>
            setForm({ ...form, usd_exchange_rate: e.target.value })
          }
        />

        <TextField
          label="Доп. услуги"
          id="outlined-size-normal"
          value={form?.extra_services || ""}
          onChange={(e) => setForm({ ...form, extra_services: e.target.value })}
        />

        <Heading text="Прочее" level={4} />
        <TextField
          label="Примечание к заявке"
          id="outlined-size-normal"
          value={form?.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <TextField
          label="№ Счета"
          id="outlined-size-normal"
          value={form?.account_number || ""}
          onChange={(e) => setForm({ ...form, account_number: e.target.value })}
        />
        <SelectLabels
          options={proposalStatusOptions}
          label="Статус заявки"
          onChange={(e) =>
            setForm({ ...form, proposal_status: e.target.value })
          }
          value={form?.proposal_status || ""}
        />
        <FormControlLabel
          control={
            <Checkbox
              id="outlined-size-normal"
              checked={form?.insurance}
              onChange={(e) =>
                setForm({ ...form, insurance: e.target.checked })
              }
            />
          }
          label="Страховка"
        />

        {form?.insurance && (
          <TextField
            label="Страховка"
            id="outlined-size-normal"
            value={form?.insurance_value || ""}
            onChange={(e) =>
              setForm({ ...form, insurance_value: e.target.value })
            }
          />
        )}
      </>

      {isSuccess && <Alert severity="success">{successMessage}</Alert>}
      {error && <Alert severity="error">{error.data.error}</Alert>}
      <Button className="w-full" type="submit">
        {isLoading ? "Загрузка..." : buttonTitle}
      </Button>
    </form>
  );
}

export default FormCompany;
