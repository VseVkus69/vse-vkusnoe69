import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cart from '../Cart/Cart';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Каталог' },
    { path: '/contacts', label: 'Контакты' }
  ];

  return (
    <header className="header">
      <div className="container row between center">
        <Link to="/" className="row gap-12 center" onClick={closeMobileMenu}>
          <div className="logo">
            <img src="logo/logo.png" alt="Логотип Всё вкусное" />
          </div>
          <div className="brand">
            <div className="brand-title">Всё вкусное</div>
            <div className="brand-sub">кондитерская мастерская</div>
          </div>
        </Link>

        <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Cart />
          <button
            className="burger"
            onClick={toggleMobileMenu}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            onClick={closeMobileMenu}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;

