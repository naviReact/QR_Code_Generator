import { React, useEffect, useState } from "react";
import "./Qr.css";
import Image from "../Images/images.png";
import ModSms from "../comp/Sms";
import ModText from "../comp/Text";
import ModUrl from "../comp/Url";
import ModVcard from "../comp/Vcard";
import ModEmail from "../comp/Email";
import ModAppStore from "../comp/AppStore";
import ModYoutube from "../comp/Youtube";
import ModInsta from "../comp/Insta";
import ModFacebook from "../comp/Facebook";
import ModWifi from "../comp/Wifi";
import ModPayment from "../comp/Payment";
// import ModPdf from '../comp/Pdf';

const menuItems = [
  { name: "Url", icon: "#", component: <ModUrl /> },
  { name: "Text", icon: "#", component: <ModText /> },
  { name: "Sms", icon: "#", component: <ModSms /> },
  { name: "V-Card", icon: "#", component: <ModVcard /> },
  { name: "Email", icon: "#", component: <ModEmail /> },
  { name: "WIFI", icon: "#", component: <ModWifi /> },
  { name: "Facebook", icon: "#", component: <ModFacebook /> },
  { name: "Instagram", icon: "#", component: <ModInsta /> },
  { name: "Youtube", icon: "#", component: <ModYoutube /> },
  { name: "AppStore", icon: "#", component: <ModAppStore /> },
  { name: "Payment", icon: "#", component: <ModPayment /> },
  // { name: "Pdf", icon: "#", component: <ModPdf/> },
];

var download_image_name = "hehehe";

export const SetDownloadImageName = (n) => {
  download_image_name = n;
};

const Qr = () => {
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

  useEffect(() => {
    console.log("currentComponentIndex : ", currentComponentIndex);
  }, [currentComponentIndex]);

  return (
    <section className="qr_parent_div">
      <div className="container-qr">
        <div className="container-wrapper">
          <div className="qr-links">
            {menuItems.map((val, i, self) => {
              const OnClick = () => {
                setCurrentComponentIndex(i);
                console.log("Click call", i);
              };
              return (
                <div className="alag" key={i} onClick={OnClick}>
                  {val.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="output-div">
          {menuItems[currentComponentIndex].component}
        </div>
      </div>
      <div className="preview">
        <div className="preview-continer">
          <img className="qu_div_image_generated" src={Image} alt="qr_code" />
          <div className="test_qr_download">
            <button
              onClick={TEst_qu_Function}
              style={{
                display: "inline-flex",
                backgroundColor: "rgb(79, 70, 229)",
                borderRadius: "7px",
                border: "none",
                outline: "none",
                textDecoration: "none",
                padding: "16px 20px",
                textAlign: "center",
                color: "white",
                marginTop: "3rem",
                marginLeft: "1.9rem",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Download QR Code
            </button>
          </div>
        </div>
      </div>
    </section>

    // background-color: rgb(79, 70, 229);
    // background-color: rgb(67 56 202);
  );
};

const TEst_qu_Function = () => {
  const a = document.createElement("a");
  const qr_output = document.querySelector(".qu_div_image_generated");
  a.href = qr_output.src;
  a.download = download_image_name + "_qr_code.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
export default Qr;
