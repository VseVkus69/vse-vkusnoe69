import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Кастомный хук для работы с корзиной
 * Согласно плану: hooks/useCart.js
 * Обертка над CartContext для удобства использования
 */
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  
  return context;
};

