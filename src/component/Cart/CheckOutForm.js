import React from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CheckOutForm = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const stripe = useStripe();
  const elements = useElements();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = axios.post(
    "${process.env.REACT_BACKEND_URL}/api/v1/payment/process",
    paymentData,
    config
  );

  const client_secret = data.client_secret;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !Elements) {
      return;
    }

    const result = await stripe.confirmPayment(client_secret, {
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      navigate("/success");
    }
  };
  return (
    <form>
      <PaymentElement />
      <button disabled={!stripe} onSubmit={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default CheckOutForm;
