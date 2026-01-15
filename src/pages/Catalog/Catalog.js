import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categories } from '../../data/products';
import './Catalog.css';

const Catalog = () => {
  const { category: categoryParam } = useParams();
  const {
    filteredProducts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  } = useProducts();

  // Устанавливаем категорию из URL при загрузке
  React.useEffect(() => {
    if (categoryParam && categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam, selectedCategory, setSelectedCategory]);

  return (
    <section id="catalog" className="section">
      <div className="container">
        <div className="section-head">
          <div className="section-sub">Наш ассортимент</div>
          <h2>Каталог</h2>
        </div>

        {/* Поиск */}
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Фильтры и сортировка */}
        <div className="filters-row">
          {/* Фильтры по категориям */}
          <div className="chips">
            {categories.map(category => (
              <button
                key={category.id}
                className={`chip ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="chip-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Сортировка */}
          <div className="sort-box">
            <label htmlFor="sort-select">Сортировать:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">По названию</option>
              <option value="price">По цене</option>
              <option value="popular">По популярности</option>
            </select>
          </div>
        </div>

        {/* Счетчик найденных товаров */}
        <div className="products-count fade-in">
          Найдено товаров: <strong>{filteredProducts.length}</strong>
        </div>

        {/* Сетка товаров */}
        {filteredProducts.length > 0 ? (
          <div className="cards-3 mt-24">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products fade-in">
            <p>😔 Товары не найдены</p>
            <span>Попробуйте изменить фильтры или поисковый запрос</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Catalog;
