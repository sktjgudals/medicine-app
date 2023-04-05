import React, { useState } from "react";
import DropDown from "./DropDown";
import HambergerBarIcon from "@/components/atoms/icons/HambergerBarIcon";

import styles from "../../../../../assets/styles/molecules/Desktop/Header/Menu.module.scss";

const Menu: React.FC = (): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  return (
    <div className={styles.menu_container}>
      <div>
        <button
          onClick={(): void => toggleDropDown()}
          onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
            dismissHandler(e)
          }
          className={styles.hamberger_icon_button}
        >
          <HambergerBarIcon width={30} height={30} size={"2xl"} />
        </button>
      </div>
      <div className={styles.dropdown_container}>
        {showDropDown && (
          <DropDown
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
          />
        )}
      </div>
    </div>
  );
};

export default Menu;
