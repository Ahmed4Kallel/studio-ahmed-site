"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Testimonials.module.css";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    image: "/girl1.jpeg",
    text: "This camera completely transformed my photography journey. The image quality is absolutely stunning and the colors are so vibrant and true to life. Every shot I take feels professional and polished, capturing moments with incredible clarity and depth.",
    name: "Sarah Johnson",
    rotate: 3,
  },
  {
    image: "/girl2.jpeg",
    text: "Best investment I've made for my work. The clarity and detail in every shot is remarkable, allowing me to capture the finest nuances in lighting and texture. My clients are consistently impressed with the quality of images I deliver.",
    name: "Michael Chen",
    rotate: -2,
  },
  {
    image: "/man1.jpeg",
    text: "Professional quality that exceeds expectations. Easy to use yet incredibly powerful, this camera has become an essential tool in my creative process. The versatility and performance in various lighting conditions is simply outstanding.",
    name: "Emma Williams",
    rotate: 4,
  },
  {
    image: "/girl3.jpeg",
    text: "Outstanding performance in every condition. This camera never disappoints, whether I'm shooting in bright daylight or challenging low-light environments. The reliability and consistent results have made it my go-to choice for all projects.",
    name: "David Martinez",
    rotate: -3,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const imagesRef = useRef(null);
  const textRefs = useRef([]);
  const nameRefs = useRef([]);
  const counterRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const ctx = gsap.context(() => {
      const imgs = imagesRef.current?.querySelectorAll("img");

      testimonials.forEach((_, s) => {
        if (s >= testimonials.length - 1) return;

        const imgToAnimate = imgs?.[testimonials.length - 1 - s];
        const xDir = s % 2 === 0 ? (isMobile ? -80 : -200) : (isMobile ? 80 : 200);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start:
            s === 0
              ? "top+=0% top"
              : s === testimonials.length - 2
              ? `top+=${(s - 1) * 150 + 150 + 50}% top`
              : `top+=${150 * s}% top`,
          end:
            s === 0
              ? "top+=150% top"
              : s === testimonials.length - 2
              ? `top+=${(s - 1) * 150 + 150 + 100}% top`
              : `top+=${(s + 1) * 150}% top`,
          onEnter: () => {
            gsap.to(textRefs.current[s], { opacity: 0, x: -30, duration: 0.4 });
            gsap.to(textRefs.current[s + 1], { opacity: 1, x: 0, duration: 0.4 });
            gsap.to(nameRefs.current[s], { opacity: 0, duration: 0.4 });
            gsap.to(nameRefs.current[s + 1], { opacity: 1, duration: 0.4 });

            if (imgToAnimate) {
              gsap.to(imgToAnimate, {
                x: xDir,
                opacity: 0,
                rotation: `+=${xDir > 0 ? -15 : 15}`,
                duration: 0.4,
              });
            }

            imgs?.forEach((img, idx) => {
              if (idx !== testimonials.length - 1 - s) {
                gsap.to(img, {
                  rotation: `+=${idx % 2 === 0 ? -3 : 3}`,
                  duration: 0.4,
                });
              }
            });

            if (counterRef.current) {
              counterRef.current.innerHTML = `${s + 2}/<span class="${styles.totalCount}">04</span>`;
            }
          },
          onLeaveBack: () => {
            gsap.to(textRefs.current[s], { opacity: 1, x: 0, duration: 0.4 });
            gsap.to(textRefs.current[s + 1], { opacity: 0, x: -30, duration: 0.4 });
            gsap.to(nameRefs.current[s], { opacity: 1, duration: 0.4 });
            gsap.to(nameRefs.current[s + 1], { opacity: 0, duration: 0.4 });

            if (imgToAnimate) {
              gsap.to(imgToAnimate, {
                x: 0,
                opacity: 1,
                rotation: `-=${xDir > 0 ? -15 : 15}`,
                duration: 0.4,
              });
            }

            imgs?.forEach((img, idx) => {
              if (idx !== testimonials.length - 1 - s) {
                gsap.to(img, {
                  rotation: `-=${idx % 2 === 0 ? -3 : 3}`,
                  duration: 0.4,
                });
              }
            });

            if (counterRef.current) {
              counterRef.current.innerHTML = `${s + 1}/<span class="${styles.totalCount}">04</span>`;
            }
          },
        });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        pinSpacing: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className={styles.section}>
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={styles.quoteTopLeft} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
      </svg>
      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={styles.quoteBottomRight} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
      </svg>

      <div className={styles.container}>
        <div ref={imagesRef} className={styles.images}>
          {testimonials.map((t, i) => (
            <img
              key={i}
              src={t.image}
              alt={t.name}
              className={styles.image}
              style={{
                transform: `rotate(${t.rotate}deg)`,
                top: "50px",
                left: "50px",
                zIndex: i + 1,
              }}
            />
          ))}
        </div>

        <div className={styles.content}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => { if (el) textRefs.current[i] = el; }}
              className={styles.item}
              style={{
                opacity: i === 0 ? 1 : 0,
                transform: i === 0 ? "translateX(0)" : "translateX(-30px)",
              }}
            >
              <p className={styles.text}>&quot;{t.text}&quot;</p>
            </div>
          ))}

          <div className={styles.nameContainer}>
            {testimonials.map((t, i) => (
              <p
                key={i}
                ref={(el) => { if (el) nameRefs.current[i] = el; }}
                className={styles.name}
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                {t.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.divider} />
      <div ref={counterRef} className={styles.counter}>
        1/<span className={styles.totalCount}>04</span>
      </div>
      <div className={styles.bottomDivider} />
    </section>
  );
}
