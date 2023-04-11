import { FC } from "react";
import DropDown from "./DropDown";
import HambergerBarIcon from "@/components/atoms/icons/HambergerBarIcon";
import useDropdown from "@/hooks/useDropdown";

import styles from "#/styles/molecules/Desktop/Header/Menu.module.scss";

const Menu: FC = (): JSX.Element => {
  const { isOpen, dropdownRef, toggleDropdown } = useDropdown();

  return (
    <div className={styles.menu_container} ref={dropdownRef}>
      <button
        className={styles.hamberger_icon_button}
        onClick={(): void => toggleDropdown()}
      >
        <HambergerBarIcon width={30} height={30} size={"2xl"} color={"grey"} />
      </button>
      <div className={styles.dropdown_container}>
        {
          <DropDown
            toggleDropDown={(): void => toggleDropdown()}
            isOpen={isOpen}
          />
        }
      </div>
    </div>
  );
};

export default Menu;
