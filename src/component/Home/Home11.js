import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home11.css";
import Carousel from "./Carousel";
import logo from "../../project_images/logo.png";
import { MdShoppingCart } from "react-icons/md";
import { MdPersonPin } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
import { useSelector } from "react-redux";
import UserOptions from "../layout/Header/UserOptions";
import { getProduct, clearErrors } from "../../actions/productActions";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Product from "./Product";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";

// import {Mdprofilie}
const Home11 = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [keyword, setKeyword] = useState();
  let history = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/products/${keyword}`);
    } else {
      history("/products");
    }
  };

  useEffect(() => {
    // window.location.reload();
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert, isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Genuine Deals" />
          <div className="HomeHeader">
            <div className="Categories">
              <Link to="/" className="cat">
                <img src="https://img5.gadgetsnow.com/gd/images/products/additional/large/G390794_View_1/mobiles/smartphones/apple-iphone-14-plus-128-gb-blue-4-gb-ram-.jpg" />
                Mobiles
              </Link>

              <Link to="/products" className="cat">
                <img src="https://img3.gadgetsnow.com/gd/images/products/additional/large/G391604_View_1/computer-laptop/laptops/hp-15s-fq2671tu-intel-core-i3-1115g4-15-6-inches-notebook-laptop-8gb-512gb-ssd-windows-11-jet-black-1-69-kg-.jpg" />
                Laptops
              </Link>

              <Link to="/" className="cat">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt19VQ6sbZZsB2eMr5V8EIn7GKyrK6jz3okg&usqp=CAU" />
                Fashion
              </Link>

              <Link to="/" className="cat">
                <img src="https://m.media-amazon.com/images/I/61kWB+uzR2L._SX679_.jpg" />
                Headphones
              </Link>

              <Link to="/products" className="cat">
                <img src="https://fashionbazzar.co.in/wp-content/uploads/2022/10/f17e17_d71ab4b343074cf3850d3cfd694970f5mv2-768x768.jpg" />
                Earbuds
              </Link>

              <Link to="/" className="cat">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr2eDFJKZJF5GZkGxay0tr5yWK-93GU00vfQ&usqp=CAU" />
                Gifts
              </Link>
              <Link to="/" className="cat">
                <img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKU83_VW_34FR+watch-41-alum-midnight-nc-8s_VW_34FR_WF_CO_GEO_IN?wid=700&hei=700&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171038000%2C1661971867159" />
                Watch
              </Link>

              <Link to="/" className="cat">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkSTUMK4O7x246vqTRzuczThaYigkKRWk4qA&usqp=CAU" />
                Trimmers
              </Link>
            </div>

            <div className="homeData">
              <Carousel style={{ borderRadius: "10px" }} />
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
              {products &&
                products.map((product, index) => (
                  <Product key={index} product={product} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home11;
