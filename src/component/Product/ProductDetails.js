import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";

import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetails,
  clearErrors,
  newReview,
} from "../../actions/productActions";
import { Link, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
// import Rating from "@material-ui/lab";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Metadata from "../layout/Metadata";
import { addItemsToCart } from "../../actions/cartAction";
import ReactImageMagnify from "react-image-magnify";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useSlider } from "@mui/base";
import Navbar from "../Home/Navbar";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { isAuthenticated } = useSelector((state) => state.user);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const id = useParams();

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const toTop = () => {
    window.scrollTo(0, 0);
  };
  const [quantity, setQuantity] = useState(1);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (quantity < product.Stock) {
      const qty = quantity + 1;
      setQuantity(qty);
    } else {
      alert.error("This product do not have more stock");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const qty = quantity - 1;
      setQuantity(qty);
    }
  };

  const addToCartHandler = () => {
    if (isAuthenticated) {
      dispatch(addItemsToCart(id, quantity));
      alert.success("Added to Cart you can go and checkout");
    } else {
      alert.error("Please SignUp or Login to add items in your cart");
    }
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("productId", { id });
    myForm.set("comment", comment);
    myForm.set("rating", 2);

    dispatch(newReview(myForm));
    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Added Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails" onLoad={toTop}>
            <div>
              <Carousel navButtonsAlwaysVisible={true}>
                {product.images &&
                  product.images.map((item, i) => (
                    // <img
                    //   className="CarousalImage"
                    //   key={i}
                    //   src={item.url}
                    //   alt={`${i}Slide`}
                    //   style={{ marginLeft: "320px" }}
                    // />

                    <ReactImageMagnify
                      className="magnify"
                      {...{
                        smallImage: {
                          alt: "Images",
                          // isFluidWidth: true,
                          className: "smallImage",
                          width: 350,
                          height: 400,
                          src: `${item.url}`,
                        },
                        largeImage: {
                          src: `${item.url}`,
                          width: 800,
                          height: 900,
                        },
                      }}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <Metadata title={product.name} />
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>Rs.{`${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  {product.Stock >= 1 ? (
                    <button onClick={addToCartHandler}>Add to Cart</button>
                  ) : (
                    <button disabled style={{ backgroundColor: "grey" }}>
                      {" "}
                      Add to Cart
                    </button>
                  )}
                </div>
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? " OutOfStock" : " Instock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>

              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                {...options}
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                  // <div>
                  //   <div>{review.name}</div>
                  //   <div>{review.comment}</div>
                  // </div>
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
