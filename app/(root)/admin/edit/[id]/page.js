"use client";

import Heading from "@/shared/heading/heading";
import {
  useEditUserMutation,
  useGetUserQuery,
} from "@/services/adminUsersService";
import { useRouter } from "next/navigation";
import { LinearProgress } from "@mui/material";
import UserForm from "@/components/admin/userForm/form";
import { useEffect } from "react";

function EditUser({ params }) {
  const { data, isLoading, refetch } = useGetUserQuery(params.id);
  const [
    editUser,
    { isLoading: editLoading, error: editError, isSuccess: editIsSuccess },
  ] = useEditUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleEdit = async (form) => {
    return await editUser(form);
  };

  return (
    <div>
      <Heading text="Редактирование пользователя" level={2} />
      {isLoading && <LinearProgress />}
      {data && (
        <UserForm
          user={data}
          onSubmit={handleEdit}
          isSuccess={editIsSuccess}
          error={editError}
          isReset={true}
          successMessage={"Пользователь обновлен"}
          isLoading={editLoading}
          buttonTitle="Сохранить"
        />
      )}
    </div>
  );
}

export default EditUser;
