import React, { createContext, useContext, useState, useMemo } from 'react';
import { productsData, getProductsByCategory, getPopularProducts, searchProducts } from '../data/products';

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Фильтрованные товары с сортировкой
  const filteredProducts = useMemo(() => {
    let products = getProductsByCategory(selectedCategory);
    
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

  const popularProducts = useMemo(() => getPopularProducts(), []);

  const value = {
    allProducts: productsData,
    filteredProducts,
    popularProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

