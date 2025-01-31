import React from "react";
import "./Footer.css"; // Make sure to create and import the CSS file
import { kname } from "../../common/utils";

const Footer = () => {
  return (
    <footer className='footer bg-dark mt-4'>
      <div className='footer-container w-100'>
        <h2 className='footer-logo w-100 text-center text-light mb-3'>
          {kname}
        </h2>

        <div className='footer-links my-3 w-100 d-flex justify-content-center align-content-center gap-5'>
          <a
            href='#'
            className='footer-link fs-5 w-100 text-center text-decoration-none text-white'
          >
            Contact
          </a>
          <a
            href='#'
            className='footer-link w-100 fs-5 text-center text-decoration-none text-white'
          >
            Privacy
          </a>
        </div>
        <div className='footer-copy w-100 text-center text-light'>
          <p>
            Copyright &copy; {new Date().getFullYear()}. All Rights Reserved By{" "}
            <span className='footer-copy-highlight'>{kname}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
