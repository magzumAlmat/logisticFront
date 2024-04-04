"use client";
import Button from "@/shared/button/button";
import Heading from "@/shared/heading/heading";
import { Edit, Repeat2, Trash2, UserPlus } from "lucide-react";
import React from "react";
import DataTable from "@/shared/table/table";
import {
  useActivateUserMutation,
  useDeactivateUserMutation,
  useGetUsersQuery,
} from "@/services/adminUsersService";
import { LinearProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { getRole } from "@/helpers/getRole";

const headCells = [
  {
    id: "full_name",
    numeric: false,
    disablePadding: false,
    label: "Полное имя",
  },
  { id: "email", numeric: false, disablePadding: false, label: "Почта" },
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Роль",
  },
  {
    id: "activeStatus",
    numeric: false,
    disablePadding: false,
    label: "Статус",
  },
];

const transformUserData = (users) =>
  users.map((user) => ({
    ...user,
    activeStatus: user.isActive ? "Активен" : "Удален",
    role: getRole(user.role),
  }));

export default function AdminPage() {
  const { data, isLoading, refetch } = useGetUsersQuery();

  const [activateUser] = useActivateUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();

  const router = useRouter();

  const handleActivate = async (e, row) => {
    e.stopPropagation();
    const res = await activateUser({ id: row.id });

    if (res.data) {
      refetch();
    }
  };

  const handleDeactivate = async (e, row) => {
    e.stopPropagation();

    const res = await deactivateUser({ id: row.id });

    if (res.data) {
      refetch();
    }
  };

  const handleEdit = (e, row) => {
    e.stopPropagation();
    router.push(`/admin/edit/${row.id}`);
  };

  const cellButtons = (row) => {
    return (
      <div className="flex">
        <Button
          variant="transparent"
          icon={<Edit />}
          iconColor="blue"
          tooltipTitle="Редактировать"
          onClick={(e) => handleEdit(e, row)}
        ></Button>
        {row.isActive ? (
          <Button
            variant="transparent"
            icon={<Trash2 />}
            iconColor="blue"
            tooltipTitle="Удалить"
            onClick={(e) => handleDeactivate(e, row)}
          ></Button>
        ) : (
          <Button
            variant="transparent"
            icon={<Repeat2 />}
            iconColor="blue"
            tooltipTitle="Восстановить"
            onClick={(e) => handleActivate(e, row)}
          ></Button>
        )}
      </div>
    );
  };

  return (
    <div>
      <Heading text="Панель администратора" level={2} className="mb-3" />
      <Button
        type="primary"
        icon={<UserPlus />}
        iconColor="white"
        className="mb-3"
        link="/admin/new"
      >
        Добавить нового пользователя
      </Button>
      {data?.users && data.users.length > 0 && (
        <DataTable
          rows={transformUserData(data.users)}
          headCells={headCells}
          title={"Все Пользователи"}
          renderActions={cellButtons}
        />
      )}
      {isLoading && <LinearProgress />}
      {!isLoading && data?.users.length === 0 && <p>Пользователи не найдены</p>}
    </div>
  );
}
