import React, { useRef , useState} from 'react';
import QRious from 'qrious';
import { SetDownloadImageName } from '../modules/Qr';
import cancel_image from '../User Image/cancel_image.png';
import image from '../User Image/06-vcard.png';

function VCardQRCodeGenerator() {
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const companyRef = useRef(null);
  const websiteRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const postalCodeRef = useRef(null);
  const countryRef = useRef(null);
  const logoInputRef = useRef(null);
  const foregroundColorRef = useRef(null);
  const backgroundColorRef = useRef(null);

  const [fileAccordionOpen, setFileAccordionOpen] = useState(false);
  const [colorAccordionOpen, setColorAccordionOpen] = useState(false);

  const generateVCardQRCode = () => {
    const name = nameRef.current.value;
    const lastName = lastNameRef.current.value;
    const phone = phoneRef.current.value;
    const email = emailRef.current.value;
    const company = companyRef.current.value;
    const website = websiteRef.current.value;
    const address = addressRef.current.value;
    const city = cityRef.current.value;
    const postalCode = postalCodeRef.current.value;
    const country = countryRef.current.value;

    // Construct the VCard data
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${name};;;
FN:${name} ${lastName}
ORG:${company}
TEL:${phone}
EMAIL:${email}
URL:${website}
ADR:;;${address};${city};;${postalCode};${country}
END:VCARD`;

    const qr_output = document.querySelector('.qu_div_image_generated');
    const qr = new QRious({
      element: qr_output,
      value: vCardData,
      size: 250,
      foreground: foregroundColorRef.current.value,
      background: backgroundColorRef.current.value,
    });

    // Handle logo addition
    if (logoInputRef.current.files.length > 0) {
      const logoFile = logoInputRef.current.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const logoImage = new Image();
        logoImage.src = e.target.result;

        logoImage.onload = function () {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const padding = 10;
          const bgColor = backgroundColorRef.current.value;

          canvas.width = 250 + 2 * padding;
          canvas.height = 250 + 2 * padding;
          context.fillStyle = bgColor;
          context.fillRect(0, 0, canvas.width, canvas.height);
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

    SetDownloadImageName("vcard");
  };
  const toggleFileAccordion = () => {
    setFileAccordionOpen(!fileAccordionOpen);
  };

  const toggleColorAccordion = () => {
    setColorAccordionOpen(!colorAccordionOpen);
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{marginRight: '11.50rem', marginTop: '0.78rem',}}>VCard QR Code Generator</h2>
      <label htmlFor="name">First Name:</label>
      <input type="text" id="name" ref={nameRef} placeholder="Name" required/>

      <label htmlFor="lastName">Last Name:</label>
      <input type="text" id="lastName" ref={lastNameRef} placeholder="Last Name"required />

      <label htmlFor="email">Email:</label>
      <input type="text" id="email" ref={emailRef} placeholder="your@example.com" required/>

      <label htmlFor="phone">Phone:</label>
      <input type="text" id="phone" ref={phoneRef} placeholder="Phone" required/>

      <label htmlFor="company">Company:</label>
      <input type="text" id="company" ref={companyRef} placeholder="Company" required/>

      <label htmlFor="website">Website (URL):</label>
      <input type="text" id="website" ref={websiteRef} placeholder="https://" />

      <label htmlFor="address">Address:</label>
      <input type="text" id="address" ref={addressRef} placeholder="" required/>

      <label htmlFor="city">City:</label>
      <input type="text" id="city" ref={cityRef} placeholder="" />

      <label htmlFor="postalCode">Postal Code:</label>
      <input type="text" id="postalCode" ref={postalCodeRef} placeholder="" />

      <label htmlFor="country">Country:</label>
      <input type="text" id="country" ref={countryRef} placeholder="" />
      


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



      

      



      {/* <label htmlFor="logoInput">Choose Logo:</label>
      <input type="file" id="logoInput" ref={logoInputRef} />

      <label htmlFor="foregroundColor">Foreground Color:</label>
      <input type="color" id="foregroundColor" defaultValue="#000000" ref={foregroundColorRef} />

      <label htmlFor="backgroundColor">Background Color:</label>
      <input type="color" id="backgroundColor" defaultValue="#ffffff" ref={backgroundColorRef} /> */}

      <button onClick={generateVCardQRCode} className='generate_qr'><i className='fa fa-plus' style={{marginRight: '0.78rem', fontWeight:'900',}}></i>Generate QR Code</button>
      
    </div>
  );
}

export default VCardQRCodeGenerator;
