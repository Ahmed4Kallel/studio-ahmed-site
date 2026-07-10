"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const cameraRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const vh = window.innerHeight;

    mm.add("(min-width: 769px)", () => {
      gsap.fromTo(
        cameraRef.current,
        { y: 120, rotation: -10, scale: 0.9, opacity: 0 },
        {
          y: 0,
          rotation: 6,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      ScrollTrigger.create({
        trigger: "#ultrahd",
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(cameraRef.current, {
            y: -0.32 * vh * progress,
            scale: 1 + 0.5 * progress,
            rotation: 6 - 6 * progress,
            duration: 0.1,
            overwrite: "auto",
          });
        },
      });

      ScrollTrigger.create({
        trigger: "#memory",
        start: "top 80%",
        onEnter: () => {
          gsap.to(cameraRef.current, {
            y: vh,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
          });
        },
        onLeaveBack: () => {
          gsap.to(cameraRef.current, {
            y: -0.32 * vh,
            opacity: 1,
            scale: 1.5,
            duration: 0.8,
            ease: "power2.out",
          });
        },
      });
    });

    mm.add("(max-width: 768px)", () => {
      gsap.fromTo(
        cameraRef.current,
        { y: 80, rotation: -6, scale: 0.9, opacity: 0 },
        {
          y: 0,
          rotation: 4,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      ScrollTrigger.create({
        trigger: "#ultrahd",
        start: "top 85%",
        end: "top 25%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(cameraRef.current, {
            y: -0.3 * vh * progress,
            scale: 1 + 0.3 * progress,
            rotation: 4 - 4 * progress,
            duration: 0.1,
            overwrite: "auto",
          });
        },
      });

      ScrollTrigger.create({
        trigger: "#memory",
        start: "top 80%",
        onEnter: () => {
          gsap.to(cameraRef.current, {
            y: vh,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          });
        },
        onLeaveBack: () => {
          gsap.to(cameraRef.current, {
            y: -0.3 * vh,
            opacity: 1,
            scale: 1.3,
            duration: 0.6,
            ease: "power2.out",
          });
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="home" className={styles.section}>
      <div className={styles.gridLines} aria-hidden="true">
        <span className={`${styles.hLine} ${styles.hTop}`} />
        <span className={`${styles.hLine} ${styles.hMid}`} />
        <span className={`${styles.hLine} ${styles.hBottom}`} />
        <span className={`${styles.vLine} ${styles.vLeft}`} />
        <span className={`${styles.vLine} ${styles.vRight}`} />
        <span className={`${styles.cornerBracket} ${styles.bracketTopLeft}`} />
        <span className={`${styles.cornerBracket} ${styles.bracketBottomLeft}`} />
        <span className={`${styles.cornerBracket} ${styles.bracketTopRight}`} />
        <span className={`${styles.cornerBracket} ${styles.bracketBottomRight}`} />
      </div>

      <div className={styles.titleBlock}>
        <div className={styles.cameraWrapper} ref={cameraRef}>
          <Image alt="Hero Camera" src="/heroCamera.png" width={420} height={320} priority sizes="(max-width: 768px) 100vw, 420px" />
        </div>

        <div className={styles.titlesWrapper}>
          <h1 className={styles.titleLeft}>DEFINE</h1>
          <h1 className={styles.titleRight}>MOMENTS</h1>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.leftContent}>
          <p className={styles.description}>
            Discover the art of photography with precision gear.
            <br />
            Every shot tells a story worth remembering.
            <br />
            Elevate your vision with the right equipment.
          </p>
        </div>
        <p className={styles.sideNote}>
          Trusted by professionals
          <br />
          worldwide since 2010.
        </p>
      </div>

      <div className={styles.badge}>
        <span className={styles.badgeText}>Capture Every <br /> Frame</span>
      </div>
    </section>
  );
}
