import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import './App.css';

// Lazy loading для оптимизации (согласно плану: Этап 4 - Code splitting)
const Home = lazy(() => import('./pages/Home/Home'));
const Catalog = lazy(() => import('./pages/Catalog/Catalog'));
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail'));
const Contacts = lazy(() => import('./pages/Contacts/Contacts'));

// Компонент загрузки
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Загрузка...</p>
  </div>
);

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/catalog/:category" element={<Catalog />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/contacts" element={<Contacts />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
