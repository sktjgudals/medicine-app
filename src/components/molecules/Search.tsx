import { FC } from "react";
import styles from "../../../assets/styles/molecules/Search.module.scss";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const Search: FC = () => {
  return (
    <div className={styles.top_nav_search_container}>
      <div className={styles.search_box}>
        <div
          className={styles.input_box}
          data-target="tray-search-input"
          aria-haspopup="grid"
        >
          <div className={styles.search_input}>
            <Input placeholder="검색" action={"/search"} />
          </div>
        </div>
      </div>
      <Button text={"눌러주세요"} />
    </div>
  );
};

export default Search;
