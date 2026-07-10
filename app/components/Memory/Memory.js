"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Memory.module.css";

gsap.registerPlugin(ScrollTrigger);

const MEMORY_IMAGES = [
  "1.jpeg", "22.jpeg", "3.jpeg", "44.jpeg",
  "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg",
];

export default function Memory() {
  const sectionRef = useRef(null);
  const cameraRef = useRef(null);
  const imgRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    const ctx = gsap.context(() => {
      const scaleMultiplier = isMobile ? 0.35 : 1;
      const offsetMultiplier = isMobile ? 0.4 : 1;
      const pinDistance = isMobile ? "+=4000" : "+=8000";

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: pinDistance,
        pin: true,
        pinSpacing: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: pinDistance,
          scrub: 1,
        },
      });

      // Phase 1: Images 1 & 2 appear and scatter
      tl.fromTo(
        imgRefs.current[0],
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: isMobile ? 0.9 : 1,
          x: -200 * scaleMultiplier,
          y: 0,
          duration: 1,
        },
        0
      );

      tl.fromTo(
        imgRefs.current[1],
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: isMobile ? 0.9 : 1,
          x: 200 * scaleMultiplier,
          y: 0,
          duration: 1,
        },
        0
      );

      // Phase 2: Spread wider + images 3-6 appear
      tl.to(imgRefs.current[0], { x: -350 * scaleMultiplier, duration: 1 }, 1);
      tl.to(imgRefs.current[1], { x: 350 * scaleMultiplier, duration: 1 }, 1);

      tl.fromTo(
        imgRefs.current[2],
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: isMobile ? 0.7 : 0.75,
          x: -160 * scaleMultiplier,
          y: -95 * offsetMultiplier,
          duration: 1,
        },
        1
      );

      tl.fromTo(
        imgRefs.current[3],
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: isMobile ? 1 : 1.25,
          x: 245 * scaleMultiplier,
          y: -200 * offsetMultiplier,
          duration: 1,
        },
        1
      );

      tl.fromTo(
        imgRefs.current[4],
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: isMobile ? 0.95 : 1.15,
          x: -235 * scaleMultiplier,
          y: 185 * offsetMultiplier,
          duration: 1,
        },
        1
      );

      tl.fromTo(
        imgRefs.current[5],
        { opacity: 0, scale: 0, x: 0, y: 0 },
        {
          opacity: 1,
          scale: isMobile ? 0.75 : 0.85,
          x: 175 * scaleMultiplier,
          y: 125 * offsetMultiplier,
          duration: 1,
        },
        1
      );

      // Phase 3 (desktop only): further spread + images 7-8 appear
      if (!isMobile) {
        tl.to(imgRefs.current[0], { x: -500, duration: 1 }, 2);
        tl.to(imgRefs.current[1], { x: 500, duration: 1 }, 2);
        tl.to(imgRefs.current[2], { x: -280, y: -120, scale: 0.75, duration: 1 }, 2);
        tl.to(imgRefs.current[3], { x: 300, y: -230, scale: 1.25, duration: 1 }, 2);
        tl.to(imgRefs.current[4], { x: -290, y: 185, scale: 1.15, duration: 1 }, 2);
        tl.to(imgRefs.current[5], { x: 280, y: 125, scale: 0.85, duration: 1 }, 2);

        tl.fromTo(
          imgRefs.current[6],
          { opacity: 0, scale: 0, x: 0, y: 0 },
          { opacity: 1, scale: 1, x: -200, y: 0, duration: 1 },
          2
        );

        tl.fromTo(
          imgRefs.current[7],
          { opacity: 0, scale: 0, x: 0, y: 0 },
          { opacity: 1, scale: 1, x: 200, y: 0, duration: 1 },
          2
        );
      }
    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section id="memory" data-section="memory" className={styles.section} ref={sectionRef}>
      <div className={styles.gridLines} aria-hidden="true">
        <span className={`${styles.hLine} ${styles.hTop}`} />
        <span className={`${styles.hLine} ${styles.hMid}`} />
        <span className={`${styles.hLine} ${styles.hBottom}`} />
        <span className={`${styles.vLine} ${styles.vLeft}`} />
        <span className={`${styles.vLine} ${styles.vRight}`} />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.leftContent}>
          <h2 className={styles.title}>
            Where Every Click
            <br />
            Becomes a Memory
          </h2>
        </div>
        <div className={styles.rightContent}>
          <p className={styles.description}>
            Transform fleeting moments into timeless treasures with precision
            and artistry. Each photograph captures not just an image, but the
            emotion behind it.
          </p>
          <div className={styles.badge}>
            <span className={styles.badgeText}>
              Preserve Your <br /> Memories
            </span>
          </div>
        </div>
      </div>

      <div className={styles.imagesContainer}>
        <div className={styles.centerCamera} ref={cameraRef}>
          <Image alt="Hero Camera" src="/heroCamera.png" width={420} height={320} />
        </div>
        {MEMORY_IMAGES.map((src, i) => (
          <div
            key={i}
            className={styles.imageBox}
            ref={(el) => { imgRefs.current[i] = el; }}
          >
            <Image
              alt={`Memory ${i + 1}`}
              src={`/${src}`}
              width={400}
              height={500}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
