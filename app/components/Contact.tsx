'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from '../styles/Contact.module.css';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { translations } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.58, 1] as any
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.58, 1] as any
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.58, 1] as any
      }
    }
  };

  const t = translations.contact;

  if (!t) return null;

  const contactInfo = [
    {
      icon: '📧',
      title: t.info.emailTitle,
      value: 'hiyawqal@gmail.com',
      link: 'mailto:hiyawqal@gmail.com'
    },
    {
      icon: '📱',
      title: t.info.phoneTitle,
      value: '+1(206) 609 6878',
      link: 'tel:+12066096878'
    },
    {
      icon: '📍',
      title: t.info.locationTitle,
      value: 'America Seattle, WA',
      link: 'https://maps.google.com'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className={styles.contactSection} ref={ref}>
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-4"
        >
          <h2 className={styles.sectionTitle}>{t.sectionTitle}</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.sectionSubtitle}>
            {t.sectionSubtitle}
          </p>
        </motion.div>

        <div className="row align-items-stretch">
          {/* Contact Form - Left Side */}
          <motion.div
            className="col-lg-7 col-md-6 mb-4 mb-md-0"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInLeft}
          >
            <div className={styles.formContainer}>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={styles.successMessage}
                >
                  <div className={styles.successIcon}>🙏</div>
                  <h3>{t.form.successTitle}</h3>
                  <p>{t.form.successMessage}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={fadeInUp}
                        transition={{ delay: 0.1 }}
                        className={styles.formGroup}
                      >
                        <label htmlFor="name" className={styles.formLabel}>{t.form.nameLabel}</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className={styles.formInput}
                          placeholder={t.form.namePlaceholder}
                        />
                      </motion.div>
                    </div>
                    <div className="col-md-6">
                      <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                        className={styles.formGroup}
                      >
                        <label htmlFor="email" className={styles.formLabel}>{t.form.emailLabel}</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className={styles.formInput}
                          placeholder={t.form.emailPlaceholder}
                        />
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    transition={{ delay: 0.3 }}
                    className={styles.formGroup}
                  >
                    <label htmlFor="message" className={styles.formLabel}>{t.form.messageLabel}</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className={styles.formTextarea}
                      placeholder={t.form.messagePlaceholder}
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitButton}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    transition={{ delay: 0.4 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 8px 25px rgba(0, 123, 255, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className={styles.loadingSpinner}
                        >
                          ⏳
                        </motion.span>
                        {t.form.sendingButton}
                      </>
                    ) : (
                      <>
                        {t.form.submitButton}
                        <motion.span
                          className={styles.sendIcon}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          ✝️
                        </motion.span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info - Right Side */}
          <motion.div
            className="col-lg-5 col-md-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInRight}
          >
            <div className={styles.infoContainer}>
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className={styles.contactInfo}
              >
                <h3 className={styles.infoTitle}>{t.info.title}</h3>
                <p className={styles.infoSubtitle}>
                  {t.info.subtitle}
                </p>

                <div className={styles.contactList}>
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      variants={fadeInUp}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={styles.contactItem}
                    >
                      <motion.div
                        className={styles.contactIcon}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      <div className={styles.contactDetails}>
                        <h4 className={styles.contactTitle}>{item.title}</h4>
                        {item.link ? (
                          <a
                            href={item.link}
                            className={styles.contactValue}
                            target={item.link.startsWith('http') ? '_blank' : '_self'}
                            rel={item.link.startsWith('http') ? 'noopener noreferrer' : ''}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className={styles.contactValue}>{item.value}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;