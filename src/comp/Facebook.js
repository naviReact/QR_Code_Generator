import '../comp/Facebook.css'; // You can create a CSS file for styling
import React, { useRef } from 'react';
import QRious from 'qrious';
import { SetDownloadImageName } from '../modules/Qr';

function FacebookQRCodeGenerator() {
  const profileLinkRef = useRef(null);
  const outputImageRef = useRef(null);
  const logoInputRef = useRef(null);
  const foregroundColorRef = useRef(null);
  const backgroundColorRef = useRef(null);

  const generateFacebookQRCode = () => {
    const profileLink = profileLinkRef.current.value;
    const outputImage = outputImageRef.current;
    const logoInput = logoInputRef.current;
    const foregroundColor = foregroundColorRef.current.value;
    const backgroundColor = backgroundColorRef.current.value;

    if (profileLink) {
      const facebookUrl = profileLink;

      const qr_output = document.querySelector('.qu_div_image_generated');

      const qr = new QRious({
        element: qr_output,
        value: facebookUrl,
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

      SetDownloadImageName("facebook");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{marginRight: '11.50rem', marginTop: '0.78rem',}}>Facebook QR Code Generator</h2>
      <label htmlFor="profileLink">Facebook Profile Link:</label>
      <input
        type="text"
        id="profileLink"
        placeholder="Enter Facebook profile link"
        ref={profileLinkRef}
      />

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

      <button onClick={generateFacebookQRCode}><i className='fa fa-plus' style={{marginRight: '0.78rem', fontWeight:'900',}}></i>Generate QR Code</button>
      
    </div>
  );
}

export default FacebookQRCodeGenerator;
