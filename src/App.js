import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Home from "./component/Home/Home.js";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./Store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Proflie.js";
// import protectedRoute from "./component/Route/potectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Shipping from "./component/Cart/Shipping.js";
import axios from "axios";
import Pay from "./component/Cart/Pay.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Cart/MyOrder.js";
import OrderDetails from "./component/Cart/OrderDetails";

import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UserList";
import UpdateUser from "./component/admin/UpdateUser";
import Product from "./component/Home/Product";
import ProductReviews from "./component/admin/ProductReview";
import NotFound from "./component/layout/NotFound/NotFound";
import Home11 from "./component/Home/Home11";
import Navbar from "./component/Home/Navbar";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // const [stripeApiKey, setStripeApiKey] = useState("");
  // async function getStripeApiKey() {
  //   const { data } = await axios.get(
  //     `${process.env.REACT_BACKEND_URL}/api/v1/stripeApiKey`
  //   );

  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    // console.log("kapish");
    // console.log(stripeApiKey);
    store.dispatch(loadUser());
    // getStripeApiKey();

    window.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Navbar />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          {/* <Elements stripe={loadStripe(stripeApiKey)}> */}
          {/* <Route exact path="/osm" element={<Home11 />} /> */}
          <Route exact path="/process/payment" element={<Pay />} />
          {/* </Elements> */}
          <Route exact path="/" element={<Home11 />} />
          {isAuthenticated ? (
            <Route exact path="/account" element={<Profile />} />
          ) : (
            <Route exact path="/login" element={<LoginSignUp />} />
          )}
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/Search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          {isAuthenticated && (
            <Route exact path="/me/update" element={<UpdateProfile />} />
          )}
          {isAuthenticated && (
            <Route exact path="/password/update" element={<UpdatePassword />} />
          )}
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
          {isAuthenticated && (
            <Route exact path="/success" element={<OrderSuccess />} />
          )}
          {isAuthenticated && (
            <Route exact path="/orders" element={<MyOrders />} />
          )}

          {isAuthenticated && (
            <Route exact path="/order/:id" element={<OrderDetails />} />
          )}

          {isAuthenticated && (
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
          )}

          {isAuthenticated && (
            <Route exact path="/admin/products" element={<ProductList />} />
          )}

          {isAuthenticated && (
            <Route exact path="/admin/product" element={<NewProduct />} />
          )}

          {isAuthenticated && (
            <Route
              exact
              path="/admin/product/:id"
              element={<UpdateProduct />}
            />
          )}
          {isAuthenticated && (
            <Route exact path="/admin/orders" element={<OrderList />} />
          )}
          {isAuthenticated && (
            <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
          )}

          {isAuthenticated && (
            <Route exact path="/admin/users" element={<UsersList />} />
          )}

          {isAuthenticated && (
            <Route exact path="/admin/user/:id" element={<UpdateUser />} />
          )}

          {isAuthenticated && (
            <Route exact path="/admin/reviews" element={<ProductReviews />} />
          )}
          <Route element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
