



import React from 'react';
import './Premium.css';
import imageSrc from '../Images/undraw_Stripe_payments_re_chlm (1).png';

function Premium() {
  return (
    <section className="premium-section">
      <div className="container">
        <div className="row">
          {/* Left side (container) */}
          <div className="col-md-6">
            <div>
              <h2>Get more with Premium</h2>
              <p>
                Complete QR faster with batch file processing. Convert
                scanned documents with OCR. E-sign your business agreements.
              </p>
            </div>
            
            {/* Get Premium Button (aligned to the left) */}
            <div>
              <a href="##" className="btn btn-primary">
                Get Premium
              </a>
            </div>
          </div>

          {/* Right side (image) */}
          <div className="col-md-5">
            <img
              src={imageSrc}
              alt="Get more with Premium"
              className="premium-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Premium;




