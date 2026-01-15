import { useState, useMemo } from 'react';
import { productsData, getProductsByCategory, searchProducts } from '../data/products';

/**
 * Кастомный хук для работы с товарами
 * Согласно плану: hooks/useProducts.js
 */
export const useProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // name, price, popular

  // Фильтрация товаров
  const filteredProducts = useMemo(() => {
    let products = getProductsByCategory(selectedCategory);
    
    // Поиск
    if (searchQuery) {
      products = searchProducts(searchQuery);
      if (selectedCategory !== 'all') {
        products = products.filter(p => p.category === selectedCategory);
      }
    }
    
    // Сортировка
    products = [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'popular':
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    return products;
  }, [selectedCategory, searchQuery, sortBy]);

  return {
    allProducts: productsData,
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  };
};

