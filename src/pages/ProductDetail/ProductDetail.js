import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../data/products';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id);

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <div className="product-not-found">
            <h2>Товар не найден</h2>
            <p>Извините, товар с таким ID не существует.</p>
            <button onClick={() => navigate('/catalog')} className="btn primary">
              Вернуться в каталог
            </button>
          </div>
        </div>
      </section>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <section className="section">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Назад
        </button>

        <div className="product-detail grid-2 gap-24">
          <div className="product-image">
            {imageError ? (
              <div className="img-placeholder" style={{ aspectRatio: '4/3' }} />
            ) : (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setImageError(true)}
              />
            )}
          </div>

          <div className="product-info">
            <div className="product-category">{product.category}</div>
            <h1>{product.name}</h1>
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}
            {product.weight && (
              <div className="product-weight">Масса: {product.weight}</div>
            )}
            {product.price && (
              <div className="product-price">{product.price.toLocaleString()} ₽</div>
            )}

            <div className="product-actions">
              <div className="quantity-selector">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="btn primary btn-add-cart" onClick={handleAddToCart}>
                Добавить в корзину
              </button>
            </div>

            <div className="product-contact">
              <p>Хотите заказать индивидуальный торт?</p>
              <a href="tel:+79969232626" className="phone-btn">
                📞 +7 (996) 923-26-26
              </a>
              <a
                href="https://wa.me/79969232626"
                target="_blank"
                rel="noopener noreferrer"
                className="custom-order-btn whatsapp"
              >
                <span className="wa-ico">💬</span> Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;

