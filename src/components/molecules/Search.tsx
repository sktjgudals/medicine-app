import { FC } from "react";
import styled from "styled-components";

import styles from "../../../assets/styles/molecules/Search.module.scss";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import SearchIcon from "../atoms/icons/SearchIcon";
import useInput from "@/hooks/useInput";

const Search: FC = () => {
  const [userFormInput, onChangeForm] = useInput("");
  const onClickHandle = () => {};

  return (
    <form action={`/search`} role="search" method="GET">
      <div className={styles.top_nav_search_container}>
        <div className={styles.search_box}>
          <div
            className={styles.input_box}
            data-target="tray-search-input"
            aria-haspopup="grid"
          >
            <div className={styles.search_input}>
              <SearchInput
                placeholder={"검색"}
                value={userFormInput}
                onChange={onChangeForm}
              />
              <input type="hidden" name="keyword" value={userFormInput} />
              <input type="hidden" name="sort" value={"like_count"} />
              <input type="hidden" name="order" value={"ascending"} />
              <input type="hidden" name="page" value={"1"} />
            </div>
          </div>
        </div>
        <div className={styles.search_icon}>
          <SearchButton width={40} height={39}>
            <SearchIcon />
          </SearchButton>
        </div>
      </div>
    </form>
  );
};

export default Search;

const SearchInput = styled(Input)`
  display: flex;
  width: 100%;
  height: 36px;
  font-size: var(--input-text-small);
  border-radius: 0.6rem 0px 0px 0.6rem !important;
  padding: 0.1rem 1rem !important;
  background-clip: padding-box;
  color: var(--color-text-input);
  background-color: var(--color-background-input);
  &:hover {
    box-shadow: 0 0 0 2px var(--color-hinted-grey-8) inset;
    background-color: var(--color-background-input-focus);
  }
  &:focus {
    box-shadow: 0 0 0 2px var(--color-green-9) inset;
    background-color: var(--color-background-input-focus);
  }
`;

const SearchButton = styled(Button)`
  border: none;
  border-radius: 0px 0.6rem 0.6rem 0px !important;
  color: var(--color-text-button-secondary);
  background-color: var(--color-background-input);
  &:hover {
    color: var(--color-text-button-secondary);
    background-color: var(--color-background-button-secondary-hover);
  }
`;
