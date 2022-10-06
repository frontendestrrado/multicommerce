import React from "react";
import Link from "next/link";

const FooterCopyright = () => (

  <>  

  <div className="footer-bottom pt-80 pb-30">
      <div className="ps-container">
          <div className="row">
              <div className="col-12 col-md-6 col-lg-4 mb-30">
                  <div className="footer-widget mx-w-400">
                      <div className="footer-logo mb-35">
                          <a href="index.html">
                              {/* <img src="assets/img/logo/logo-dark.jpg" alt="footer logo"> */}
                          </a>
                      </div>
                      <p className="text mb-30">We are a team of designers and developers that create high quality
                          Magento, Prestashop, Opencart.</p>
                      <div className="address-widget mb-30">
                          <div className="media">
                              <span className="address-icon me-3">
                                  {/* <img src="assets/img/icon/phone.png" alt="phone"> */}
                              </span>
                              <div className="media-body">
                                  <p className="help-text text-uppercase">NEED HELP?</p>
                                  <h4 className="title text-dark"><a href="tel:+1(123)8889999">(+800) 345 678</a></h4>
                              </div>
                          </div>
                      </div>

                      <div className="social-network">
                          <ul className="d-flex">
                              <li><a href="/page/blank" target="_blank"><span
                                          className="icon-social-facebook"></span></a></li>
                              <li><a href="/page/blank" target="_blank"><span
                                          className="icon-social-twitter"></span></a></li>
                              <li><a href="/page/blank" target="_blank"><span
                                          className="icon-social-youtube"></span></a></li>
                              <li className="me-0"><a href="/page/blank" target="_blank"><span
                                          className="icon-social-instagram"></span></a></li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="col-12 col-md-6 col-lg-2 mb-30 pl-40">
                  <div className="footer-widget">
                      <div className="border-bottom cbb1 mb-25">
                          <div className="section-title pb-20">
                              <h2 className="title text-dark text-uppercase">Information</h2>
                          </div>
                      </div>
                      
                      <ul className="footer-menu">
                          <li><a href="/page/blank">Delivery</a></li>
                          <li><a href="/page/blank">About us</a></li>
                          <li><a href="/page/blank">Secure payment</a></li>
                          <li><a href="/page/blank">Contact us</a></li>
                          <li><a href="/page/blank">Sitemap</a></li>
                          <li><a href="/page/blank">Stores</a></li>
                      </ul>
                     
                  </div>
              </div>
              <div className="col-12 col-md-6 col-lg-2 mb-30">
                  <div className="footer-widget">
                      <div className="border-bottom cbb1 mb-25">
                          <div className="section-title pb-20">
                              <h2 className="title text-dark text-uppercase">Custom Links</h2>
                          </div>
                      </div>
                    
                      <ul className="footer-menu">
                          <li><a href="/page/blank">Legal Notice</a></li>
                          <li><a href="/page/blank">Prices drop</a></li>

                          <li><a href="/page/blank">New products</a></li>

                          <li><a href="/page/blank">Best sales</a></li>

                          <li><a href="/page/blank">Login</a></li>

                          <li><a href="/page/blank">My account</a></li>
                      </ul>
                      
                  </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-30">
                  <div className="footer-widget">
                      <div className="border-bottom cbb1 mb-25">
                          <div className="section-title pb-20">
                              <h2 className="title text-dark text-uppercase">Newsletter</h2>
                          </div>
                      </div>
                      <p className="text mb-20">You may unsubscribe at any moment. For that purpose, please find our
                          contact info in the legal notice.</p>
                      <div className="nletter-form mb-35">
                          <form className="form-inline position-relative"
                              action="/page/blank"
                              target="_blank" method="post">
                              {/* <input className="form-control" type="text" placeholder="Your email address"> */}
                              <button className="btn nletter-btn text-capitalize" type="submit">Sign
                                  up</button>
                          </form>
                      </div>

                      <div className="store d-flex">
                          <a href="/page/blank" className="d-inline-block me-3">
                            {/* <img rc="assets/img/icon/apple.png" alt="apple icon">  */}
                          </a>
                          <a href="/page/blank" className="d-inline-block">
                            {/* <img src="assets/img/icon/play.png" alt="apple icon">  */}
                          </a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  
  <div className="coppy-right pb-80">
      <div className="container">
          <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                  <div className="text-start">
                      <p className="mb-3 mb-md-0">
          © 2021 <span className="text-capitalize">Junno</span> Made
          with <span>&#10084;</span> by
          <a target="_blank" href="https://hasthemes.com/">HasThemes</a>
        </p>
                  </div>
              </div>
              <div className="col-12 col-md-6 col-lg-8">
                  <div className="text-start">
                      {/* <img src="assets/img/payment/1.png" alt="img"> */}
                  </div>
              </div>
          </div>
      </div>
  </div>
 
  </>

);

export default FooterCopyright;
