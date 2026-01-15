/**
 * Утилиты для работы с данными
 * Согласно плану: utils/data.js
 */

import { productsData } from '../data/products';

/**
 * Получить товары по категории
 */
export const getProductsByCategory = (category) => {
  if (category === 'all') return productsData;
  return productsData.filter(product => product.category === category);
};

/**
 * Поиск товаров
 */
export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return productsData.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description?.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Получить популярные товары
 */
export const getPopularProducts = () => {
  return productsData.filter(product => product.popular);
};

/**
 * Получить товар по ID
 */
export const getProductById = (id) => {
  return productsData.find(product => product.id === id);
};

/**
 * Получить товары по тегам
 */
export const getProductsByTags = (tags) => {
  if (!tags || tags.length === 0) return productsData;
  return productsData.filter(product =>
    tags.some(tag => product.tags?.includes(tag))
  );
};

/**
 * Форматирование цены
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(price);
};

/**
 * Фильтрация по диапазону цен
 */
export const filterByPriceRange = (products, minPrice, maxPrice) => {
  return products.filter(product => {
    const price = product.price || 0;
    return price >= minPrice && (maxPrice === null || price <= maxPrice);
  });
};

