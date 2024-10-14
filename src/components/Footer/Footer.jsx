import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className="footer ">
            <div className="footer-columns">
                <div className="footer-column">
                    <h3>Shoppie</h3>
                    <ul>
                        <li>No lines,</li>
                        <li>no crowds,</li>
                        <li>just shopping bliss!</li>
                        <div className="chocolate-icons-container">
                            <FontAwesomeIcon icon={faInstagram} className="chocolate-icon" />
                            <FontAwesomeIcon icon={faFacebook} className="chocolate-icon" />
                            <FontAwesomeIcon icon={faWhatsapp} className="chocolate-icon" />
                        </div>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Quick Link</h3>
                    <ul>
                        <li>Shopie</li>
                        <li>ExploreNow</li>
                        <li>Login</li>
                        <li>Cart</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Quick Link</h3>
                    <ul>
                        <li>FAQ'S</li>
                        <li>Privacy policy</li>
                        <li>Terms and conditions</li>
                        <li>Support</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>342 Blane Street, Wisconsing <p>United States</p></li>
                        <li>2145-5467-5378</li>
                        <li>www.shoppie.com</li>
                    </ul>
                </div>
            </div>
            <div className="footer-underline"></div>
            <div className="footer-bottom">
                <p>Copyright @ www.shoppie.com by Shoppie website</p>
            </div>
        </div>
    );
};

export default Footer;