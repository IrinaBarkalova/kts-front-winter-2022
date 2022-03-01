import * as React from "react";

import { useReposContext } from "@App/App";
import SearchButton from "@components/SearchButton";
import SearchIcon from "@components/SearchIcon";
import SearchInput from "@components/SearchInput";
import styles from "@styles/SearchForm.module.scss";

const SearchForm: React.FC = () => {
  const RepoContext = useReposContext();
  const onChange = React.useCallback(
    (event) => {
      RepoContext.setInputStr(event.target.value);
    },
    [RepoContext]
  );
  return (
    <div className={styles.searchForm}>
      <SearchInput
        className={styles.searchForm__input}
        value={RepoContext.inputStr}
        placeholder="Введите название организации"
        onChange={onChange}
      />
      <SearchButton className={styles.searchForm__btn}>
        <SearchIcon color="#fff" />
      </SearchButton>
    </div>
  );
};

export default React.memo(SearchForm);
