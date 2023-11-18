// import React, { useRef, useState } from 'react';
// import QRious from 'qrious';

// function PdfQRCodeGenerator() {
//   const pdfFileRef = useRef(null);
//   const outputImageRef = useRef(null);
//   const logoInputRef = useRef(null);
//   const foregroundColorRef = useRef(null);
//   const backgroundColorRef = useRef(null);

//   const [downloadImageName, setDownloadImageName] = useState('pdf_qr_code.png');

//   const generatePdfQRCode = () => {
//     const pdfFile = pdfFileRef.current.files[0];
//     const outputImage = outputImageRef.current;
//     const logoInput = logoInputRef.current;
//     const foregroundColor = foregroundColorRef.current.value;
//     const backgroundColor = backgroundColorRef.current.value;

//     if (pdfFile) {
//       const qr_output = document.querySelector('.qu_div_image_generated');

//       const qr = new QRious({
//         element: qr_output,
//         value: `pdf:${pdfFile.name}`,
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
//             const bgColor = backgroundColor;

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
//           };
//         };

//         reader.readAsDataURL(logoFile);
//       }

//       setDownloadImageName('pdf_qr_code.png');
//     }
//   };

//   const downloadQRCode = () => {
//     const qrCanvas = document.querySelector('.qu_div_image_generated canvas');

//     if (qrCanvas) {
//       const link = document.createElement('a');
//       link.href = qrCanvas.toDataURL();
//       link.download = downloadImageName;
//       link.click();
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="text-center">PDF QR Code Generator</h2>
//       <label htmlFor="pdfFile">Upload PDF File:</label>
//       <input
//         type="file"
//         id="pdfFile"
//         ref={pdfFileRef}
//         accept=".pdf"
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

//       <button onClick={generatePdfQRCode}>Generate QR Code</button>
//       <button onClick={downloadQRCode}>Download QR Code</button>
//       <div id="outputContainer">
//         {/* Display the generated QR code image here */}
//         <div id="outputImageContainer">
//           <img
//             id="outputImage"
//             alt="QR Code"
//             ref={outputImageRef}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PdfQRCodeGenerator;
