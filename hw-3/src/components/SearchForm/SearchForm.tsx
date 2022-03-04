import * as React from "react";

import { useReposContext } from "@App/App";
import SearchButton from "@components/SearchButton";
import styles from "@components/SearchForm/SearchForm.module.scss";
import SearchIcon from "@components/SearchIcon";
import SearchInput from "@components/SearchInput";

const SearchForm: React.FC = () => {
  const repoContext = useReposContext();
  const onChange = React.useCallback(
    (event) => {
      repoContext.setInputStr(event.target.value);
    },
    [repoContext]
  );
  return (
    <div className={styles.search_form}>
      <SearchInput
        className={styles.search_form__input}
        value={repoContext.inputStr}
        placeholder="Введите название организации"
        onChange={onChange}
      />
      <SearchButton className={styles.search_form__btn}>
        <SearchIcon color="#fff" />
      </SearchButton>
    </div>
  );
};

export default React.memo(SearchForm);
