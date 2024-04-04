"use client";
import UserForm from "@/components/admin/userForm/form";
import { useCreateUserMutation } from "@/services/adminUsersService";
import Heading from "@/shared/heading/heading";

function NewUserPage() {
  const [createUser, { isLoading, error, isSuccess }] = useCreateUserMutation();

  const handleCreate = async (form) => {
    return await createUser(form);
  };

  return (
    <div>
      <Heading text="Новый пользователь" level={2} className="mb-3" />
      <UserForm
        isReset={false}
        onSubmit={handleCreate}
        buttonTitle={"Пригласить"}
        isLoading={isLoading}
        error={error}
        isSuccess={isSuccess}
        successMessage={
          "Пользователь приглашен. Данные для входа получены по почте"
        }
      />
    </div>
  );
}

export default NewUserPage;
