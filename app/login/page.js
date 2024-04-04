import React from "react";
import styles from "./login.module.css";
import LoginForm from "../../components/login/loginForm/loginForm";
import Heading from "@/shared/heading/heading";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <Heading level={3} text="Вход в CRM" className="my-4" center={true} />
      <LoginForm />
    </div>
  );
}
