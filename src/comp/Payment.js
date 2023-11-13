import React, { useRef, useState } from 'react';
import QRious from 'qrious';
import { SetDownloadImageName } from '../modules/Qr';

function PaymentQRCodeGenerator() {
  const merchantNameRef = useRef(null);
  const paymentTypeRef = useRef(null);
  const amountRef = useRef(null);
  const outputImageRef = useRef(null);
  const logoInputRef = useRef(null);
  const foregroundColorRef = useRef(null);
  const backgroundColorRef = useRef(null);

  const [selectedPaymentType, setSelectedPaymentType] = useState('upi');

  const generatePaymentQRCode = () => {
    const merchantName = merchantNameRef.current.value;
    const paymentType = paymentTypeRef.current.value;
    const amount = amountRef.current.value; // Added input for transaction amount
    const outputImage = outputImageRef.current;
    const logoInput = logoInputRef.current;
    const foregroundColor = foregroundColorRef.current.value;
    const backgroundColor = backgroundColorRef.current.value;

    if (merchantName && amount) {
      let paymentData = '';

      if (selectedPaymentType === 'upi') {
        paymentData = `upi://${paymentType}?name=${merchantName}&amount=${amount}`;
      } else if (selectedPaymentType === 'bank') {
        paymentData = `bank:${paymentType}?name=${merchantName}&amount=${amount}`;
      }

      const qr_output = document.querySelector('.qu_div_image_generated');

      const qr = new QRious({
        element: qr_output,
        value: paymentData,
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

      SetDownloadImageName("payment");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{marginRight: '11.50rem', marginTop: '0.78rem',}}>Payment QR Code Generator</h2>
      <label htmlFor="merchantName">Merchant Name:</label>
      <input
        type="text"
        id="merchantName"
        placeholder="Enter Merchant Name"
        ref={merchantNameRef}
      />

      <label htmlFor="paymentType">Payment Address Type:</label>
      <select
        id="paymentType"
        ref={paymentTypeRef}
        value={selectedPaymentType}
        onChange={(e) => setSelectedPaymentType(e.target.value)}
      >
        <option value="upi">UPI Address</option>
        <option value="bank">Bank Account Number</option>
      </select>

      {selectedPaymentType === 'upi' && (
        <div>
          <label htmlFor="upiAddress">UPI Address:</label>
          <input
            type="text"
            id="upiAddress"
            placeholder="Enter UPI Address"
            ref={paymentTypeRef}
          />
        </div>
      )}

      {selectedPaymentType === 'bank' && (
        <div>
          <label htmlFor="bankAccount">Bank Account Number:</label>
          <input
            type="text"
            id="bankAccount"
            placeholder="Enter Bank Account Number"
            ref={paymentTypeRef}
          />
        </div>
      )}

      <label htmlFor="amount">Transaction Amount (INR):</label>
      <input
        type="text"
        id="amount"
        placeholder="Enter Amount"
        ref={amountRef}
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

      <button onClick={generatePaymentQRCode}><i className='fa fa-plus' style={{marginRight: '0.78rem', fontWeight:'900',}}></i>Generate QR Code</button>
    </div>
  );
}

export default PaymentQRCodeGenerator;
