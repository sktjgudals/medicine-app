import { FC } from "react";
import styled from "styled-components";

import styles from "../../../assets/styles/molecules/Search.module.scss";
import Input from "../atoms/Input";
import { Button } from "../atoms/Button";
import SearchIcon from "../atoms/icons/SearchIcon";

const Search: FC = () => {
  const onClickHandle = () => {};

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
      <div className={styles.search_icon}>
        <SearchButton width={40} height={39}>
          <SearchIcon />
        </SearchButton>
      </div>
    </div>
  );
};

export default Search;

const SearchButton = styled(Button)`
  border: none;
  border-radius: 0px 0.6rem 0.6rem 0px !important;
  color: var(--color-text-button-secondary);
  background-color: var(--color-background-input);
  &:hover {
    color: var(--color-text-button-secondary);
    background-color: var(--color-background-button-secondary-default);
  }
`;
