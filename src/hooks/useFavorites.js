import { useState, useEffect } from 'react';

/**
 * Хук для управления избранными товарами
 * Согласно плану: "Корзина и избранное" - Избранное
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('vsevkusnoe_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('vsevkusnoe_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (productId) => {
    setFavorites(prev => {
      if (prev.includes(productId)) {
        return prev;
      }
      return [...prev, productId];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prev => prev.filter(id => id !== productId));
  };

  const toggleFavorite = (productId) => {
    if (isFavorite(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  const isFavorite = (productId) => {
    return favorites.includes(productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites
  };
};

