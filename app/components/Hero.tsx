'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/Hero.module.css';
import { useLanguage } from '../context/LanguageContext';

interface Slide {
  backgroundImage: string;
  gradient: string;
  quote?: string;
  subheading: string;
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { translations } = useLanguage();

  const slides: Slide[] = translations.hero?.slides || [];

  // Auto-slide functionality with longer duration
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // Increased from 6s to 10s - Change slide every 10 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <section id="home" className={styles.heroSection}>
      {/* Background Slider */}
      <div className={styles.backgroundSlider}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className={styles.slide}
            style={{
              backgroundImage: `url(${slides[currentSlide].backgroundImage})`,
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              opacity: { duration: 1.5 } // Slower fade transition
            }}
          >
            {/* Gradient Overlay */}
            <div
              className={styles.gradientOverlay}
              style={{ background: slides[currentSlide].gradient }}
            />

            {/* Background Blur Effect */}
            <div className={styles.backgroundBlur} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className={styles.heroContent}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{
                    duration: 1.2, // Increased from 0.8s
                    delay: 0.5,   // Increased delay for smoother entrance
                    ease: "easeOut"
                  }}
                  className={styles.textContent}
                >
                  {slides[currentSlide].quote && (
                    <motion.h1
                      className={styles.heroQuote}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 1,
                        delay: 0.8, // Increased delay
                        ease: "easeOut"
                      }}
                    >
                      {slides[currentSlide].quote}
                    </motion.h1>
                  )}

                  <motion.p
                    className={styles.heroSubheading}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 1,
                      delay: 1.2, // Increased delay for sequential appearance
                      ease: "easeOut"
                    }}
                  >
                    {slides[currentSlide].subheading}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 1.8,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className={`${styles.navArrow} ${styles.prevArrow}`}
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        className={`${styles.navArrow} ${styles.nextArrow}`}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.paginationDot} ${index === currentSlide ? styles.active : ''
              }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;