import "@styles/App.css";
import * as React from "react";
import { useState } from "react";

import "@styles/Input.css";
import searchBtn from "@components/img/SearchIcon.png";
import GitHubStore from "@store/GitHubStore";
import { normalizeCollection } from "@utils/collection";

type Props = {
  setRepos: any;
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
      <input
        type="text"
        className="search-form__input"
        placeholder={"Введите название организации"}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={handleClick} className="search-form__btn">
        <img src={searchBtn} alt="" className="search-form__btn__img" />
      </button>
    </div>
  );
};

export default SearchForm;
