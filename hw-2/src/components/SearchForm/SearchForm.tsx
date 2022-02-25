import "@styles/SearchForm.css";
import * as React from "react";
import { useCallback, useState } from "react";

import "@styles/Input.css";
import SearchButton from "@components/SearchButton";
import SearchIcon from "@components/SearchIcon";
import SearchInput from "@components/SearchInput";
import { GithubRepoModel } from "@store/models/github";

type Props = {
  isLoading: (value: boolean) => void;
  setRepos: React.Dispatch<React.SetStateAction<GithubRepoModel[]>>;
};
const SearchForm: React.FC<Props> = ({ setRepos, isLoading }: Props) => {
  const [value, setValue] = useState("");
  const onChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return (
    <div className="search-form">
      <SearchInput
        className="search-form__input"
        value={value}
        placeholder="Введите название организации"
        onChange={onChange}
      />
      <SearchButton
        className="search-form__btn"
        setRepos={setRepos}
        isLoading={isLoading}
        value={value}
      >
        <SearchIcon color="#fff" />
      </SearchButton>
    </div>
  );
};

export default React.memo(SearchForm);
