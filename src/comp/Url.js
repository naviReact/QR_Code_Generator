// import '../comp/Url.css';
// import React, { useRef } from 'react';
// import QRious from 'qrious';
// import { SetDownloadImageName } from '../modules/Qr';

// function QRCodeGenerator() {
//   const urlRef = useRef(null);
//   const logoInputRef = useRef(null);
//   const foregroundColorRef = useRef(null);
//   const backgroundColorRef = useRef(null);

//   const generateURLQRCode = () => {
//     const url = urlRef.current.value;
//     // const outputImage = outputImageRef.current;
//     const logoInput = logoInputRef.current;
//     const foregroundColor = foregroundColorRef.current.value;
//     const backgroundColor = backgroundColorRef.current.value;
//     // outputImage.src = '';
//     const qr_output = document.querySelector('.qu_div_image_generated');

//     if (url && qr_output) {
//       const qr = new QRious({
//         element: qr_output,
//         value: url,
//         size: 250,
//         foreground: foregroundColor,
//         background: backgroundColor,
//       });

//       // Show the output section

//       // Handle logo addition
//       if (logoInput.files.length > 0) {
//         const logoFile = logoInput.files[0];
//         const reader = new FileReader();

//         reader.onload = function (e) {
//           const logoImage = new Image();
//           logoImage.src = e.target.result;

//           logoImage.onload = function () {
//             const canvas = document.createElement('canvas');
//             const context = canvas.getContext('2d');

//             // Calculate the padding size and background color
//             const padding = 10;
//             const bgColor = 'white';

//             // Draw the QR code onto the canvas
//             canvas.width = 250 + 2 * padding;
//             canvas.height = 250 + 2 * padding;

//             // Fill the canvas with the background color
//             context.fillStyle = bgColor;
//             context.fillRect(0, 0, canvas.width, canvas.height);

//             // Draw the QR code onto the canvas with padding
//             context.drawImage(qr_output, padding, padding, 250, 250);

//             const logoSize = canvas.width * 0.2;
//             const x = (canvas.width - logoSize) / 2;
//             const y = (canvas.height - logoSize) / 2;

//             context.drawImage(logoImage, x, y, logoSize, logoSize);

//             qr_output.src = canvas.toDataURL();

//             // const downloadButton = document.getElementById('downloadButton');
//             // downloadButton.style.display = 'inline-block';
//             SetDownloadImageName("url");
//           };
//         };

//         reader.readAsDataURL(logoFile);
//       }
//     }
//   };

//   // const downloadQRCode = () => {
//   //   const a = document.createElement('a');
//   //   const qr_output = document.querySelector('.qu_div_image_generated');
//   //   a.href = qr_output.src;
//   //   a.download = 'url_qr_code.png';
//   //   document.body.appendChild(a);
//   //   a.click();
//   //   document.body.removeChild(a);
//   // };

//   return (
//     <div className="container">
//       <h2 className="text-center" style={{marginRight: '11.50rem', marginTop: '0.78rem',}}>URL QR Code Generator</h2>
//       <label htmlFor="url">Submit URL:</label>
//       <input
//         type="text"
//         id="url"
//         placeholder="https://"
//         ref={urlRef}
//         required
//       />

//       <label htmlFor="logoInput">Choose Logo:</label>
//       <input
//         type="file"
//         id="logoInput"
//         ref={logoInputRef}
//       />

//       <label htmlFor="foregroundColor">Foreground Color:</label>
//       <input
//         type="color"
//         id="foregroundColor"
//         defaultValue="#000000"
//         ref={foregroundColorRef}
//       />

//       <label htmlFor="backgroundColor">Background Color:</label>
//       <input
//         type="color"
//         id="backgroundColor"
//         defaultValue="#ffffff"
//         ref={backgroundColorRef}
//       />

//       <button onClick={generateURLQRCode} className='generate_qr'> <i className='fa fa-plus' style={{marginRight: '0.78rem', fontWeight:'900',}}></i>Generate QR Code</button>
//       <div id="outputContainer">
//         {/* <div id="outputImageContainer">
//           <img
//             id="outputImage"
//             // src=""
//             // alt="QR Code"
//             ref={outputImageRef}
//           />
//         </div> */}

//       </div>
//     </div>
//   );
// }

