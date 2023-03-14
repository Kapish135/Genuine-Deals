import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/Product";
import { useParams } from "react-router-dom";
import { Slider, Typography } from "@material-ui/core";
import ReactPaginate from "react-paginate";
import { useAlert } from "react-alert";
import MetaData from "../layout/Metadata";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];
const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [price, setPrice] = useState([0, 25000]);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const [category, setCategory] = useState("");
  const [rating, setRatings] = useState(0);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };
  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct(keyword, price, category, rating));
  }, [dispatch, keyword, price, category, rating, alert, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="All Products -- Genuine Deals" />
          <h2 className="productsHeading">Showing Products </h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
          <div className="filterbox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categorybox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {/* <div className="paginations">
            <ReactPaginate
              initialPage={currentPage}
              itemsCountPerPage={resultPerPage}
              pageCount={productsCount}
              onPageChange={setCurrentPageNo}
              nextLabel="Next"
              previousLabel="Prev"
              firstPageText="1st"
              lastPageText="Last"
              // items="page-item"
              pageLinkClassName="page-link"
              activeClassName="pageItemActive"
              activeLinkClassName="pageLinkActive"
            />
          </div> */}
        </>
      )}
    </>
  );
};

export default Products;
