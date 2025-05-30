import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const getProduct =
  (keyword = "", price = [0, 25000], category, rating = 0) =>
  async (dispatch) => {
    try {
      axios.defaults.withCredentials = true;
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `https://sensational-lily-21be5b.netlify.app/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte] = ${rating}`;
      if (category) {
        link = `https://sensational-lily-21be5b.netlify.app/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte] = ${rating}`;
      }
      const { data } = await axios.get(link, { withCredentials: true });

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get(
      `https://sensational-lily-21be5b.netlify.app/api/v1/admin/products`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
    localStorage.setItem(
      "products",
      JSON.stringify(getState().products.products)
    );
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getProductDetails =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });

      // console.log(id);
      const { data } = await axios.get(
        `https://sensational-lily-21be5b.netlify.app/api/v1/products/${id}`
      );

      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//Submit review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    // console.log(id);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `https://sensational-lily-21be5b.netlify.app/api/v1/review`,
      reviewData,
      config,
      { withCredentials: "true" }
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Get aLL reviews of a product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(
      `https://sensational-lily-21be5b.netlify.app/api/v1/reviews?id=${id}`,
      config,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `https://sensational-lily-21be5b.netlify.app/api/v1/reviews?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    // console.log(id);
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `https://sensational-lily-21be5b.netlify.app/api/v1/admin/product/new`,
      productData,
      config,
      { withCredentials: true }
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct =
  ({ id }, productData) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });

      // console.log(id);
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `https://sensational-lily-21be5b.netlify.app/api/v1/admin/products/${id}`,
        config,
        productData
      );

      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//Delete A Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    // console.log(id);
    const { data } = await axios.delete(
      `https://sensational-lily-21be5b.netlify.app/api/v1/admin/products/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
