import React, { useState, Fragment } from "react";
// import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import Metadata from "../layout/Metadata";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  let history = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    } else {
      history("/products");
    }
  };

  return (
    <Fragment>
      <Metadata title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
