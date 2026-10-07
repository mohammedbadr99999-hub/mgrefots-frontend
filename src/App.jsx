import React, { useState } from "react";
import {
  ArrowRight,
  Bike,
  CheckCircle2,
  Dumbbell,
  Facebook,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Star,
  Truck,
  X
} from "lucide-react";

const WHATSAPP_NUMBER = "250792294432";
const LEGACY_IMAGE_BASE =
  "https://raw.githubusercontent.com/mohammedbadr99999-hub/mgrefots-6-8-2026/main/public/images/products";

const products = [
  {
    name: "Creatine Monohydrate",
    subtitle: "300 g · 60 servings · 5 g",
    description: "Supports strength, energy and muscular performance.",
    image: `${LEGACY_IMAGE_BASE}/creatine-monohydrate.png`,
    message: "Hello MGREFOTS, I would like to order Creatine Monohydrate 300 g."
  },
  {
    name: "L-Citrulline",
    subtitle: "150 g · 30 servings · 5 g",
    description: "Supports endurance, performance and healthy blood flow.",
    image: "/products/citrulline.webp",
    message: "Hello MGREFOTS, I would like to order L-Citrulline 150 g."
  },
  {
    name: "C-Zinc",
    subtitle: "Vitamin C + Zinc · 30 capsules",
    description: "Daily immune and antioxidant support.",
    image: `${LEGACY_IMAGE_BASE}/c-zinc.png`,
    message: "Hello MGREFOTS, I would like to order C-Zinc 30 capsules."
  },
  {
    name: "L-Carnitine",
    subtitle: "350 mg · 30 capsules",
    description: "Supports fat metabolism, energy and exercise performance.",
    image: `${LEGACY_IMAGE_BASE}/l-carnitine.png`,
    message: "Hello MGREFOTS, I would like to order L-Carnitine 30 capsules."
  },
  {
    name: "Milga Advance",
    subtitle: "B1 derivative + B6 + B12 · 30 capsules",
    description: "Supports nerve health, energy levels and brain function.",
    image: "/products/milga.webp",
    message: "Hello MGREFOTS, I would like to order Milga Advance 30 capsules."
  }
];

const waLink = (message = "Hello MGREFOTS, I would like to place an order.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="MGREFOTS home">
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-m">M</span>
        <span className="brand-g">G</span>
        <span className="brand-flame">✦</span>
      </span>
      <span className="brand-copy">
        <strong>M.G. REFOTS</strong>
        <small>DIETARY SUPPLEMENTS</small>
      </span>
    </a>
  );
}

