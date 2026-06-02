import { useRef } from 'react';

const productCards = [
  {
    title: 'Handwoven Textiles',
    subtitle: 'Ethnic shawls & scarves',
    description: 'Lightweight pieces in soft cream, olive, and terracotta.',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Specialty Coffee',
    subtitle: 'Golden beans from Sidama',
    description: 'Fresh, fragrant, and ethically sourced by local growers.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Local crafts',
    subtitle: 'Artisan baskets & ceramics',
    description: 'Securely hand-delivered with a warm Addis Ababa smile.',
    image: 'https://images.unsplash.com/photo-1522243222239-8e79a6b98c67?auto=format&fit=crop&w=900&q=80',
  },
];

const trustItems = [
  {
    badge: 'Secure payments',
    title: 'Encrypted card checkout',
    description: 'Visa, Mastercard, and mobile payment support with reliable authentication.',
  },
  {
    badge: 'Trusted local delivery',
    title: 'Fast Addis delivery',
    description: 'Same-day and next-day options across Addis Ababa with real tracking updates.',
  },
  {
    badge: 'No hidden fees',
    title: 'Transparent pricing',
    description: 'What you see is what you pay: clear costs, honest service, and no surprises.',
  },
];

const pricingPlans = [
  {
    title: 'Starter',
    price: 'From ብር 450',
    items: ['Local coffee selections', 'Artisan textile pieces', 'Secure checkout'],
  },
  {
    title: 'Curated',
    price: 'From ብር 1,250',
    items: ['Featured clothing items', 'Handcrafted gift bundles', 'Free Addis delivery'],
    featured: true,
  },
  {
    title: 'Premium',
    price: 'From ብር 2,300',
    items: ['Exclusive artisan bundles', 'Priority shipping', 'White-glove support'],
  },
];

function App() {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const offset = carousel.clientWidth * 0.85;
    carousel.scrollBy({ left: offset * direction, behavior: 'smooth' });
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-marker">N</span>
          <div>
            <p className="brand-name">Novacart</p>
            <p className="brand-note">Addis Ababa local treasures</p>
          </div>
        </div>
        <nav className="nav-links">
          <a href="#collections">Collections</a>
          <a href="#trust">Why Shop Safely</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="cta-button" href="#collections">Explore Now</a>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Curated from the heart of Ethiopia</p>
            <h1>Peaceful shopping for soulful clothing, coffee, and locally woven joy.</h1>
            <p className="hero-text">Novacart blends thoughtful design, trusted local delivery, and premium Ethiopian craftsmanship into a serene online marketplace.</p>
            <div className="hero-actions">
              <a className="button-primary" href="#collections">Shop Featured</a>
              <a className="button-secondary" href="#trust">Shop Safely</a>
            </div>
            <div className="hero-highlights">
              <div>
                <strong>80+</strong>
                <span>Trusted artisans</span>
              </div>
              <div>
                <strong>Free shipping</strong>
                <span>Across Addis Ababa</span>
              </div>
              <div>
                <strong>Secure checkout</strong>
                <span>Transparent pricing</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-image"></div>
              <div className="hero-card-copy">
                <p className="card-label">Featured culture drop</p>
                <h2>Traditional Habesha styles</h2>
                <p>Soft cotton, warm smiles, and story-rich design from local weavers.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="collections" className="section pane">
          <div className="section-head">
            <p className="eyebrow">Featured collections</p>
            <h2>Discover calm classics and joyful local finds.</h2>
          </div>

          <div className="carousel-shell">
            <button className="carousel-nav prev" onClick={() => scrollCarousel(-1)}>‹</button>
            <div className="carousel" ref={carouselRef}>
              {productCards.map((product) => (
                <article key={product.title} className="product-card">
                  <img src={product.image} alt={product.title} />
                  <div className="product-copy">
                    <span>{product.title}</span>
                    <h3>{product.subtitle}</h3>
                    <p>{product.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <button className="carousel-nav next" onClick={() => scrollCarousel(1)}>›</button>
          </div>
        </section>

        <section id="trust" className="section trust-block">
          <div>
            <p className="eyebrow">Why Shop Safely With Us</p>
            <h2>Clear, honest, and secure local shopping.</h2>
            <p className="section-text">We bring you premium Ethiopian goods with trusted payment safeguards, transparent delivery, and a gentle checkout experience made for peace of mind.</p>
          </div>

          <div className="trust-grid">
            {trustItems.map((item) => (
              <div key={item.title} className="trust-card">
                <span className="badge">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="section pricing-grid">
          <div className="section-head">
            <p className="eyebrow">Pricing made simple</p>
            <h2>Honest prices for premium Ethiopian goods.</h2>
          </div>
          <div className="pricing-cards">
            {pricingPlans.map((plan) => (
              <article key={plan.title} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                <h3>{plan.title}</h3>
                <p className="price"><strong>{plan.price}</strong></p>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div>
          <p className="footer-title">Novacart</p>
          <p>Local treasures from Addis Ababa, delivered with trust and joy.</p>
        </div>
        <div className="footer-links">
          <a href="#collections">Collections</a>
          <a href="#trust">Safety</a>
          <a href="#pricing">Pricing</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
