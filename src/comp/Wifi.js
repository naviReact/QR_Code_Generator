import React, { useRef, useState } from 'react';
import QRious from 'qrious';
import { SetDownloadImageName } from '../modules/Qr';
import cancel_image from '../User Image/cancel_image.png';
import image from '../User Image/chain.png';
import Youtube_Image from '../User Image/youtube.png';
import Insta_Image from '../User Image/instagram (1).png';
import Email_Image from '../User Image/email logo.png';
import location_Image from '../User Image/location logo.png';
import whatsapp_Image from '../User Image/whatsapp logo.png';
import wifi_Image from '../User Image/wifi logo.png';


function WifiQRCodeGenerator() {
  const ssidRef = useRef(null);
  const passwordRef = useRef(null);
  const securityTypeRef = useRef(null);
  
  const logoInputRef = useRef(null);
  const foregroundColorRef = useRef(null);
  const backgroundColorRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [fileAccordionOpen, setFileAccordionOpen] = useState(false);
  const [colorAccordionOpen, setColorAccordionOpen] = useState(false);

  const generateWifiQRCode = () => {
    const ssid = ssidRef.current.value;
    const password = passwordRef.current.value;
    const securityType = securityTypeRef.current.value;
    
    const logoInput = logoInputRef.current;
    const foregroundColor = foregroundColorRef.current.value;
    const backgroundColor = backgroundColorRef.current.value;
    const qr_output = document.querySelector('.qu_div_image_generated');


    if (!ssid) {
      setError('Please enter a Input field.');
      return;
    }

    if (!qr_output) {
      setError('QR code output element not found.');
      return;
    }

    // Clear previous errors
    setError('');

    if (ssid) {
      // Construct the WiFi network information
      const wifiData = `WIFI:T:${securityType};S:${ssid};P:${password};;`;

      const qr_output = document.querySelector('.qu_div_image_generated');

      const qr = new QRious({
        element: qr_output,
        value: wifiData,
        size: 250,
        foreground: foregroundColor,
        background: backgroundColor,
      });

      // Handle logo addition
      if (logoInput.files.length > 0) {
        const logoFile = logoInput.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
          const logoImage = new Image();
          logoImage.src = e.target.result;

          logoImage.onload = function () {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // Calculate the padding size and background color
            const padding = 10;
            const bgColor = backgroundColor;

            // Draw the QR code onto the canvas
            canvas.width = 250 + 2 * padding;
            canvas.height = 250 + 2 * padding;

            // Fill the canvas with the background color
            context.fillStyle = bgColor;
            context.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the QR code onto the canvas with padding
            context.drawImage(qr_output, padding, padding, 250, 250);

            const logoSize = canvas.width * 0.2;
            const x = (canvas.width - logoSize) / 2;
            const y = (canvas.height - logoSize) / 2;

            context.drawImage(logoImage, x, y, logoSize, logoSize);

            qr_output.src = canvas.toDataURL();
          };
        };

        // reader.readAsDataURL(logoFile);
      }

      SetDownloadImageName("wifi");
    }
  };

  const toggleFileAccordion = () => {
    setFileAccordionOpen(!fileAccordionOpen);
  };

  const toggleColorAccordion = () => {
    setColorAccordionOpen(!colorAccordionOpen);
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{marginRight: '16.50rem', marginTop: '0.78rem',}}>WiFi QR Code Generator</h2>
      <label htmlFor="ssid">SSID (Network Name):</label>
      <input
        type="text"
        id="ssid"
        placeholder="Enter SSID"
        ref={ssidRef}
        required
      />
      {error && <div className="error-message" style={{ color: 'red', }}>{error}</div>}


      <label htmlFor="password">Password:</label>
      <div className="password-input" >
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="Enter Password"
          ref={passwordRef}
          required
          style={{width: '537px', height: '50px',borderRadius: '8px', padding: '13.106px 12.006px 13.096px 11.996px', border: '1px solid #ccc',}}
        />
        {error && <div className="error-message" style={{ color: 'red', }}>{error}</div>}

        <button 
        style={{padding: '12px 25px', marginLeft : '1rem',}}
          className="show-hide-button"
          onClick={togglePasswordVisibility}
        >
        <i className='fa fa-eye-slash'></i>
        </button>
      </div>

      <label htmlFor="securityType">Security Type:</label>
      <select id="securityType" ref={securityTypeRef} style={{width: '537px', height: '50px',borderRadius: '8px', padding: '13.106px 12.006px 13.096px 11.996px', border: '1px solid #ccc',}}>
        <option value="WEP">WEP</option>
        <option value="WPA">WPA</option>
        <option value="nopass">Open (No Password)</option>
      </select>



      <div className='test_acc'>

    
      <div className={`accordion ${fileAccordionOpen ? 'open' : ''}`}>
        <div className="accordion-header" onClick={toggleFileAccordion}>
          <span ><i className={'far fa-image'}></i> Logo</span>
          <i className={`fa ${fileAccordionOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </div>
        <div className="accordion-content">
          <span>Or choose here logo</span>
          <div className='grid-container'>

            <div className='box-child'><img src={cancel_image}></img></div>
            <div className='box-child'><img src={image}></img></div>
            <div className='box-child'><img src={Youtube_Image}></img></div>
            <div className='box-child'><img src={Email_Image}></img></div>
            <div className='box-child'><img src={location_Image}></img></div>
            <div className='box-child'><img src={whatsapp_Image}></img></div>
            <div className='box-child'><img src={wifi_Image}></img></div>
            <div className='box-child'><img src={Insta_Image}></img></div>
            
          </div>
          <div></div>
          <label htmlFor="logoInput" className='choose-logo'>Choose Logo:</label>
          <input type="file" id="logoInput" ref={logoInputRef} />
        </div>
      </div>

      {/* Accordion for Color Section */}
      <div className={`accordion ${colorAccordionOpen ? 'open' : ''}`}>
        <div className="accordion-header" onClick={toggleColorAccordion}>
          <span><i className={'fa fa-cog'}></i>Color</span>
          <i className={`fa ${colorAccordionOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </div>
        <div className="accordion-content"> 
          <label htmlFor="foregroundColor">Foreground Color:</label>
          <input type="color" id="foregroundColor" defaultValue="#000000" ref={foregroundColorRef} />

          <label htmlFor="backgroundColor">Background Color:</label>
          <input type="color" id="backgroundColor" defaultValue="#ffffff" ref={backgroundColorRef} />
        </div>
      </div>
    </div>

      

      <button onClick={generateWifiQRCode} className='generate_qr'><i className='fa fa-plus' style={{marginRight: '0.78rem', fontWeight: '900',}}></i> Generate QR Code</button>
      
    </div>
  );
}

export default WifiQRCodeGenerator;