function WhatsAppButton({ className = "", text = "Order on WhatsApp", message }) {
  return (
    <a
      className={`btn btn-gold ${className}`}
      href={waLink(message)}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={18} />
      <span>{text}</span>
      <ArrowRight size={17} />
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Brand />

          <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Primary">
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#shop" onClick={closeMenu}>Shop</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <WhatsAppButton className="nav-whatsapp" />
          </nav>

          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">HEALTHIER PEOPLE. STRONGER TOMORROWS.</p>
              <h1>
                Premium Nutrition
                <span>for Strength, Wellness</span>
                <span>& Daily Performance</span>
              </h1>
              <p className="hero-text">
                High-quality dietary supplements to support your energy, fitness,
                immunity and everyday well-being — with reliable delivery in Kigali.
              </p>

              <div className="hero-actions">
                <a className="btn btn-gold" href="#shop">
                  Shop Products <ArrowRight size={18} />
                </a>
                <a
                  className="btn btn-outline"
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={18} />
                  Order on WhatsApp
                </a>
              </div>

              <div className="hero-mini-features">
                <div>
                  <ShieldCheck size={24} />
                  <span><strong>Quality</strong> focused selection</span>
                </div>
                <div>
                  <Truck size={24} />
                  <span><strong>Fast delivery</strong> in Kigali</span>
                </div>
                <div>
                  <Dumbbell size={24} />
                  <span><strong>Performance</strong> nutrition</span>
                </div>
              </div>
            </div>

            <div className="hero-visual" aria-label="MGREFOTS featured products">
              <div className="hero-stage" />
              <div className="hero-products">
                <img
                  className="hero-product hero-citrulline"
                  src="/products/citrulline.webp"
                  alt="MGREFOTS L-Citrulline"
                />
                <img
                  className="hero-product hero-creatine"
                  src={`${LEGACY_IMAGE_BASE}/creatine-monohydrate.png`}
                  alt="MGREFOTS Creatine Monohydrate"
                />
                <img
                  className="hero-product hero-zinc"
                  src={`${LEGACY_IMAGE_BASE}/c-zinc.png`}
                  alt="MGREFOTS C-Zinc"
                />
              </div>
              <div className="hero-signature">Fuel<br />Your Potential</div>
            </div>
          </div>
        </section>

        <section className="benefit-strip" aria-label="MGREFOTS service benefits">
          <div className="container benefit-grid">
            <article>
              <span className="benefit-icon"><Leaf size={31} /></span>
              <div>
                <strong>PREMIUM QUALITY</strong>
                <span>Carefully selected supplements</span>
              </div>
            </article>
            <article>
              <span className="benefit-icon"><Truck size={31} /></span>
              <div>
                <strong>FAST DELIVERY IN KIGALI</strong>
                <span>Quick and convenient ordering</span>
              </div>
            </article>
            <article>
              <span className="benefit-icon"><ShieldCheck size={31} /></span>
              <div>
                <strong>SUPPORTS YOUR WELLNESS</strong>
                <span>Built around your daily goals</span>
              </div>
            </article>
            <article>
              <span className="benefit-icon"><Dumbbell size={31} /></span>
              <div>
                <strong>PERFORMANCE NUTRITION</strong>
                <span>Fuel your everyday potential</span>
              </div>
            </article>
          </div>
        </section>

        <section id="shop" className="products-section section">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-kicker">SHOP MGREFOTS</p>
                <h2>Our Featured Products</h2>
              </div>
              <a href={waLink("Hello MGREFOTS, please send me your available product list.")} target="_blank" rel="noreferrer">
                View all products <ArrowRight size={16} />
              </a>
            </div>

            <div className="product-grid">
              {products.map((product) => (
                <article className="product-card" key={product.name}>
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.name} loading="lazy" />
                  </div>
                  <div className="product-card-copy">
                    <h3>{product.name}</h3>
                    <p className="product-subtitle">{product.subtitle}</p>
                    <p>{product.description}</p>
                  </div>
                  <a
                    className="shop-now"
                    href={waLink(product.message)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Shop Now <ArrowRight size={16} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="delivery-band">
          <div className="delivery-photo" aria-hidden="true">
            <span className="delivery-rider">
              <Bike size={42} />
              <strong>MGREFOTS</strong>
            </span>
          </div>
          <div className="container delivery-inner">
            <div className="delivery-title">
              <MapPin size={38} />
              <div>
                <span>FAST & RELIABLE</span>
                <strong>DELIVERY IN KIGALI</strong>
                <p>Order on WhatsApp and get your supplements delivered conveniently.</p>
              </div>
            </div>
            <WhatsAppButton />
            <div className="delivery-points">
              <span><PackageCheck size={27} /> Easy ordering</span>
              <span><Bike size={27} /> Kigali delivery</span>
              <span><ShieldCheck size={27} /> Secure service</span>
            </div>
          </div>
        </section>

        <section className="reviews section" id="about">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="section-kicker">WHY MGREFOTS</p>
                <h2>Built Around Quality, Service & Performance</h2>
              </div>
            </div>

            <div className="review-grid">
              <article className="review-card">
                <div className="stars" aria-label="5 stars">
                  {[1,2,3,4,5].map((n) => <Star key={n} size={18} fill="currentColor" />)}
                </div>
                <p>
                  A focused supplement range designed for people who care about training,
                  daily energy and practical nutrition support.
                </p>
                <strong>Performance focused</strong>
              </article>
              <article className="review-card">
                <div className="stars" aria-label="5 stars">
                  {[1,2,3,4,5].map((n) => <Star key={n} size={18} fill="currentColor" />)}
                </div>
                <p>
                  Simple WhatsApp ordering, clear product information and fast local service
                  make buying easier.
                </p>
                <strong>Easy ordering</strong>
              </article>
              <article className="review-card">
                <div className="stars" aria-label="5 stars">
                  {[1,2,3,4,5].map((n) => <Star key={n} size={18} fill="currentColor" />)}
                </div>
                <p>
                  MGREFOTS combines sports nutrition, wellness support and personal guidance
                  in one Kigali-based brand.
                </p>
                <strong>Local support</strong>
              </article>
            </div>

            <div className="about-panel">
              <div>
                <p className="section-kicker">ABOUT MGREFOTS</p>
                <h2>Dietary Supplements With a Premium, Practical Approach</h2>
                <p>
                  MGREFOTS LTD is based in Kigali and focuses on sports supplements,
                  wellness products, nutrition support and convenient customer service.
                  Our goal is to make useful products easier to understand, order and use.
                </p>
              </div>
              <div className="about-badges">
                <span><CheckCircle2 size={22} /> Kigali based</span>
                <span><CheckCircle2 size={22} /> WhatsApp ordering</span>
                <span><CheckCircle2 size={22} /> Performance & wellness</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div>
              <p className="section-kicker">CONTACT</p>
              <h2>Ready to Order?</h2>
              <p>
                Message MGREFOTS on WhatsApp for product availability, ordering and delivery
                inside Kigali.
              </p>
              <WhatsAppButton text="Start WhatsApp Order" />
            </div>
            <div className="contact-card">
              <a href="tel:+250792294432"><Phone size={21} /> +250 792 294 432</a>
              <a href="mailto:info@mgrefots.com"><Mail size={21} /> info@mgrefots.com</a>
              <span><MapPin size={21} /> Kigali, Rwanda</span>
              <div className="social-row">
                <a href="https://www.instagram.com/mobadr2026/" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram size={21} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61580765596064" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Facebook size={21} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <Brand />
          <p>© {new Date().getFullYear()} MGREFOTS LTD. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