// export default QRCodeGenerator;

  import React, { useRef, useState } from "react";
  import QRious from "qrious";
  import { SetDownloadImageName } from "../modules/Qr";
  import "../comp/Url.css"; // Make sure to provide the correct path
  import cancel_image from "../User Image/cancel_image.png";
  import image from "../User Image/chain.png";
  import Youtube_Image from "../User Image/youtube.png";
  import Insta_Image from "../User Image/06-vcard.png";
  import Email_Image from "../User Image/email logo.png";
  import location_Image from "../User Image/location logo.png";
  import whatsapp_Image from "../User Image/whatsapp logo.png";
  import wifi_Image from "../User Image/wifi logo.png";

  function QRCodeGenerator() {
    const urlRef = useRef(null);
    var logoInputRef = useRef(null);
    var localLogoInputRef = useRef(null);
    const foregroundColorRef = useRef(null);
    const backgroundColorRef = useRef(null);

    const [error, setError] = useState("");

    const [fileAccordionOpen, setFileAccordionOpen] = useState(false);
    const [colorAccordionOpen, setColorAccordionOpen] = useState(false);

    
    const generateURLQRCode = () => {
      const url = urlRef.current.value;
      var logoInput = logoInputRef?.current;
      const foregroundColor = foregroundColorRef.current.value;
      const backgroundColor = backgroundColorRef.current.value;

      const qr_output = document.querySelector(".qu_div_image_generated");

      //  Validation URL
      if (!url) {
        setError("Please enter a URL.");
        return;
      }

      if (!qr_output) {
        setError("QR code output element not found.");
        return;
      }

      // Clear previous errors
      setError("");

      if (url && qr_output) {
        const qr = new QRious({
          element: qr_output,
          value: url,
          size: 250,
          foreground: foregroundColor,
          background: backgroundColor,
        });

        // Show the output section
        // Handle logo addition
        if (logoInput?.files?.length > 0 || localLogoInputRef) {
          const logoFile = logoInput?.files?.[0] || localLogoInputRef;
          const reader = new FileReader();
        
          const handleLogoLoad = (logoImage) => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
        
            // Calculate the padding size and background color
            const padding = 10;
            const bgColor = "white";
        
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
        }

        SetDownloadImageName("Url");
        


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
        <h2
          className="text-center"
          style={{ marginRight: "11.50rem", marginTop: "0.78rem" }}
        >
          URL QR Code Generator
        </h2>
        <label htmlFor="url">Submit URL:</label>
        <input
          type="text"
          id="url"
          placeholder="https://"
          ref={urlRef}
          required
        />

        {error && (
          <div className="error-message" style={{ color: "red" }}>
            {error}
          </div>
        )}

        {/* Accordion for Choose Logo */}

        <div className="test_acc">
          <div className={`accordion ${fileAccordionOpen ? "open" : ""}`}>
            <div className="accordion-header" onClick={toggleFileAccordion}>
              <span>
                <i className={"far fa-image"}></i> Logo
              </span>
              <i
                className={`fa ${
                  fileAccordionOpen ? "fa-chevron-up" : "fa-chevron-down"
                }`}
              ></i>
            </div>
            <div className="accordion-content">
              <span>Or choose here logo</span>
              <div className="grid-container">
                <div
                  className="box-child"
                  onClick={() => SetLocalImage(cancel_image)}
                >
                  <img src={cancel_image} alt="cancel_image"></img>
                </div>
                <div className="box-child" onClick={() => SetLocalImage(image)}>
                  <img src={image} alt="link_image"></img>
                </div>
                <div
                  className="box-child"
                  onClick={() => SetLocalImage(Youtube_Image)}
                >
                  <img src={Youtube_Image} alt="Youtube_Image"></img>
                </div>
                <div
                  className="box-child"
                  onClick={() => SetLocalImage(Email_Image)}
                >
                  <img src={Email_Image} alt="Email_Image"></img>
                </div>
                <div
                  className="box-child"
                  onClick={() => SetLocalImage(location_Image)}
                >
                  <img src={location_Image} alt="location_Image"></img>
                </div>
                <div
                  className="box-child"
                  onClick={() => SetLocalImage(whatsapp_Image)}
                >
                  <img src={whatsapp_Image} alt="whatsapp_Image"></img>
                </div>
                <div
                  className="box-child"
                  onClick={() => SetLocalImage(wifi_Image)}
                >
                  <img src={wifi_Image} alt="wifi_Image"></img>
                </div>
                <div
                  className="box-child"
                  onClick={() => SetLocalImage(Insta_Image)}
                >
                  <img src={Insta_Image} alt="Insta_Image"></img>
                </div>
              </div>
              <div></div>
              <label htmlFor="logoInput" className="choose-logo">
                Choose Logo:
              </label>
              <input type="file" id="logoInput" ref={logoInputRef} />
            </div>
          </div>

          {/* Accordion for Color Section */}
          <div className={`accordion ${colorAccordionOpen ? "open" : ""}`}>
            <div className="accordion-header" onClick={toggleColorAccordion}>
              <span>
                <i className={"fa fa-cog"}></i>Color
              </span>
              <i
                className={`fa ${
                  colorAccordionOpen ? "fa-chevron-up" : "fa-chevron-down"
                }`}
              ></i>
            </div>
            <div className="accordion-content">
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
            </div>
          </div>
        </div>

        {/* {error && <div className="error-message">{error}</div>} */}

        <button onClick={generateURLQRCode} className="generate_qr">
          <i
            className="fa fa-plus"
            style={{ marginRight: "0.78rem", fontWeight: "900" }}
          ></i>
          Generate QR Code
        </button>
      </div>
    );
  }

  export default QRCodeGenerator;

// import React, { useRef, useState } from 'react';
// import QRious from 'qrious';
// import { SetDownloadImageName } from '../modules/Qr';
// import '../comp/Url.css';
// import cancel_image from '../User Image/cancel_image.png';
// import image from '../User Image/06-vcard.png';

// function QRCodeGenerator() {
//   const urlRef = useRef(null);
//   const logoInputRef = useRef(null);
//   const foregroundColorRef = useRef(null);
//   const backgroundColorRef = useRef(null);

//   const [error, setError] = useState('');

//   const [fileAccordionOpen, setFileAccordionOpen] = useState(false);
//   const [colorAccordionOpen, setColorAccordionOpen] = useState(false);

//   const generateURLQRCode = () => {
//     const url = urlRef.current.value;
//     const logoInput = logoInputRef.current;
//     const foregroundColor = foregroundColorRef.current.value;
//     const backgroundColor = backgroundColorRef.current.value;
//     const qr_output = document.querySelector('.qu_div_image_generated');

//     // Validation
//     if (!url) {
//       setError('Please enter a URL.');
//       return;
//     }

//     if (!qr_output) {
//       setError('QR code output element not found.');
//       return;
//     }

//     // Clear previous errors
//     setError('');

//     if (url && qr_output) {
//       const qr = new QRious({
//         element: qr_output,
//         value: url,
//         size: 250,
//         foreground: foregroundColor,
//         background: backgroundColor,
//       });

//       // Handle logo addition
//       if (logoInput.files.length > 0) {
//         const logoFile = logoInput.files[0];
//         const reader = new FileReader();

//         reader.onload = function (e) {
//           const logoImage = new Image();
//           logoImage.src = e.target.result;

//           logoImage.onload = function () {
//             const canvas = document.createElement('canvas');
//             const context = canvas.getContext('2d');

//             // Calculate the padding size and background color
//             const padding = 10;
//             const bgColor = 'white';

//             // Draw the QR code onto the canvas
//             canvas.width = 250 + 2 * padding;
//             canvas.height = 250 + 2 * padding;

//             // Fill the canvas with the background color
//             context.fillStyle = bgColor;
//             context.fillRect(0, 0, canvas.width, canvas.height);

//             // Draw the QR code onto the canvas with padding
//             context.drawImage(qr_output, padding, padding, 250, 250);

//             const logoSize = canvas.width * 0.2;
//             const x = (canvas.width - logoSize) / 2;
//             const y = (canvas.height - logoSize) / 2;

//             context.drawImage(logoImage, x, y, logoSize, logoSize);

//             qr_output.src = canvas.toDataURL();

//             SetDownloadImageName('url');
//           };
//         };

//         reader.readAsDataURL(logoFile);
//       }
//     }
//   };

//   const toggleFileAccordion = () => {
//         setFileAccordionOpen(!fileAccordionOpen);
//       };

//       const toggleColorAccordion = () => {
//         setColorAccordionOpen(!colorAccordionOpen);
//       };

//   return (
//     <div className="container">
//       <h2 className="text-center" style={{ marginRight: '11.50rem', marginTop: '0.78rem' }}>
//         URL QR Code Generator
//       </h2>
//       <label htmlFor="url">Submit URL:</label>
//       <input type="text" id="url" placeholder="https://" ref={urlRef} required />

//       {/* Accordion for Choose Logo */}
//       <div className="test_acc">
//         <div className={`accordion ${fileAccordionOpen ? 'open' : ''}`}>
//           <div className="accordion-header" onClick={toggleFileAccordion}>
//             <span>
//               <i className={'far fa-image'}></i> Logo
//             </span>
//             <i className={`fa ${fileAccordionOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
//           </div>
//           <div className="accordion-content">
//             <span>Or choose here logo</span>
//             <div className="grid-container">
//               {/* ... */}
//             </div>
//             <div>
//               <img src="" alt="Selected Logo" />
//             </div>
//             <label htmlFor="logoInput" className="choose-logo">
//               Choose Logo:
//             </label>
//             <input type="file" id="logoInput" ref={logoInputRef} />
//           </div>
//         </div>

//         {/* Accordion for Color Section */}
//         <div className={`accordion ${colorAccordionOpen ? 'open' : ''}`}>
//           <div className="accordion-header" onClick={toggleColorAccordion}>
//             <span>
//               <i className={'fa fa-cog'}></i>Color
//             </span>
//             <i className={`fa ${colorAccordionOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
//           </div>
//           <div className="accordion-content">
//             <label htmlFor="foregroundColor">Foreground Color:</label>
//             <input type="color" id="foregroundColor" defaultValue="#000000" ref={foregroundColorRef} />

//             <label htmlFor="backgroundColor">Background Color:</label>
//             <input type="color" id="backgroundColor" defaultValue="#ffffff" ref={backgroundColorRef} />
//           </div>
//         </div>
//       </div>

//       {/* Display error message */}
//       {error && <div className="error-message">{error}</div>}

//       <button onClick={generateURLQRCode} className="generate_qr">
//         <i className="fa fa-plus" style={{ marginRight: '0.78rem', fontWeight: '900' }}></i>
//         Generate QR Code
//       </button>
//     </div>
//   );
// }

// export default QRCodeGenerator;
