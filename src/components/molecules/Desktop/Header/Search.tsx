import { FC, useRef } from "react";
import styled from "styled-components";
import useInput from "@/hooks/useInput";

import styles from "../../../../../assets/styles/molecules/Search.module.scss";
import { Input } from "../../../atoms/Input";
import { Button } from "../../../atoms/Button";
import SearchIcon from "../../../atoms/icons/SearchIcon";

const Search: FC = () => {
  const [userFormInput, onChangeForm] = useInput("");
  const searchInput = useRef<any>();

  const onSubmitHandler = (e: React.FormEvent) => {
    if (userFormInput.toString().length === 0) {
      searchInput.current.blur();
      e.preventDefault();
    }
  };

  return (
    <form
      action={`/search`}
      role="search"
      method="GET"
      className={styles.top_nav_search_container}
      onSubmit={onSubmitHandler}
    >
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
              ref={searchInput}
            />
            <input type="hidden" name="keyword" value={userFormInput} />
            <input type="hidden" name="sort" value={"like_count"} />
            <input type="hidden" name="order" value={"ascending"} />
            <input type="hidden" name="page" value={"1"} />
          </div>
        </div>
      </div>
      <div className={styles.search_icon}>
        <SearchButton width={40} height={40}>
          <SearchIcon width={14} height={14} />
        </SearchButton>
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
  font-weight: var(--font-weight-semibold);
  &:hover {
    box-shadow: 0 0 0 2px var(--color-hinted-grey-8) inset;
    background-color: var(--color-background-input-focus);
    transition: all var(--timing-medium);
  }
  &:focus {
    box-shadow: 0 0 0 2px var(--color-green-9) inset;
    background-color: var(--color-background-input-focus);
    transition: all var(--timing-medium);
  }
`;

const SearchButton = styled(Button)`
  border: none;
  cursor: pointer;
  border-radius: 0px 0.6rem 0.6rem 0px !important;
  color: var(--color-text-button-secondary);
  background-color: var(--color-background-input);
  &:hover {
    background-color: var(--color-green-9);
    color: var(--color-brand-accent-moon);
    transition: all var(--timing-medium);
  }
`;
