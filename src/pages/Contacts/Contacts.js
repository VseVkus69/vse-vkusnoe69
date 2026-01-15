import React, { useState } from 'react';
import { branches } from '../../data/branches';
import './Contacts.css';

const Contacts = () => {
  const [activeBranchId, setActiveBranchId] = useState(branches[0]?.id || null);

  const activeBranch = branches.find(b => b.id === activeBranchId) || branches[0];

  const embedSrcByAddress = (addr) => {
    return `https://www.google.com/maps?q=${encodeURIComponent('Тверь ' + addr)}&output=embed`;
  };

  return (
    <section id="contacts" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-sub">Где нас найти</div>
          <h2>Адреса</h2>
        </div>

        <div className="contacts-layout">
          {/* Список адресов */}
          <ul className="branch-list compact">
            {branches.map(branch => {
              const tel = (branch.phone || '').replace(/[^+\d]/g, '');
              return (
                <li
                  key={branch.id}
                  className={`branch-item ${activeBranchId === branch.id ? 'active' : ''}`}
                  onClick={() => setActiveBranchId(branch.id)}
                >
                  <div className="branch-meta">
                    <div className="name">{branch.name}</div>
                    <div className="addr">{branch.address}</div>
                  </div>

                  <div className="branch-right">
                    <div className="branch-phone">
                      <a href={`tel:${tel}`}>{branch.phone}</a>
                    </div>

                    <div className="branch-actions">
                      <a
                        href={`tel:${tel}`}
                        className="icon"
                        title="Позвонить"
                        onClick={(e) => e.stopPropagation()}
                      >
                        📞
                      </a>
                      <a
                        href={`https://wa.me/${(branch.phone || '').replace(/\D/g, '')}`}
                        className="icon"
                        title="WhatsApp"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        💬
                      </a>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`}
                        className="icon"
                        title="Google Maps"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        G
                      </a>
                      <a
                        href={`https://yandex.ru/maps/?text=${encodeURIComponent(branch.address)}`}
                        className="icon"
                        title="Яндекс.Карты"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Y
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Карта */}
          <div className="map-card">
            <div className="map-title">
              {activeBranch ? `${activeBranch.name}: ${activeBranch.address}` : 'Выберите точку'}
            </div>
            <iframe
              className="map-frame"
              src={activeBranch ? embedSrcByAddress(activeBranch.address) : ''}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;

