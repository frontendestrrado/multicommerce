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
                              <img src="/static/img/footer-logo.jpg" alt="footer logo"/>
                          </a>
                      </div>
                      <p className="text mb-30">We provide all ingredients of success to empower businesses and enrich our local market. BigBasket Cash and Carry aims to be a partner of success to the local economy by serving the community and providing A-to-Z support to independent businesses, the backbone of the local economy.</p>
                      <div className="address-widget mb-30">
                          <div className="media">
                              <span className="address-icon mr-3">
                                  <img src="/static/img/phone.webp" alt="phone"/>
                              </span>
                              <div className="media-body">
                                  <p className="help-text text-uppercase">Customer Care / Delivery Helpline</p>
                                  <h4 className="title text-dark"><a href="+966 56 376 9665">+966 56 376 9665</a></h4>
                              </div>
                          </div>
                      </div>

                      <div className="social-network">
                          <ul className="d-flex">
                              <li><a href="/page/blank" target="_blank"><span
                                          className="fa fa-facebook"></span></a></li>
                              <li><a href="/page/blank" target="_blank"><span
                                          className="fa fa-youtube-play"></span></a></li>
                              <li className="me-0"><a href="/page/blank" target="_blank"><span
                                          className="fa fa-instagram"></span></a></li>
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
                              <input className="form-control" type="text" placeholder="Your email address"/>
                              <button className="btn nletter-btn text-capitalize" type="submit">Send</button>
                          </form>
                      </div>

                      <div className="store d-flex">
                          <a href="/page/blank" className="d-inline-block mr-3">
                            <img src="/static/img/apple.webp" alt="apple icon" />
                          </a>
                          <a href="/page/blank" className="d-inline-block">
                            <img src="/static/img/play.webp" alt="apple icon" />
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
                      <p className="mb-3 mb-md-0">Copyright 2022 Bigbasket</p>
                  </div>
              </div>
              <div className="col-12 col-md-6 col-lg-8">
                  <div className="text-start">
                      <img src="/static/img/1.webp" alt="img" /> 
                  </div>
              </div>
          </div>
      </div>
  </div>
 
  </>

);

export default FooterCopyright;
