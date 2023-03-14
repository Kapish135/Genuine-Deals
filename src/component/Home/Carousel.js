import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CarouselStyle.css";
import React from "react";
import image1 from "../../project_images/image1.webp";
import { useNavigate } from "react-router-dom";
const images = [
  {
    id: 1,
    src: "https://static.toiimg.com/img/80037086/Master.jpg",
    alt: "Image 1",
  },
  {
    id: 2,
    src: "https://png.pngtree.com/background/20210710/original/pngtree-cool-new-mobile-phone-promotion-purple-banner-picture-image_1006678.jpg",
    alt: "Image 2",
  },
  {
    id: 3,
    src: "https://static.toiimg.com/img/80037086/Master.jpg",
    alt: "Image 3",
  },
  {
    id: 4,
    src: "https://png.pngtree.com/background/20210710/original/pngtree-cool-new-mobile-phone-promotion-purple-banner-picture-image_1006678.jpg",
    alt: "Image 4",
  },
];
const Carousel = () => {
  const navigate = useNavigate();
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const toProduct = () => {
    navigate("/products");
  };
  return (
    <>
      {/* <div className="tag">
        <h1>Image Gallery</h1>
      </div> */}
      <div className="imgslider">
        <Slider {...settings}>
          {images.map((item) => (
            <div key={item.id}>
              <img
                src={item.src}
                alt={item.alt}
                onClick={toProduct}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Carousel;
