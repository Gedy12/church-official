'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from '../styles/About.module.css';
import { useLanguage } from '../context/LanguageContext';

const AnimatedAbout = () => {
  const { translations } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Simple animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  const t = translations.about;

  if (!t) return null;

  return (
    <section id="about" className={styles.aboutSection} ref={ref}>
      <div className="container">
        {/* Compact Heading Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.9 }}
          className="text-center mb-4"
        >
          <h2 className={styles.sectionTitle}>{t.sectionTitle}</h2>
          <div className={styles.titleUnderline}></div>
        </motion.div>

        <div className="row align-items-center">
          {/* Compact Image Column */}
          <motion.div
            className="col-lg-4 col-md-5 mb-4 mb-md-0"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInLeft}
            transition={{ duration: 0.9 }}
          >
            <motion.div
              className={styles.imageContainer}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/fikadu.jpg"
                alt="Software Engineering Student & Developer"
                width={300}
                height={350}
                className={styles.profileImage}
                priority
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayContent}>
                  <span className={styles.overlayText}>{t.name}</span>
                  <span className={styles.overlaySubtext}>{t.role}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Compact Content Column */}
          <motion.div
            className="col-lg-8 col-md-7"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInRight}
            transition={{ duration: 0.9 }}
          >
            <div className={styles.contentCard}>
              <div className={styles.contentHeader}>
                <motion.h3
                  variants={fadeInUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.3 }}
                  className={styles.greeting}
                >
                  <span className={styles.nameHighlight}>{t.name}</span>
                </motion.h3>

                <motion.p
                  variants={fadeInUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.5 }}
                  className={styles.title}
                >
                  {t.role}
                </motion.p>
              </div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 0.6 }}
                className={styles.description}
              >
                <p>
                  {t.biography.p1}
                </p>

                <p>
                  {t.biography.p2}
                </p>

                <p>
                  {t.biography.p3}
                </p>

              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedAbout;