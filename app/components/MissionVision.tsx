'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from '../styles/MissionVision.module.css';
import { useLanguage } from '../context/LanguageContext';

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration / 16); // 60fps
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const MissionVision = () => {
  const { translations } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const t = translations.missionVision;

  if (!t) return null;

  const valuesData = [
    {
      icon: '🏛️',
      title: t.impact.church.title,
      desc: t.impact.church.desc,
      count: 81,
      suffix: '+',
      color: '#4F46E5', // Indigo
      duration: 2000
    },
    {
      icon: '👥',
      title: t.impact.members.title,
      desc: t.impact.members.desc,
      count: 42000,
      suffix: '+',
      color: '#10B981', // Emerald
      duration: 2500
    },
    {
      icon: 'logo',
      title: t.impact.logo.title,
      desc: t.impact.logo.desc,
      isImage: true,
      color: '#F59E0B' // Amber
    },
    {
      icon: '🌐',
      title: t.impact.language.title,
      desc: t.impact.language.desc,
      count: 3,
      suffix: '',
      color: '#00b5fdff', // Red
      duration: 1800
    }
  ];

  return (
    <section id="mission" className={styles.missionVisionSection} ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-4"
        >
          <h2 className={styles.sectionTitle}>{t.title}</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.sectionSubtitle}>
            {t.subtitle}
          </p>
        </motion.div>

        <div className="row align-items-stretch">
          {/* Mission Block - Left Side */}
          <motion.div
            className="col-lg-6 col-md-6 mb-4 mb-md-0"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInLeft}
          >
            <motion.div
              className={styles.contentBlock}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Mission Content */}
              <div className={styles.blockContent}>
                <h3 className={styles.blockTitle}>{t.vision.title}</h3>
                <p className={styles.blockDescription}>
                  {t.vision.description}
                  <br />
                  {t.vision.quote}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Gradient Divider - Visible only on desktop */}
          <motion.div
            className={`col-1 ${styles.dividerContainer} d-none d-lg-block`}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.gradientDivider}></div>
          </motion.div>

          {/* Vision Block - Right Side */}
          <motion.div
            className="col-lg-5 col-md-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInRight}
          >
            <motion.div
              className={styles.contentBlock}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Vision Content */}
              <div className={styles.blockContent}>
                <h3 className={styles.blockTitle}>{t.mission.title}</h3>
                <div className={styles.blockDescription}>
                  {t.mission.description}
                  <ul>
                    {t.mission.points.map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                  {t.mission.quote}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Values Footer */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ delay: 0.8 }}
          className={styles.valuesFooter}
        >
          <div className={styles.valuesContainer}>
            <h4 className={styles.valuesTitle}>{t.impact.title}</h4>
            <div className="row g-4">
              {valuesData.map((value, index) => (
                <div key={value.title} className="col-lg-3 col-md-6">
                  <motion.div
                    className={styles.valueItem}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={scaleIn}
                    transition={{ delay: 1 + index * 0.1 }}
                    style={{
                      borderLeft: `4px solid ${value.color}`,
                      background: 'var(--card-bg)'
                    }}
                  >
                    <div className={styles.valueIcon}>
                      {value.isImage ? (
                        <img
                          src="/new-logo.png"
                          alt="ELWECGP Logo"
                          className={styles.logoImage}
                        />
                      ) : (
                        <span style={{ fontSize: '2.5rem' }}>{value.icon}</span>
                      )}
                    </div>

                    {value.count !== undefined ? (
                      <motion.h5
                        className={styles.valueNumber}
                        style={{ color: value.color }}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{
                          delay: 1.2 + index * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <AnimatedCounter
                          end={value.count}
                          duration={value.duration}
                          suffix={value.suffix || ''}
                        />
                      </motion.h5>
                    ) : null}

                    <h5 className={styles.valueTitle}>{value.title}</h5>
                    <p className={styles.valueDesc}>{value.desc}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVision;