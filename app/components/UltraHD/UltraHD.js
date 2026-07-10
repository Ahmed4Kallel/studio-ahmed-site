"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./UltraHD.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function UltraHD() {
  const titleRef = useRef(null);
  const cameraRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);

    gsap.fromTo(
      titleRef.current,
      { y: isMobile ? 50 : 100 },
      {
        y: 0,
        duration: isMobile ? 0.8 : 1,
        ease: "power3.out",
        delay: isMobile ? 0.2 : 0.3,
        scrollTrigger: {
          trigger: titleRef.current,
          start: isMobile ? "top 80%" : "top 70%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      cameraRef.current,
      { y: isMobile ? 150 : 300, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: isMobile ? 0.8 : 1.2,
        ease: "power3.out",
        delay: isMobile ? 0.3 : 0.5,
        scrollTrigger: {
          trigger: cameraRef.current,
          start: isMobile ? "top 85%" : "top 80%",
          once: true,
        },
      }
    );
  }, [isMobile]);

  return (
    <section id="ultrahd" data-section="ultrahd" className={styles.section}>
      <div className={styles.gridLines} aria-hidden="true">
        <span className={`${styles.hLine} ${styles.hTop}`} />
        <span className={`${styles.hLine} ${styles.hMid}`} />
        <span className={`${styles.hLine} ${styles.hBottom}`} />
        <span className={`${styles.vLine} ${styles.vLeft}`} />
        <span className={`${styles.vLine} ${styles.vRight}`} />
      </div>

      <div className={styles.cameraWrapper} ref={cameraRef}>
        <Image alt="Hero Camera" src="/heroCamera.png" width={900} height={700} priority />
      </div>

      <div className={styles.sideContent}>
        <h3 className={styles.sideTitle}>Advanced Technology</h3>
        <p className={styles.sideDescription}>
          Exceptional visual experience with ultra-high definition providing the
          finest details and purest images
        </p>
        <span className={styles.badge}>BUY NOW</span>
      </div>

      <div className={styles.rightContent}>
        <h3 className={styles.rightTitle}>500k</h3>
        <p className={styles.rightDescription}>
          Over half a million pixels
          <br />
          delivering stunning clarity
        </p>
      </div>

      <h2 className={styles.title} ref={titleRef}>ULTRA HD</h2>
    </section>
  );
}
