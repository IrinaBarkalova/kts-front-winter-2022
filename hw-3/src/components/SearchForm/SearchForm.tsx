import * as React from "react";
import { useCallback, useState } from "react";

import SearchButton from "@components/SearchButton";
import SearchIcon from "@components/SearchIcon";
import SearchInput from "@components/SearchInput";
import styles from "@styles/SearchForm.module.scss";

const SearchForm: React.FC = () => {
  const [value, setValue] = useState("");
  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return (
    <div className={styles.searchForm}>
      <SearchInput
        className={styles.searchForm__input}
        value={value}
        placeholder="Введите название организации"
        onChange={onChange}
      />
      <SearchButton className={styles.searchForm__btn} value={value}>
        <SearchIcon color="#fff" />
      </SearchButton>
    </div>
  );
};

export default React.memo(SearchForm);
