import React, { useState } from "react";
import "./App.css";
import Qr from "../src/modules/Qr.js";
import Image from "../src/Images/favicon.ico";
import Footer from "./section/Footer.js";
import Premium from "./section/Premium.js";
// import HowToSection from './section/HowQR.js';
// import QRwhat from './section/QRwhat.js';

// import FAQ from '../src/Routing url/FAQ';

function Header() {
  const [isNavLinksVisible, setNavLinksVisible] = useState(false);
  const [isHtmlCssArrowClicked, setHtmlCssArrowClicked] = useState(false);

  const handleMenuOpenClick = () => {
    setNavLinksVisible(true);
  };

  const handleMenuCloseClick = () => {
    setNavLinksVisible(false);
  };

  const handleHtmlCssArrowClick = () => {
    setHtmlCssArrowClicked(!isHtmlCssArrowClicked);
  };
  const AppHeader = () => {
    return (
      <div className="header-class">
        <div className="navbar">
          <i className="bx bx-menu" onClick={handleMenuOpenClick}></i>

          <div className="logo">
            <a href="home">
              <img src={Image} alt="logo" />
              qrcode
              <span style={{ color: "#84c45c", fontWeight: "700" }}>Snake</span>
            </a>
          </div>

          <div className="nav-links">
            <div className="sidebar-logo">
              <span className="logo-name">
                <img src="/qrimg/favicon.ico" alt="logo" />
                QRcode
              </span>
              <i className="bx bx-x" onClick={handleMenuCloseClick}></i>
            </div>

            <ul className="links">
              <li>
                <a href="FAQ">FAQ</a>
              </li>
              <li>
                <a href="about">Pricing</a>
              </li>

              {/* Add more list items as needed */}
              <li>
                <a href="##">More</a>
                <i
                  className={`bx bxs-chevron-down htmlcss-arrow arrow ${
                    isHtmlCssArrowClicked ? "show1" : ""
                  }`}
                  onClick={handleHtmlCssArrowClick}
                ></i>
                <ul
                  className={`htmlCss-sub-menu sub-menu ${
                    isHtmlCssArrowClicked ? "show1" : ""
                  }`}
                >
                  <li>
                    <a href="Terms">Terms</a>
                  </li>
                  <li>
                    <a href="privacy-policy">privacy</a>
                  </li>
                  <li>
                    <a href="privacy-policy">Contact</a>
                  </li>
                  <li>
                    <a href="About">About</a>
                  </li>

                  {/* Add more submenu items as needed */}
                </ul>
              </li>

              <div className="nav-btn-login">
                <a href="Login" className="btn-1">
                  Login
                </a>
              </div>
              <div className="nav-btn-sign">
                <a href="Sign-Up" className="btn-2">
                  Sign Up
                </a>
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="app_parent">
      {/* <AppHeader></AppHeader> */}
      <Qr></Qr>
      {/* <HowToSection></HowToSection> */}
      {/* <QRwhat></QRwhat> */}
      <Premium></Premium>
      <Footer></Footer>
    </div>
  );
}

export default Header;
