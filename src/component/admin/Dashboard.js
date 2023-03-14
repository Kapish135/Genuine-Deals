import React, { forwardRef, useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productActions";
import { allOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import { useNavigate } from "react-router-dom";
import Metadata from "../layout/Metadata.js";
const Dashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.allUsers);
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allorders);

  useEffect(() => {
    if (user.role != "admin") {
      navigate("/account");
    }

    dispatch(getAdminProduct);
    dispatch(allOrders);
    dispatch(getAllUsers);
  }, [dispatch]);

  let TotalAmount = 0;

  products &&
    products.forEach((item) => {
      TotalAmount += item.price;
    });
  const state = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Rainfall",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Metadata title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹ {TotalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">{/* <Line data={state} /> */}</div>

        {/* <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
