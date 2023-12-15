import React from "react";
import "./Premium.css";
import imageSrc from "../Images/undraw_Stripe_payments_re_chlm (1).png";

function Premium() {
  return (
    <div className="premium-parent">
      <div className="child-container">
        <div className="title-section">
          <div className="title-text">Get more with</div>
          <div className="title-text">Premium</div>
          <div className="title-description">
            Complete QR faster with batch file processing. Convert scanned
            documents with OCR. E-sign your business agreements.
          </div>
          <div className="premium-button-parent">
            Get Premium
          </div>
        </div>
        <div className="image-section">
          <img
            src={imageSrc}
            alt="Get more with Premium"
            className="premium-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Premium;
