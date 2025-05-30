import { ADD_TO_CART, CHECK_CART_ITEMS } from "../constants/cartConstant";
import {
  REMOVE_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";
import axios from "axios";

//Add to cart Feature
export const addItemsToCart =
  ({ id }, quantity) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(
      `https://sensational-lily-21be5b.netlify.app/api/v1/products/${id}`
    );

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });

    localStorage.setItem(
      "cartitems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cartitems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
