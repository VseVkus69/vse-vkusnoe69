import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

const Home = () => {
  const { popularProducts } = useProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container grid-2 gap-24 center-v">
          <div>
            <h1>
              Ручная кондитерская{' '}
              <span>для ваших сладких моментов</span>
            </h1>
            <p className="lead">
              Без искусственных добавок и лишней сладости. Небольшие партии, чистый вкус ингредиентов.
            </p>
            <div className="row gap-12 wrap mt-24">
              <Link to="/catalog" className="btn primary">
                Смотреть каталог
              </Link>
              <Link to="/contacts" className="btn outline">
                Адреса и карта
              </Link>
            </div>
          </div>

          <div>
            <div className="hero-card">
              <img
                src="cotolog/baner/DSC_0712.jpg"
                alt="Кондитерская — аппетитный баннер"
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section id="popular" className="section alt">
        <div className="container">
          <div className="section-head">
            <div className="section-sub">Любимые позиции гостей</div>
            <h2>Популярное</h2>
          </div>

          <div className="cards-5 mt-24">
            {popularProducts.slice(0, 5).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container grid-2 gap-24 center-v">
          <div className="placeholder">
            <img
              src="logo/photo_2025-12-06_23-55-43.jpg"
              alt="Фото кондитерской"
            />
          </div>
          <div>
            <div className="section-head">
              <div className="section-sub">Философия вкуса</div>
              <h2>О нас</h2>
            </div>
            <p className="about-text mt-16">
              «<b>Всё вкусное</b>» — уютная кондитерская мастерская, где каждый десерт создаётся вручную с любовью и вниманием к деталям.
              Мы верим, что сладости должны быть не просто вкусными, а вызывать эмоции.
            </p>
            <p className="about-text">
              В нашем ассортименте вы найдёте:
              <ul className="about-list">
                <li>торты, десерты, пирожные, зефир и фланы;</li>
                <li>натуральные урбечи, крем-халву и арахисовые пасты;</li>
                <li><b>торты любой сложности</b> под заказ — свадебные, праздничные, тематические и корпоративные.</li>
              </ul>
            </p>
            <p className="about-text">
              Мы используем только <b>свежие и натуральные ингредиенты</b>, подбираем идеальные сочетания вкусов,
              чтобы каждый десерт стал маленьким праздником.
              Наши сладости готовятся небольшими партиями — с заботой, качеством и душевным теплом.
            </p>

            <div className="social mt-24">
              <a
                href="https://vk.com/vsevkusnoetver"
                target="_blank"
                rel="noopener noreferrer"
                className="vk-link"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/145/145813.png"
                  alt="VK"
                  className="vk-icon"
                />
                Мы ВКонтакте → <b>vk.com/vsevkusnoetver</b>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

