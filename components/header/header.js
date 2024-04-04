import Button from "@/shared/button/button";
import { ChevronLeft, Package, ShoppingBasket } from "lucide-react";
import React from "react";
import styles from "./header.module.css";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectMyModule } from "@/slice/moduleSlice";

export default function Header() {
  const router = useRouter();

  const myModule = useSelector(selectMyModule);

  return (
    <header className={styles.header}>
      <Button
        type="transparent"
        icon={<ChevronLeft />}
        onClick={() => router.back()}
      >
        Назад
      </Button>
      <div className={styles.headerRight}>
        <div className={styles.buttons}>
          <Button
            type="secondary"
            reversed={true}
            icon={<Package />}
            iconColor="white"
            iconBg="blue"
            link={`/${myModule}-proposals/new`}
          >
            Создать новую заявку
          </Button>
        </div>
      </div>
    </header>
  );
}
