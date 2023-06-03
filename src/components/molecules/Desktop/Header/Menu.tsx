import { FC } from "react";

import DropDown from "./DropDown";
import HambergerBarIcon from "@/components/atoms/icons/HambergerBarIcon";
import useDropdown from "@/hooks/useDropdown";

import styles from "#/styles/molecules/Desktop/Header/Menu.module.scss";
import { useSession } from "@/hooks/useSession";
import CircleImage from "@/components/atoms/CircleImage";
import SKCircleImage from "@/components/atoms/Skeleton/SKCircleImage";

const Menu: FC = (): JSX.Element => {
  const { isOpen, dropdownRef, toggleDropdown } = useDropdown();
  const { loading, session } = useSession();
  if (loading) return <SKCircleImage width={35} height={35} />;

  return (
    <div className={styles.menu_container} ref={dropdownRef}>
      <button
        className={styles.hamberger_icon_button}
        onClick={() => toggleDropdown()}
      >
        {session ? (
          <CircleImage image={session.image} width={35} height={35} />
        ) : (
          <HambergerBarIcon
            width={30}
            height={30}
            size={"2xl"}
            color={"grey"}
          />
        )}
      </button>
      <div className={styles.dropdown_container}>
        <DropDown
          toggleDropDown={() => toggleDropdown()}
          isOpen={isOpen}
          session={session}
        />
      </div>
    </div>
  );
};

export default Menu;
