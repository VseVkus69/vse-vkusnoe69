import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container row between center wrap">
        <div className="row center gap-12">
          <div className="logo small">
            <img src="logo/logo.png" alt="Логотип Всё вкусное" />
          </div>
          <div className="f-meta">
            <div className="f-title">Всё вкусное</div>
            <div className="muted">© {currentYear} Все права защищены</div>
          </div>
        </div>
        <div className="muted">Ознакомительный сайт.</div>
      </div>
    </footer>
  );
};

export default Footer;

