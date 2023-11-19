import React from 'react';
import '../section/HowQR.css'
import click from '../Images/click (1).png';
import equalizer from '../Images/equalizer.png';
import download_image from '../Images/download (3).png';
import click_1 from '../Images/circle-1.png';
import click_2 from '../Images/circle-2 (1).png';
import click_3 from '../Images/circle-3 (2).png';

const HowToSection = () => {
  return (
    <section className="How-to">
    <h1 className='' style={{display: 'flex', textAlign: 'center', justifyContent: 'center' , alignItems: 'center', marginBottom: '2rem', fontWeight: '600', lineHeight: '1.5',}}>How to generate the QR code.</h1>

    <h3>Simple 3 Step process to guide you through!</h3>
      <div
        className="grid-template-columns"
      >
        <div className="container">
          <img
            src={click}
            alt=""
            
          />
          <div style={{ fontWeight: 600, textAlign: 'center' }}>Choose Type</div>
          <div className="sub" style={{ textAlign: 'center' }}>
            Be it URL, Email, Phone, vCard, App, or WIFI. You may choose the required to create QR codes.
          </div>
          <img
            src={click_1}
            className="counting"
            alt="one"
            
          />
        </div>

        <div className="container">
          <img
            src={equalizer}
            alt="detail"
            
          />
          <div style={{ fontWeight: 600, textAlign: 'center' }}>Drop the details</div>
          <div className="sub" style={{ textAlign: 'center' }}>
            Enter the data required in the Input fields. QR code is ready to be generated!
          </div>
          <img
            src={click_2}
            alt="second"
            className="counting"
            
          />
        </div>

        <div className="container">
          <img
            src={download_image}
            alt="Download"
            
          />
          <div style={{ fontWeight: 600, textAlign: 'center' }}>Download Qr code</div>
          <div className="sub" style={{ textAlign: 'center' }}>
            Generated QR codes will be available in PNG formats. Download the QR code.
          </div>
          <img
            src={click_3}
            alt="third"
            className="counting"
           
          />
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
