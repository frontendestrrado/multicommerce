import React from "react";
import FooterWidgets from "./modules/FooterWidgets";
import FooterLinks from "./modules/FooterLinks";
import FooterCopyright from "./modules/FooterCopyright";

const FooterFullwidth = () => (
  <div>
    {/* <div className="top-stories">      
        <div className="ps-container"> 
        <FooterLinks />
        </div>
    </div> */}
    <footer className="ps-footer">
      <div className="ps-container">
        {/* <FooterWidgets /> */}
        {/* <FooterLinks /> */}
        <FooterCopyright />
      </div>
    </footer>
  </div>
);

export default FooterFullwidth;
