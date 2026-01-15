import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../hooks/useFavorites';
import Modal from '../Modal/Modal';
import './ProductCard.css';
import './QuickView.css';

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <div className="card fade-in">
        <Link to={`/product/${product.id}`} className="card-link">
          <div className="card-img">
            {imageError ? (
              <div className="img-placeholder" />
            ) : (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            )}
            {product.popular && (
              <div className="popular-badge">Популярное</div>
            )}
            <button
              className={`favorite-btn ${isFavorite(product.id) ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(product.id);
              }}
              aria-label="Добавить в избранное"
            >
              {isFavorite(product.id) ? '❤️' : '🤍'}
            </button>
          </div>
          <div className="card-body">
            <div className="tag">
              {product.category === 'torts' ? 'Торт' : 
               product.category === 'desserts' ? 'Десерт' :
               product.category === 'halva' ? 'Халва' :
               product.category === 'urbech' ? 'Урбеч' :
               product.category === 'peanut' ? 'Арахисовая паста' : 'Товар'}
            </div>
            <h3>{product.name}</h3>
            {product.description && (
              <p>{product.description}</p>
            )}
            {product.weight && (
              <p className="weight">Масса: {product.weight}</p>
            )}
            <div className="card-footer">
              {product.price && (
                <div className="card-price">{product.price.toLocaleString()} ₽</div>
              )}
              <div className="card-actions">
                <button
                  className="btn-quick-view"
                  onClick={handleQuickView}
                  title="Быстрый просмотр"
                >
                  👁️
                </button>
                <button
                  className="btn-add-to-cart"
                  onClick={handleAddToCart}
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Модальное окно быстрого просмотра */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={product.name}
        size="medium"
      >
        <div className="quick-view-content">
          <img
            src={product.image}
            alt={product.name}
            className="quick-view-image"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%232a201b" width="400" height="300"/%3E%3C/svg%3E';
            }}
          />
          <div className="quick-view-info">
            <p className="quick-view-description">{product.description}</p>
            {product.weight && <p><strong>Масса:</strong> {product.weight}</p>}
            {product.price && (
              <p className="quick-view-price">
                <strong>Цена:</strong> {product.price.toLocaleString()} ₽
              </p>
            )}
            <button
              className="btn primary"
              onClick={() => {
                addToCart(product);
                setShowModal(false);
              }}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProductCard;
