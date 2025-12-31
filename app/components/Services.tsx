'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from '../styles/Services.module.css';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
  const { translations } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const t = translations.services;

  if (!t) return null;

  const services = t.items.map((item: any) => ({
    ...item,
    icon: '' // Preserving the empty icon structure from original
  }));

  return (
    <section id="services" className={styles.servicesSection} ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial="visible"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className={styles.sectionTitle}>{t.title}</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.sectionSubtitle}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="row g-4"
          variants={staggerContainer}
          initial="visible"
          animate="visible"
        >
          {services.map((service: any, index: number) => (
            <motion.div
              key={service.title}
              className="col-lg-4 col-md-6"
              variants={cardVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className={styles.serviceCard}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Service Icon */}
                <motion.div
                  className={styles.serviceIcon}
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {service.icon}
                </motion.div>

                {/* Service Content */}
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>

                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;