import React, { useRef, useState } from 'react';
import QRious from 'qrious';
import { SetDownloadImageName } from '../modules/Qr';

// Import Font Awesome icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function WifiQRCodeGenerator() {
  const ssidRef = useRef(null);
  const passwordRef = useRef(null);
  const securityTypeRef = useRef(null);
  
  const logoInputRef = useRef(null);
  const foregroundColorRef = useRef(null);
  const backgroundColorRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const generateWifiQRCode = () => {
    const ssid = ssidRef.current.value;
    const password = passwordRef.current.value;
    const securityType = securityTypeRef.current.value;
    
    const logoInput = logoInputRef.current;
    const foregroundColor = foregroundColorRef.current.value;
    const backgroundColor = backgroundColorRef.current.value;

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

        reader.readAsDataURL(logoFile);
      }

      SetDownloadImageName("wifi");
    }
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
        <button
        style={{padding: '12px 25px', marginLeft : '1rem',}}
          className="show-hide-button"
          onClick={togglePasswordVisibility}
        >
          {/* <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /> */}
        </button>
      </div>

      <label htmlFor="securityType">Security Type:</label>
      <select id="securityType" ref={securityTypeRef} style={{width: '537px', height: '50px',borderRadius: '8px', padding: '13.106px 12.006px 13.096px 11.996px', border: '1px solid #ccc',}}>
        <option value="WEP">WEP</option>
        <option value="WPA">WPA</option>
        <option value="nopass">Open (No Password)</option>
      </select>

      <label htmlFor="logoInput">Choose Logo:</label>
      <input
        type="file"
        id="logoInput"
        ref={logoInputRef}
      />

      <label htmlFor="foregroundColor">Foreground Color:</label>
      <input
        type="color"
        id="foregroundColor"
        defaultValue="#000000"
        ref={foregroundColorRef}
      />

      <label htmlFor="backgroundColor">Background Color:</label>
      <input
        type="color"
        id="backgroundColor"
        defaultValue="#ffffff"
        ref={backgroundColorRef}
      />

      <button onClick={generateWifiQRCode} className='generate_qr'>Generate QR Code</button>
      
    </div>
  );
}

export default WifiQRCodeGenerator;
