import "@styles/App.css";
import * as React from "react";
import { useState } from "react";

import "@styles/Input.css";
import SearchButton from "@components/SearchButton";
import SearchIcon from "@components/SearchIcon";
import SearchInput from "@components/SearchInput";
import GitHubStore from "@store/GitHubStore";
import { GithubRepoModel } from "@store/models/github";
import { normalizeCollection } from "@utils/collection";

type Props = {
  setRepos: React.Dispatch<React.SetStateAction<GithubRepoModel[]>>;
};
const SearchForm: React.FC<Props> = ({ setRepos }: Props) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    const gitHubStore = new GitHubStore();
    setRepos([]);

    gitHubStore
      .getOrganizationReposList({
        organizationName: value,
      })
      .then((result) => {
        setRepos(normalizeCollection(result.data));
      });
  };
  return (
    <div className="search-form">
      <SearchInput
        className="search-form__input"
        value={value}
        placeholder="Введите название организации"
        onChange={(event) => setValue(event.target.value)}
      />
      <SearchButton className="search-form__btn" changeFun={handleClick}>
        <SearchIcon color="#fff" />
      </SearchButton>
    </div>
  );
};

export default React.memo(SearchForm);
