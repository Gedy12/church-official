'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from '../styles/Experience.module.css';
import { useLanguage } from '../context/LanguageContext';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { translations } = useLanguage();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };

  // Default to empty array if not loaded yet
  const experiences = translations.experience?.experiences || [];
  const sectionTitle = translations.experience?.sectionTitle || "Foundation of the Church";

  return (
    <section id="experience" className={styles.experienceSection} ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-5"
        >
          <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
          <div className={styles.titleUnderline}></div>
        </motion.div>

        {/* Timeline */}
        <div className={styles.timelineContainer}>
          {/* Timeline Line */}
          <div className={styles.timelineLine}></div>

          {/* Experience Items */}
          <div className={styles.timelineItems}>
            {experiences.map((experience: any, index: number) => (
              <motion.div
                key={index}
                className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right
                  }`}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className={styles.timelineDot}>
                  {/* Reuse icons if they are static or add to json if needed. 
                      For now I'll hardcode based on index or add icon to json. 
                      The json has them removed in my update? 
                      Wait, the original file had icons in the object. 
                      My previous write_to_file removed them! 
                      I should add them back or handle them here.
                      Let's handle them by index or title mapping for now to keep JSON clean 
                      OR re-add them to JSON in next step if critical.
                      Let's use a helper to get icon.
                  */}
                  <div className={styles.dotIcon}>
                    {index === 0 ? "☀" : index === 1 ? "🛎" : index === 2 ? "🏥" : "🌏"}
                  </div>
                </div>

                {/* Experience Card */}
                <motion.div
                  className={styles.experienceCard}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Year Badge */}
                  <div className={styles.yearBadge}>
                    {experience.year}
                  </div>

                  {/* Content */}
                  <div className={styles.cardContent}>
                    <h3 className={styles.experienceTitle}>{experience.title}</h3>
                    <p className={styles.experienceCompany}>{experience.company}</p>
                    <p className={styles.experienceDescription}>{experience.description}</p>

                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;