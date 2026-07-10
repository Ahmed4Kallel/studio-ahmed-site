"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Capture.module.css";

export default function Capture() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [sliding, setSliding] = useState(false);
  const [rotated, setRotated] = useState(false);

  const handleSlidePrev = () => {
    swiperRef.current?.slidePrev();
    setSliding(true);
    setRotated(false);
    setTimeout(() => setSliding(false), 1200);
  };

  const handleSlideNext = () => {
    swiperRef.current?.slideNext();
    setSliding(true);
    setRotated(true);
    setTimeout(() => setSliding(false), 1200);
  };

  return (
    <section id="capture" data-section="capture" className={styles.section}>
      <div className={styles.sideContent}>
        <h3 className={styles.sideTitle}>
          High-performance DSLRs, mirrorless, and compact cameras for every level.
        </h3>
        <div className={styles.avatarsContainer}>
          <div className={styles.avatarsGroup}>
            <img src="/avatar1.jpg" alt="User 1" className={styles.avatar} />
            <img src="/avatar2.jpg" alt="User 2" className={styles.avatar} />
            <img src="/avatar3.jpg" alt="User 3" className={styles.avatar} />
          </div>
          <span className={styles.avatarsText}>Trusted by 10,000+ photographers</span>
        </div>
      </div>

      <span className={styles.badge}>EXPLORE</span>
      <h2 className={styles.title}>CAPTURE</h2>

      <div className={styles.swiperContainer}>
        <button ref={prevRef} onClick={handleSlidePrev} className={`${styles.swiperButton} ${styles.swiperButtonPrev}`}>
          &#8592;
        </button>
        <div className={styles.swiper}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={1200}
            slidesPerView={1}
            speed={1200}
            onSwiper={(s) => { swiperRef.current = s; }}
            onSlideChangeTransitionStart={() => { setSliding(true); setRotated(true); }}
            onSlideChangeTransitionEnd={() => setSliding(false)}
          >
            <SwiperSlide className={`${styles.swiperSlide} ${styles.firstSlide} ${sliding ? styles.sliding : ""}`}>
              <Image alt="Hero Camera" src="/heroCamera.png" width={900} height={700} />
            </SwiperSlide>
            <SwiperSlide className={`${styles.swiperSlide} ${styles.secondSlide} ${rotated ? styles.rotated : ""}`}>
              <Image alt="Camera Product" src="/cameraProd.png" width={900} height={700} />
            </SwiperSlide>
          </Swiper>
        </div>
        <button ref={nextRef} onClick={handleSlideNext} className={`${styles.swiperButton} ${styles.swiperButtonNext}`}>
          &#8594;
        </button>
      </div>
    </section>
  );
}
