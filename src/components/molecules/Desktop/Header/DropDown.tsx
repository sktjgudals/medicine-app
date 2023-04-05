import { FC, useEffect, useState } from "react";

import Link from "next/link";

import styles from "../../../../../assets/styles/molecules/Desktop/Header/DropDown.module.scss";

interface DropDownProps {
  showDropDown: boolean;
  toggleDropDown: () => void;
}

const DropDown: FC<DropDownProps> = ({
  toggleDropDown,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  const TogglecloseHandler = () => {
    toggleDropDown();
  };

  const handleMouseDown = (e: React.MouseEvent) => e.preventDefault();

  const logoutHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <nav className={styles.dropdown_menu}>
      <Link
        href="/"
        className={styles.Drop_Down_Button_Container}
        onMouseDown={handleMouseDown}
        // onClick={(): void => TogglecloseHandler()}
      >
        {/* <ShopingCartIcon /> */}
        <p className={styles.Drop_Down_Text}>상품보기</p>
      </Link>
    </nav>
  );
};

export default DropDown;
