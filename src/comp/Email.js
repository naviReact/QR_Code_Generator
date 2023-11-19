import React, { useRef , useState} from 'react';
import QRious from 'qrious';
import { SetDownloadImageName } from '../modules/Qr';
import './Email.css'; // You can create a CSS file for styling
import cancel_image from '../User Image/cancel_image.png';
import image from '../User Image/links image.png';
import Youtube_Image from '../User Image/youtube.png';
import Insta_Image from '../User Image/instagram (1).png';
import Email_Image from '../User Image/email logo.png';
import location_Image from '../User Image/location logo.png';
import whatsapp_Image from '../User Image/whatsapp logo.png';
import wifi_Image from '../User Image/wifi logo.png';

function EmailQRCodeGenerator() {
  const emailRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);
  const logoInputRef = useRef(null);
  const foregroundColorRef = useRef(null);
  const backgroundColorRef = useRef(null);
  const outputImageRef = useRef(null);

  const [fileAccordionOpen, setFileAccordionOpen] = useState(false);
  const [colorAccordionOpen, setColorAccordionOpen] = useState(false);

  const generateEmailQRCode = () => {
    const email = emailRef.current.value;
    const subject = subjectRef.current.value;
    const message = messageRef.current.value;
    const outputImage = outputImageRef.current;
    const logoInput = logoInputRef.current;
    const foregroundColor = foregroundColorRef.current.value;
    const backgroundColor = backgroundColorRef.current.value;

    if (email) {
      // Construct the email data with subject and message
      const emailData = `mailto:${email}?subject=${subject || ''}&body=${message || ''}`;

      const qr_output = document.querySelector('.qu_div_image_generated');

      const qr = new QRious({
        element: qr_output,
        value: emailData,
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

      SetDownloadImageName("email");
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
      <h2 className="text-center" style={{marginRight: '20.50rem', marginTop: '0.78rem', fontWeight: '400',}}>Email QR Code </h2>
      <label htmlFor="email">Email Address:</label>
      <input
        type="email"
        id="email"
        placeholder="Email Address"
        ref={emailRef}
      />

      <label htmlFor="subject">Email Subject:</label>
      <input
        type="text"
        id="subject"
        placeholder="Subject"
        ref={subjectRef}
      />

      <label htmlFor="message">Email Message:</label>
      <textarea
        id="message"
        placeholder="Enter your message"
        ref={messageRef}
      />

<div className='test_acc'>

    
<div className={`accordion ${fileAccordionOpen ? 'open' : ''}`}>
  <div className="accordion-header" onClick={toggleFileAccordion}>
    <span ><i className={'far fa-image'}></i> Logo</span>
    <i className={`fa ${fileAccordionOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
  </div>
  <div className="accordion-content">
    <span>Or choose here logo</span>
    <div className='grid-container'>

      <div className='box-child'><img src={cancel_image} alt='cancel-image'></img></div>
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

      <button onClick={generateEmailQRCode}><i className='fa fa-plus' style={{marginRight: '0.78rem',fontWeight:'1000',}}></i>Generate QR Code</button>
      <div id="outputContainer">
        {/* Display the generated QR code image here */}
        {/* <div id="outputImageContainer">
          <img
            id="outputImage"
            alt="QR Code"
            ref={outputImageRef}
          />
        </div> */}
      </div>
    </div>
  );
}

export default EmailQRCodeGenerator;
