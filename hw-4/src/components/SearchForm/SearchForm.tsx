import * as React from "react";

import { useReposContext } from "@App/App";
import SearchButton from "@components/SearchButton";
import styles from "@components/SearchForm/SearchForm.module.scss";
import SearchIcon from "@components/SearchIcon";
import SearchInput from "@components/SearchInput";
import { observer } from "mobx-react-lite";

const SearchForm: React.FC = () => {
  const repoContext = useReposContext();

  return (
    <div className={styles.search_form}>
      <SearchInput
        className={styles.search_form__input}
        value={repoContext.gitHubStore.value}
        placeholder="Введите название организации"
        onChange={repoContext.gitHubStore.handleChangeValue}
      />
      <SearchButton className={styles.search_form__btn}>
        <SearchIcon color="#fff" />
      </SearchButton>
    </div>
  );
};

export default observer(SearchForm);
