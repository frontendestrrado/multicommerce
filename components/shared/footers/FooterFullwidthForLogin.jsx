import React from "react";
import FooterWidgets from "./modules/FooterWidgets";
import FooterLinks from "./modules/FooterLinks";
import FooterCopyright from "./modules/FooterCopyright";
import FooterCopyrightForLogin from "./modules/FooterCopyrightForLogin";

const FooterFullwidth = () => (
  <div>
    {/* <div className="top-stories">      
        <div className="ps-container"> 
        <FooterLinks />
        </div>
    </div> */}
    <footer className="ps-footer ps-footer__custom">
      <div className="ps-container">
        {/* <FooterWidgets /> */}
        {/* <FooterLinks /> */}
        <FooterCopyrightForLogin />
      </div>
    </footer>
  </div>
);

export default FooterFullwidth;
