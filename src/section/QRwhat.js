import React from "react";
import '../section/QRwhat.css';

import group from '../Images/Group.svg';


const QRwhat = () => {
    return (
        <section className="Whats">
            <div className="container">
                <div className="row">
                    {/* Left side (container) */}
                    <div className="col-md-6">
                        <div>
                            <h2>What is QR code</h2>
                            <p>
                            QR code, the Quick Response code, is a type of barcode that stores information in a series of pixels. The online information stored can be accessed using a smartphone’s camera. The ease of usage makes the QR code most sought after for accessing information instantly. 
                            </p>
                        </div>

                        {/* Get Premium Button (aligned to the left) */}
                        
                    </div>

                    {/* Right side (image) */}
                    <div className="col-md-5">
                        <img
                            src={group}
                            alt="Get more with Premium"
                            className="whatsQR"
                        />
                    </div>
                </div>

                {/* <h1>What is QR code</h1>
               <p>QR code, the Quick Response code, is a type of barcode that stores information in a series of pixels. The online information stored can be accessed using a smartphone’s camera. The ease of usage makes the QR code most sought after for accessing information instantly.</p> */}
            </div>
        </section>
    )
}

export default QRwhat;