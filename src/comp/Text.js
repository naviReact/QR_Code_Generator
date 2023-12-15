import React, { useRef, useState } from 'react';
import '../comp/Text.css';
import QRious from 'qrious';
import { SetDownloadImageName } from '../modules/Qr';
import cancel_image from '../User Image/cancel_image.png';
import image from '../User Image/chain.png';
import Youtube_Image from '../User Image/youtube.png';
import Insta_Image from '../User Image/instagram (1).png';
import Email_Image from '../User Image/email logo.png';
import location_Image from '../User Image/location logo.png';
import whatsapp_Image from '../User Image/whatsapp logo.png';
import wifi_Image from '../User Image/wifi logo.png'

function TextQRCodeGenerator() {
  const textRef = useRef(null);
  const outputImageRef = useRef(null);
  const logoInputRef = useRef(null);
  var localLogoInputRef = useRef(null);
  const foregroundColorRef = useRef(null);
  const backgroundColorRef = useRef(null);


  const [error, setError] = useState('');

  const [fileAccordionOpen, setFileAccordionOpen] = useState(false);
  const [colorAccordionOpen, setColorAccordionOpen] = useState(false);

  const generateTextQRCode = () => {
    const text = textRef.current.value;
    const outputImage = outputImageRef.current;
    const logoInput = logoInputRef.current;
    const foregroundColor = foregroundColorRef.current.value;
    const backgroundColor = backgroundColorRef.current.value;
    const qr_output = document.querySelector('.qu_div_image_generated');

    if (!text) {
      setError('Please enter a Text.');
      return;
    }

    if (!qr_output) {
      setError('QR code output element not found.');
      return;
    }

    // Clear previous errors
    setError('');

    if (text) {


      const qr = new QRious({
        element: qr_output,
        value: text,
        size: 250,
        foreground: foregroundColor,
        background: backgroundColor,


      });

      // Handle logo addition
      if (logoInput?.files?.length > 0 || localLogoInputRef) {
        const logoFile = logoInput.files[0]  || localLogoInputRef;
        const reader = new FileReader();

        // reader.onload = function (e) {
        //   const logoImage = new Image();
        //   logoImage.src = e.target.result;

          const handleLogoLoad = (logoImage) => {
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


          if (typeof logoFile === "string") {
            // Assuming logoFile is a string URL
            const logoImage = new Image();
            logoImage.src = logoFile;
            logoImage.onload = () => handleLogoLoad(logoImage);
          } else {
            // Assuming logoFile is a File or Blob
            reader.onload = function (e) {
              const logoImage = new Image();
              logoImage.src = e.target.result;
              logoImage.onload = () => handleLogoLoad(logoImage);
            };

            // reader.readAsDataURL(logoFile);
        
            
          }
        };

        

      SetDownloadImageName("text");
    }
    
  };



  const toggleFileAccordion = () => {
    setFileAccordionOpen(!fileAccordionOpen);
  };

  const toggleColorAccordion = () => {
    setColorAccordionOpen(!colorAccordionOpen);
  };

  const SetLocalImage = (image) => {
    // logoInputRef = null;
    localLogoInputRef = image;
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{ marginRight: '12rem', marginTop: '0.78rem', }}>Text QR Code Generator</h2>
      <label htmlFor="text">Text:</label>
      <input
        type="text"
        id="text"
        placeholder="Write your text here"
        ref={textRef}
      />
      {error && <div className="error-message" style={{ color: 'red', }}>{error}</div>}
      <div className='test_acc'>


        <div className={`accordion ${fileAccordionOpen ? 'open' : ''}`}>
          <div className="accordion-header" onClick={toggleFileAccordion}>
            <span ><i className={'far fa-image'}></i> Logo</span>
            <i className={`fa ${fileAccordionOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </div>
          <div className="accordion-content">
            <span>Or choose here logo</span>
            <div className='grid-container'>

              <div className='box-child' onClick={() => SetLocalImage(cancel_image)}><img src={cancel_image}></img></div>
              <div className='box-child' onClick={() => SetLocalImage(image)}><img src={image}></img></div>
              <div className='box-child' onClick={() => SetLocalImage(Youtube_Image)}><img src={Youtube_Image}></img></div>
              <div className='box-child' onClick={() => SetLocalImage(Email_Image)}><img src={Email_Image}></img></div>
              <div className='box-child' onClick={() => SetLocalImage(location_Image)}><img src={location_Image}></img></div>
              <div className='box-child' onClick={() => SetLocalImage(whatsapp_Image)}><img src={whatsapp_Image}></img></div>
              <div className='box-child' onClick={() => SetLocalImage(wifi_Image)}><img src={wifi_Image}></img></div>
              <div className='box-child' onClick={() => SetLocalImage(Insta_Image)}><img src={Insta_Image}></img></div>

            </div>
            <div><img src=''></img></div>
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

      {/* <label htmlFor="logoInput">Choose Logo:</label>
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
      /> */}

      <button onClick={generateTextQRCode} className='generate_qr'><i className='fa fa-plus' style={{ marginRight: '0.78rem', fontWeight: '900', }}></i>Generate QR Code</button>

    </div>
  );
}

export default TextQRCodeGenerator;

