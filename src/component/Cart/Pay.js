import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckOutForm from "./CheckOutForm";
import axios from "axios";
import Payment from "./Payment";
import { useSelector } from "react-redux";
// import Payment from "./Payment";
const stripePromise = loadStripe(
  "pk_test_51M4koQSDXBotqBrUOga86I7HDV6HSudt9mdaqNUbrVkDjBjCCixrPQXVJBTL1D06aUrteG47hE4bZct9kk39Iy4f00PVmJwELo"
);
const Pay = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Elements stripe={stripePromise}>
      ({isAuthenticated && <Payment />})
    </Elements>
    // <div>flkjslf</div>
  );
};

export default Pay;
