import { legacy_createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  deleteProductReducer,
  reviewReducer,
  productReviewsReducer,
} from "./Reducers/productReducer";
import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  allUserReducer,
  userDetailsReducer,
} from "./Reducers/userReducer";
import { cartReducer } from "./Reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./Reducers/orderReducer";
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  allorders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUserReducer,
  userDetails: userDetailsReducer,
  review: reviewReducer,
  productReviews: productReviewsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
