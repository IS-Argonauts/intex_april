import React, { useState } from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const [showContactDialog, setShowContactDialog] = useState(false);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent link default
    setShowContactDialog(true);
  };

  const closeDialog = () => {
    setShowContactDialog(false);
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <img src="/Cineniche.png" alt="CineNiche Logo" className="footer-logo" />
        <div className="footer-text">
          <h4 className="footer-heading">About</h4>
          <a href="#" onClick={handleContactClick}>Contact</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
      </div>

      {/* Dialog */}
      {showContactDialog && (
        <div className="contact-dialog">
          <div className="dialog-content">
            <h3>Contact Us</h3>
            <p>Email us at: <a href="mailto:support@cineniche.com">support@cineniche.com</a></p>
            <button onClick={closeDialog} className="close-button">Close</button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
