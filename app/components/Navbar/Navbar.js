"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { cart, cartOpen, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={styles.nav}>
        <a className={styles.logo} href="/">
          <div>
            <span className={styles.logoText}>Studio AHMED</span>
            <span className={styles.logoSub}>Premium Cameras</span>
          </div>
        </a>

        <button
          className={styles.hamburger}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <button className={styles.cartBtn} onClick={toggleCart}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className={styles.cartText}>Cart</span>
          <span className={styles.cartCount}>{cart.length}</span>
        </button>
      </nav>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        {menuOpen && (
          <button
            className={styles.menuCloseBtn}
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        <li>
          <a onClick={() => scrollTo("home")}>Home</a>
        </li>
        <li>
          <a onClick={() => scrollTo("ultrahd")}>Ultra HD</a>
        </li>
        <li>
          <a onClick={() => scrollTo("memory")}>Memory</a>
        </li>
        <li>
          <a onClick={() => scrollTo("capture")}>Capture</a>
        </li>
        <li>
          <a onClick={() => scrollTo("testimonials")}>Testimonials</a>
        </li>
      </ul>

      <div className={`${styles.drawer} ${cartOpen ? styles.open : ""}`}>
        <div className={styles.drawerHeader}>
          <h2>Your Cart ({cart.length})</h2>
          <button className={styles.closeBtn} onClick={toggleCart}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={styles.drawerBody}>
          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <p>Cart items go here</p>
          )}
        </div>
      </div>
    </>
  );
}
