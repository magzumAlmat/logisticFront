import React, { memo, useEffect } from "react";
import {
  Archive,
  Building2,
  PackageOpen,
  ShoppingBasket,
  Warehouse,
} from "lucide-react";
import MenuLink from "./menuLink/menuLink";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectPathname, setPathname } from "@/slice/selectedSlice";
import { selectMyModule } from "@/slice/moduleSlice";

const menuItemsAuto = [
  { href: "/companies", icon: <Building2 />, text: "Компании" },
  { href: "/auto-proposals", icon: <PackageOpen />, text: "Заявки (авто)" },
  { href: "/auto-warehouses", icon: <Warehouse />, text: "Склады (авто)" },
  {
    href: "/auto-basket",
    icon: <ShoppingBasket />,
    text: "Загрузочные листы (авто)",
  },
  { href: "/auto-archive", icon: <Archive />, text: "Архив (авто)" },
];

const menuItemsSpecial = [
  { href: "/companies", icon: <Building2 />, text: "Компании" },
  {
    href: "/spec-proposals",
    icon: <PackageOpen />,
    text: "Заявки (самоход)",
  },
  {
    href: "/spec-warehouses",
    icon: <Warehouse />,
    text: "Склады (самоход)",
  },
  {
    href: "/spec-basket",
    icon: <ShoppingBasket />,
    text: "Загрузочные листы (самоход)",
  },
  { href: "/spec-archive", icon: <Archive />, text: "Архив (самоход)" },
];

const menuItemsRailway = [
  { href: "/companies", icon: <Building2 />, text: "Компании" },
  {
    href: "/railway-proposals",
    icon: <PackageOpen />,
    text: "Заявки (ЖД)",
  },
  { href: "/railway-archive", icon: <Archive />, text: "Архив (ЖД)" },
];

const MenuLinks = memo(function MenuLinks({ minimized }) {
  const pathname = usePathname();

  const myModule = useSelector(selectMyModule);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPathname(pathname));
  }, [dispatch, pathname]);

  return (
    <ul className="flex">
      {myModule === "auto" &&
        menuItemsAuto.map((item, index) => (
          <MenuLink
            key={index}
            href={item.href}
            icon={item.icon}
            text={item.text}
            isActive={pathname === item.href}
            module={myModule}
            minimized={minimized}
          />
        ))}

      {myModule === "spec" &&
        menuItemsSpecial.map((item, index) => (
          <MenuLink
            key={index}
            href={item.href}
            icon={item.icon}
            text={item.text}
            isActive={pathname === item.href}
            module={myModule}
            minimized={minimized}
          />
        ))}

      {myModule === "railway" &&
        menuItemsRailway.map((item, index) => (
          <MenuLink
            key={index}
            href={item.href}
            icon={item.icon}
            text={item.text}
            isActive={pathname === item.href}
            module={myModule}
            minimized={minimized}
          />
        ))}
    </ul>
  );
});
export default MenuLinks;
