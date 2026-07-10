"use client";

import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { cart, cartOpen, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={styles.nav}>
        <a className={styles.logo} href="/">
          <div className={styles.logoIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.2 13.6c0-1.8 1.5-3.2 3.3-3.2s3.3 1.4 3.3 3.2-1.5 3.3-3.3 3.3-3.3-1.5-3.3-3.3z" />
              <path d="M20 6h-2.5l-1.5-2h-7L7.5 6H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8.7 13c-3 0-5.3-2.3-5.3-5.3S8.3 8.4 11.3 8.4s5.3 2.3 5.3 5.3-2.3 5.3-5.3 5.3z" />
            </svg>
          </div>
          <div>
            <span className={styles.logoText}>Studio AHMED</span>
            <span className={styles.logoSub}>Premium Cameras</span>
          </div>
        </a>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
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

      <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
        {menuOpen && (
          <button
            className={styles.menuCloseBtn}
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <span />
            <span />
            <span />
          </button>
        )}
        <li>
          <a href="#home" onClick={closeMenu}>Home</a>
        </li>
        <li>
          <a href="#ultrahd" onClick={closeMenu}>Ultra HD</a>
        </li>
        <li>
          <a href="#memory" onClick={closeMenu}>Memory</a>
        </li>
        <li>
          <a href="#capture" onClick={closeMenu}>Capture</a>
        </li>
        <li>
          <a href="#testimonials" onClick={closeMenu}>Testimonials</a>
        </li>
      </ul>

      {menuOpen && (
        <div className={styles.menuOverlay} onClick={closeMenu} />
      )}

      {cartOpen && (
        <div className={styles.overlay} onClick={toggleCart} />
      )}

      <div className={`${styles.drawer} ${cartOpen ? styles.drawerOpen : ""}`}>
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
