'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from '../styles/About.module.css';

const AnimatedAbout = () => {
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

  return (
    <section id="about" className={styles.aboutSection} ref={ref}>
      <div className="container">
        {/* Compact Heading Section */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.9}}
          className="text-center mb-4"
        >
          <h2 className={styles.sectionTitle}>Our Leader</h2>
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
                src="/profile.jpg"
                alt="Software Engineering Student & Developer"
                width={300}
                height={350}
                className={styles.profileImage}
                priority
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayContent}>
                  <span className={styles.overlayText}>Bishop Dr. Fekadu Ayele Shone</span>
                  <span className={styles.overlaySubtext}>Bishop Dr. Fekadu Ayele Shone is the National Overseer for Ethiopia & Djibouti for the Church of God of Prophecy</span>
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
                  <span className={styles.nameHighlight}>Dr. Fekadu Ayele Shone</span>
                </motion.h3>
                
                <motion.p 
                  variants={fadeInUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: 0.5 }}
                  className={styles.title}
                >
                  Bishop Dr. Fekadu Ayele Shone is the National Overseer for Ethiopia & Djibouti for the Church of God of Prophecy
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
                  He was born on August 20, 1954, in Gudaya Jare District, Wollega, Oromia, Ethiopia. 
                  He was converted in February 1974, while 19 years old, and filled and Baptized by the Holy Ghost the same year. 
                  Most of his family and relatives have been believers since his conversion. He Married Beirut Deressa Mamede on May 7, 1978. The Lord has blessed them with six boys, two girls, three grandsons, and five granddaughters. 
                  Most of his family serve in Church work and evangelistic campaigns, doing more in support of his ministry. 
                </p>
                
                <p>
                  Bishop Dr. Fekadu founded The Ethiopian Living Word Evangelical Church with the guidance of divine
                  instruction given to him in October 1975. After sixteen years, on September 18, 1991, officially announced. 
                  In 1996, on March 4, he officially joined The Church of God of Prophecy and Ordained Bishop. 
                  Under his leadership, the ministry has expanded to over 84 congregations nationwide. His evangelistic experience,
                  pastoral judgment, and commitment to leadership development have strengthened the Church at every level.
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