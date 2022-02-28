import "@styles/SearchForm.scss";
import * as React from "react";
import { useCallback, useState } from "react";

import SearchButton from "@components/SearchButton";
import SearchIcon from "@components/SearchIcon";
import SearchInput from "@components/SearchInput";

const SearchForm: React.FC = () => {
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
      <SearchButton className="search-form__btn" value={value}>
        <SearchIcon color="#fff" />
      </SearchButton>
    </div>
  );
};

export default React.memo(SearchForm);
