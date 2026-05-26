import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // X (Twitter)

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <div className="footer-links">
            <Link to="/term_of_use">服務條款與細則 Terms and Conditions</Link> |{" "}
            <Link to="/contact_us">聯絡我們 Contact Us</Link>
          </div>

          {/* 社交媒體 icon */}
          {/* <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter />
            </a>
          </div> */}
          <p className="copyright">
            © {currentYear} HKG CARDZ. 保留所有權利.
          </p>
          <p className="copyright-en">
            © {currentYear} HKG CARDZ. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
