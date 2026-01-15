import React from 'react';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <>
      <button
        className="cart-icon"
        onClick={() => setIsCartOpen(!isCartOpen)}
        aria-label="Корзина"
      >
        🛒
        {totalItems > 0 && (
          <span className="cart-count">{totalItems}</span>
        )}
      </button>

      {isCartOpen && (
        <>
          <div
            className="cart-overlay"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="cart-drawer slide-in">
            <div className="cart-header">
              <h2>Корзина</h2>
              <button
                className="close-btn"
                onClick={() => setIsCartOpen(false)}
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <p>Корзина пуста</p>
                <span>Добавьте товары из каталога</span>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item fade-in">
                      <div className="cart-item-image">
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%232a201b" width="100" height="100"/%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        {item.weight && <p className="cart-item-weight">{item.weight}</p>}
                        <div className="cart-item-controls">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Уменьшить количество"
                          >
                            −
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Увеличить количество"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="cart-item-price">
                        {item.price ? `${(item.price * item.quantity).toLocaleString()} ₽` : '—'}
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Удалить"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <strong>Итого: {totalPrice.toLocaleString()} ₽</strong>
                  </div>
                  <div className="cart-actions">
                    <button className="btn-clear" onClick={clearCart}>
                      Очистить корзину
                    </button>
                    <button
                      className="btn-order"
                      onClick={() => {
                        alert('Функция оформления заказа будет добавлена позже');
                      }}
                    >
                      Оформить заказ
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

