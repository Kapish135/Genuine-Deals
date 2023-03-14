import React from "react";
import playStore from "../../../project_images/images.png";
import appStore from "../../../project_images/ios.png";
import logo from "../../../project_images/logo.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download our app</h4>
        <p>Download app for android and ios mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>
      <div className="midFooter">
        <img src={logo} width="410px" height="135px" />
        <p>High Quality is our first priority</p>
        <p>Copyrights 2022 &copy; KapishChawla</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/kapish._135/">Instagram</a>
        <a href="https://www.linkedin.com/in/kapish-chawla-156502231/">
          LinkedIn
        </a>
        <a href="https://www.linkedin.com/in/kapish-chawla-156502231/">
          Facebook
        </a>
      </div>
    </footer>
  );
};

export default Footer;
