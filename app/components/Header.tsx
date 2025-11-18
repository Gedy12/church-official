'use client';

import { useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  useEffect(() => {
    // Initialize Bootstrap JavaScript
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Adjust for header height
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
    
    // Close mobile menu after click
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
    
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarToggler?.click();
    }
  };

  return (
    <header className="header-shadow fixed-top">
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">
          {/* Logo/Brand */}
          <button 
            onClick={() => scrollToSection('home')}
            className="navbar-brand fw-bold border-0 bg-transparent d-flex align-items-center"
            style={{ fontSize: '0', padding: '0' }} // Remove text sizing and padding
          >
            {/* Company Logo */}
            <img 
              src="/company-logo.png" // Update this path to your actual logo file
              alt="Company Logo" 
              className="company-logo"
              style={{
                height: '50px', // Adjust height as needed
                width: 'auto',
                transition: 'all 0.3s ease'
              }}
            />
            {/* Hidden text for accessibility */}
            <span style={{ display: 'visible' }}>ELWECGP</span>
          </button>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <button 
                  onClick={(e) => handleNavClick(e, 'home')}
                  className="nav-link nav-link-custom border-0 bg-transparent"
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button 
                  onClick={(e) => handleNavClick(e, 'experience')}
                  className="nav-link nav-link-custom border-0 bg-transparent"
                >
                  Foundation
                </button>
              </li>
              <li className="nav-item">
                <button 
                  onClick={(e) => handleNavClick(e, 'about')}
                  className="nav-link nav-link-custom border-0 bg-transparent"
                >
                  Our Leader
                </button>
              </li>
              <li className="nav-item">
                <button 
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="nav-link nav-link-custom border-0 bg-transparent"
                >
                  Journey
                </button>
              </li>
              <li className="nav-item">
                <button 
                  onClick={(e) => handleNavClick(e, 'mission')}
                  className="nav-link nav-link-custom border-0 bg-transparent"
                >
                  Mission & Vision
                </button>
              </li>
              <li className="nav-item">
                <button 
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="nav-link nav-link-custom border-0 bg-transparent"
                >
                  Contact
                </button>
              </li>
              <li className="nav-item ms-3">
                <ThemeToggle />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;