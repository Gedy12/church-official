'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from '../styles/Services.module.css';

const Services = () => {
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

  const services = [
    {
      icon: '',
      title: 'The Founding of the Church',
      description: 'The Founding of the Church (September 18, 1992 — Friday) In obedience to the heavenly vision, Rev. Fekadu A. Shone formally organized the Living Word Evangelical Church on September 18, 1992, a Friday. The ministry began humbly—with prayer, fasting, and total dependence on God—but with a clear mission: to preach the Living Word of God, demonstrate the power of the Holy Spirit, and raise disciples rooted in truth and holiness. “The grass withers, the flower fades, but the Word of our God stands forever.” — Isaiah 40:8.',
    },
    {
      icon: '',
      title: 'Affiliation with the Church of God of Prophecy',
      description: 'March 4, 1996 After four years of independent service and growing influence, the church affiliated with the Church of God of Prophecy on March 4, 1996. This affiliation established doctrinal unity with the international Pentecostal fellowship and expanded its spiritual and organizational foundation. The partnership strengthened training, leadership development, and missionary outreach, connecting the Ethiopian work with a worldwide body committed to holiness, prophecy, and the power of the Holy Spirit. “For the earth shall be filled with the knowledge of the glory of the Lord, as the waters cover the sea.” — Habakkuk 2:14.',
    },
    {
      icon: '',
      title: ' Present Status and Ministry Focus',
      description: 'Today, the Ethiopian Living Word Evangelical Church of God of Prophecy continues its mission to preach the Living Word, raise the next generation in truth, and serve the nation through spiritual and social programs. The vision of 1975 still burns brightly, carried by faith, prayer, and the unchanging Word of God. “Jesus Christ is the same yesterday, today, and forever.” — Hebrews 13:8.',
    }
  ];

  return (
    <section id="services" className={styles.servicesSection} ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className={styles.sectionTitle}>Our Journey</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.sectionSubtitle}>
            Summary History of the Ethiopian Living Word Evangelical Church of God of Prophecy
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="row g-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
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