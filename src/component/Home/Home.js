import React, { useEffect } from "react";
// import { CgMouse } from "react-icons/all";
import Product from "./Product.js";
import "./Home.css";
import Metadata from "../layout/Metadata.js";

import { getProduct } from "../../actions/productActions.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="GENUINE DEALS" />
          <div className="banner">
            <p>Welcome to GenuineDeals</p>
            <h1>Find amazing products Below</h1>

            <Link to="/osm">
              <button>Scroll</button>
            </Link>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product, index) => (
                <Product key={index} product={product} />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
