import React from "react";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
const ReviewCard = (props) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    // size: window.innerWidth < 600 ? 20 : 25,
    value: props.review.rating,
    isHalf: true,
  };
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="reviewCard">
        {/* <img
          src={user.avatar.url}
          alt="User"
          style={{ borderRadius: "50%", height: "50px", width: "55px" }}
        /> */}
        <p>{props.review.name}</p>
        <Rating {...options} />
        <span className="reviewCardComment">{props.review.comment}</span>
      </div>
    </>
  );
};

export default ReviewCard;
