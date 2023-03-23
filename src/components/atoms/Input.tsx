import { FC } from "react";
import useInput from "@/hooks/useInput";
import styles from "../../../assets/styles/atoms/Input.module.scss";

interface Props {
  placeholder?: string;
  action: string | null;
}

const Input: FC<Props> = ({ placeholder, action }) => {
  const [userFormInput, onChangeForm] = useInput("");
  if (action)
    return (
      <form action={`${action}`} role="search" method="GET">
        <input
          className={styles.search_box}
          placeholder={placeholder}
          value={userFormInput}
          onChange={onChangeForm}
        />
        <input type="hidden" name="keyword" value={userFormInput} />
        <input type="hidden" name="sort" value={"like_count"} />
        <input type="hidden" name="order" value={"ascending"} />
        <input type="hidden" name="page" value={"1"} />
      </form>
    );

  return (
    <input
      placeholder={placeholder}
      value={userFormInput}
      onChange={onChangeForm}
    />
  );
};

export default Input;
