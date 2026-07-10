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

    if (isMobile) {
      const ctx = gsap.context(() => {
        const positions = [
          { x: -90, y: -70, rotate: -5 },
          { x: 90, y: -60, rotate: 4 },
          { x: -110, y: 10, rotate: -3 },
          { x: 100, y: 0, rotate: 6 },
          { x: -80, y: 70, rotate: 2 },
          { x: 0, y: 0, rotate: 0, hidden: true },
          { x: 0, y: 0, rotate: 0, hidden: true },
          { x: 0, y: 0, rotate: 0, hidden: true },
        ];

        imgRefs.current.forEach((img, i) => {
          if (!img) return;
          gsap.set(img, { opacity: 0, scale: 0.5, x: 0, y: 0, rotation: 0 });
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            imgRefs.current.forEach((img, i) => {
              if (!img) return;
              const pos = positions[i] || { x: 0, y: 0, rotate: 0, hidden: true };
              if (pos.hidden) return;
              gsap.to(img, {
                opacity: 1,
                scale: 1,
                x: pos.x,
                y: pos.y,
                rotation: pos.rotate,
                duration: 0.5,
                delay: i * 0.06,
                ease: "back.out(1.7)",
              });
            });
          },
        });
      });
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=8000",
        pin: true,
        pinSpacing: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=8000",
          scrub: 1,
        },
      });

      tl.fromTo(
        imgRefs.current[0],
        { opacity: 0, scale: 0, x: 0, y: 0 },
        { opacity: 1, scale: 1, x: -200, y: 0, duration: 1 },
        0
      );
      tl.fromTo(
        imgRefs.current[1],
        { opacity: 0, scale: 0, x: 0, y: 0 },
        { opacity: 1, scale: 1, x: 200, y: 0, duration: 1 },
        0
      );

      tl.to(imgRefs.current[0], { x: -350, duration: 1 }, 1);
      tl.to(imgRefs.current[1], { x: 350, duration: 1 }, 1);

      tl.fromTo(
        imgRefs.current[2],
        { opacity: 0, scale: 0, x: 0, y: 0 },
        { opacity: 1, scale: 0.75, x: -160, y: -95, duration: 1 },
        1
      );
      tl.fromTo(
        imgRefs.current[3],
        { opacity: 0, scale: 0, x: 0, y: 0 },
        { opacity: 1, scale: 1.25, x: 245, y: -200, duration: 1 },
        1
      );
      tl.fromTo(
        imgRefs.current[4],
        { opacity: 0, scale: 0, x: 0, y: 0 },
        { opacity: 1, scale: 1.15, x: -235, y: 185, duration: 1 },
        1
      );
      tl.fromTo(
        imgRefs.current[5],
        { opacity: 0, scale: 0, x: 0, y: 0 },
        { opacity: 1, scale: 0.85, x: 175, y: 125, duration: 1 },
        1
      );

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
