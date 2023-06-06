import { FC, useRef } from "react";
import styled from "styled-components";
import useInput from "@/hooks/useInput";

import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import SearchIcon from "@/components/atoms/icons/SearchIcon";

import styles from "#/styles/molecules/Desktop/Header/Search.module.scss";
import SearchTray from "./SearchTray";

const Search: FC = () => {
  const [value, onChangeValue] = useInput("");

  const searchInput = useRef<any>();

  const onSubmitHandler = (e: React.FormEvent) => {
    if (value.toString().length === 0) {
      searchInput.current.blur();
      e.preventDefault();
    }
  };

  const typeSelector = (): string => {
    if (value.charAt(0) === "#") {
      return "tag";
    } else if (value.charAt(0) === "@") {
      return "user";
    } else {
      return "body";
    }
  };

  const keywordSubmit = (): string => {
    if (value.charAt(0) === "#" || value.charAt(0) === "@") {
      return value.substr(1);
    } else {
      return value;
    }
  };

  return (
    <>
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
                value={value}
                onChange={onChangeValue}
                ref={searchInput}
              />
              <input type="hidden" name="keyword" value={keywordSubmit()} />
              <input type="hidden" name="sort" value={"created_at"} />
              <input type="hidden" name="type" value={typeSelector()} />
            </div>
          </div>
        </div>
        <div className={styles.search_icon}>
          <SearchButton width={40} height={40}>
            <SearchIcon width={14} height={14} />
          </SearchButton>
        </div>
      </form>
      {value.length > 0 && <SearchTray />}
    </>
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
  border-radius: 0px 0.6rem 0.6rem 0px !important;
  color: var(--color-text-button-secondary);
  background-color: var(--color-background-input);
  &:hover {
    background-color: var(--color-green-9);
    color: var(--color-brand-accent-moon);
    transition: all var(--timing-medium);
  }
`;
