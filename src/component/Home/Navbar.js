import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home11.css";
import logo from "../../project_images/logo.png";

import { MdShoppingBag } from "react-icons/md";
import { useSelector } from "react-redux";
import UserOptions from "../layout/Header/UserOptions";
import Product from "./Product";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const { user } = useSelector((state) => state.user);

  const [keyword, setKeyword] = useState("");
  let history = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    }
  };
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };
  return (
    <>
      <div className="navbar">
        <img src={logo} onClick={toHome} style={{ cursor: "pointer" }} />
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search for products ..."
            onChange={(e) => setKeyword(e.target.value)}
          />

          {/* <input type="submit" value="Search" onClick={searchSubmitHandler} /> */}
        </form>
        {isAuthenticated ? (
          <Link
            to="/account"
            style={{
              font: "600 1.3vmax Roboto",
              color: "white",
              marginTop: "18px",
            }}
          >
            My Account😊
          </Link>
        ) : (
          <Link
            to="/login"
            className="button_login"
            style={{
              color: "gray",
              font: "600 1.25vmax Roboto",
              height: "33px",
              // fontWeight: "bold",
              padding: ".15vmax 1.4vmax",
              // width: "120px",
              // textAlign: "center",
              // borderRadius: "3px",
              marginTop: "14px",
            }}
          >
            Login
          </Link>
        )}
        <Link to="/cart" className="float">
          My Cart
          {/* <MdShoppingBag className="icon-bag" /> */}
        </Link>
        <Link to={isAuthenticated ? "" : "/register"} className="floatright">
          {isAuthenticated ? `Hi, ${user.name}` : "SignUp"}
          {/* {isAuthenticated && <UserOptions user={user} />} */}
        </Link>
      </div>
    </>
  );
};
export default Navbar;
