import React, { useEffect } from "react";
import Dropdown from "@/shared/dropdown/dropdown";
import { Car, Tractor, TrainTrack } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectMyModule, setMyModule } from "@/slice/moduleSlice";
import { useRouter } from "next/navigation";

const dropdownItems = [
  { text: "Автоперевозки", value: "auto", icon: <Car /> },
  {
    text: "Самоход/Спецтехника",
    value: "spec",
    icon: <Tractor />,
  },
  {
    text: "ЖД",
    value: "railway",
    icon: <TrainTrack />,
  },
];

function ModuleDropdown({}) {
  const myModule = useSelector(selectMyModule);

  const dispatch = useDispatch();

  const router = useRouter();

  const setModule = (value) => {
    localStorage.setItem("selectedModule", value);
    dispatch(setMyModule(value));
    router.push(`${value}-proposals`);
  };

  useEffect(() => {
    // При загрузке компонента, проверяем, есть ли сохраненное значение в локальном хранилище
    const storedModule = localStorage.getItem("selectedModule");
    if (storedModule) {
      // Если есть, устанавливаем значение из локального хранилища
      dispatch(setMyModule(storedModule));
    }
  }, [dispatch]);

  return (
    <Dropdown options={dropdownItems} value={myModule} setValue={setModule} />
  );
}

export default ModuleDropdown;
