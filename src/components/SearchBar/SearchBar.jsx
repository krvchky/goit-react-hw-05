import React, { useState } from "react";
import s from "./SearchBar.module.css"; 


const SearchBar = ({ filterValue, handleChangeFilter, handleSearchSubmit }) => {
  const [inputValue, setInputValue] = useState(filterValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearchSubmit(inputValue); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
      className={s.input}
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Search movie..."
      />
      <button type="submit" className={s.submit}>Search</button>
    </form>
  );
};

export default SearchBar;