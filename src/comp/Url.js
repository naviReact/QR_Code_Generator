
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





import React, { useRef, useState } from 'react';
import QRious from 'qrious';
import { SetDownloadImageName } from '../modules/Qr';
import '../comp/Url.css'; // Make sure to provide the correct path
import image from '../User Image/06-vcard.png';

function QRCodeGenerator() {
  const urlRef = useRef(null);
  const logoInputRef = useRef(null);
  const foregroundColorRef = useRef(null);
  const backgroundColorRef = useRef(null);
  

  const [fileAccordionOpen, setFileAccordionOpen] = useState(false);
  const [colorAccordionOpen, setColorAccordionOpen] = useState(false);
  const generateURLQRCode = () => {
    const url = urlRef.current.value;
    // const outputImage = outputImageRef.current;
    const logoInput = logoInputRef.current;
    const foregroundColor = foregroundColorRef.current.value;
    const backgroundColor = backgroundColorRef.current.value;
    // outputImage.src = '';
    const qr_output = document.querySelector('.qu_div_image_generated');

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
            const bgColor = 'white';

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

            // const downloadButton = document.getElementById('downloadButton');
            // downloadButton.style.display = 'inline-block';
            SetDownloadImageName("url");
          };
        };

        reader.readAsDataURL(logoFile);
      }
    }
  };
  

  const toggleFileAccordion = () => {
    setFileAccordionOpen(!fileAccordionOpen);
  };

  const toggleColorAccordion = () => {
    setColorAccordionOpen(!colorAccordionOpen);
  };

  // const downloadQRCode = () => {
  //   const a = document.createElement('a');
  //   const qr_output = document.querySelector('.qu_div_image_generated');
  //   a.href = qr_output.src;
  //   a.download = 'url_qr_code.png';
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // };

  return (
    <div className="container">
      <h2 className="text-center" style={{ marginRight: '11.50rem', marginTop: '0.78rem' }}>
        URL QR Code Generator
      </h2>
      <label htmlFor="url">Submit URL:</label>
      <input type="text" id="url" placeholder="https://" ref={urlRef} required />

      {/* Accordion for Choose Logo */}

    <div className='test_acc'>

    
      <div className={`accordion ${fileAccordionOpen ? 'open' : ''}`}>
        <div className="accordion-header" onClick={toggleFileAccordion}>
          <span ><i className={'far fa-image'}></i> Logo</span>
          <i className={`fa ${fileAccordionOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </div>
        <div className="accordion-content">
          <span>Or choose here logo</span>
          <div className='grid-container'>

            <div className='box-child'><img src={image}></img></div>
            <div className='box-child'><img src={image}></img></div>
            <div className='box-child'><img src={image}></img></div>
            <div className='box-child'><img src={image}></img></div>
            <div className='box-child'><img src={image}></img></div>
            <div className='box-child'><img src={image}></img></div>
            <div className='box-child'><img src={image}></img></div>
            <div className='box-child'><img src={image}></img></div>
            
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


      <button onClick={generateURLQRCode} className="generate_qr">
        <i className="fa fa-plus" style={{ marginRight: '0.78rem', fontWeight: '900' }}></i>
        Generate QR Code
      </button>

      
    </div>
  );
}

export default QRCodeGenerator;
