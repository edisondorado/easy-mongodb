import React from "react";
import { useNavigate } from 'react-router-dom';

import "./styles/Home.css";

const HomePage = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/database');
    };

    return (
        <div className="home-container">
          <div className="home-header">
            <header
              data-thq="thq-navbar"
              className="navbarContainer home-navbar-interactive"
            >
              <span className="logo">Easy MongoDB</span>
                <div data-thq="thq-navbar-nav" className="home-desktop-menu">
                <nav>
                </nav>
                <div className="home-buttons">
                  <button className="buttonFilled" onClick={handleButtonClick} style={{cursor: "pointer"}}>Get Started</button>
                </div>
              </div>
            </header>
          </div>
          <div className="home-hero">
            <div className="heroContainer home-hero1">
              <div className="home-container1">
                <h1 className="home-hero-heading heading1">Work with Database</h1>
                <span className="home-hero-sub-heading bodyLarge">
                  <span>
                    <span>
                      <span>Efficiently manage and manipulate your data</span>
                    </span>
                  </span>
                </span>
                <div className="home-btn-group">
                  <button className="buttonFilled" onClick={handleButtonClick} style={{cursor: "pointer"}}>Get Started</button>
                </div>
              </div>
            </div>
          </div>
          <div className="home-footer">
            <footer className="footerContainer home-footer1">
              <div className="home-container7">
                <span className="bodySmall home-text38">
                  © 2024 Tamerlan, All Rights Reserved.
                </span>
              </div>
            </footer>
          </div>
        </div>
    )
}
 
export default HomePage;