import React, { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import profile from "../../../project_images/profile.jpeg";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToApp from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { logout } from "../../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { Backdrop } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "#0b4db7f1" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToApp />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        sx={{ "& .MuiFab-primary": { width: 40, height: 32 } }}
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        // style={{ zIndex: "11" }}
        direction="down"
        open={open}
        className="speedDial"
        icon={<img className="speedDialIcon" src={user.avatar.url} />}
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth < 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
