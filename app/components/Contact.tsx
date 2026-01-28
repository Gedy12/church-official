'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';

import styles from '../styles/Contact.module.css';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { translations } = useLanguage();

  const sectionRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-10%',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ================= Animations ================= */

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.58, 1] as any,
      },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.58, 1] as any,
      },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0, 0, 0.58, 1] as any,
      },
    },
  };

  const t = translations.contact;

  if (!t) return null;

  /* ================= Contact Info ================= */

  const contactInfo = [
    {
      icon: '📧',
      title: t.info.emailTitle,
      value: 'hiyawqal@gmail.com',
      link: 'mailto:hiyawqal@gmail.com',
    },
    {
      icon: '📱',
      title: t.info.phoneTitle,
      value: '+1(206) 609 6878',
      link: 'tel:+12066096878',
    },
    {
      icon: '📍',
      title: t.info.locationTitle,
      value: 'America Seattle, WA',
      link: 'https://maps.google.com',
    },
  ];

  /* ================= Submit Handler ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setIsSubmitted(true);
      formRef.current.reset();

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= UI ================= */

  return (
    <section
      id="contact"
      className={styles.contactSection}
      ref={sectionRef}
    >
      <div className="container">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
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

          {/* ================= FORM ================= */}
          <motion.div
            className="col-lg-7 col-md-6 mb-4 mb-md-0"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideInLeft}
          >
            <div className={styles.formContainer}>

              {isSubmitted ? (

                /* Success Message */
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

                /* Form */
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className={styles.contactForm}
                >
                  <div className="row g-3">

                    {/* Name */}
                    <div className="col-md-6">
                      <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        transition={{ delay: 0.1 }}
                        className={styles.formGroup}
                      >
                        <label
                          htmlFor="name"
                          className={styles.formLabel}
                        >
                          {t.form.nameLabel}
                        </label>

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

                    {/* Email */}
                    <div className="col-md-6">
                      <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate={isInView ? 'visible' : 'hidden'}
                        transition={{ delay: 0.2 }}
                        className={styles.formGroup}
                      >
                        <label
                          htmlFor="email"
                          className={styles.formLabel}
                        >
                          {t.form.emailLabel}
                        </label>

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

                  {/* Message */}
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    transition={{ delay: 0.3 }}
                    className={styles.formGroup}
                  >
                    <label
                      htmlFor="message"
                      className={styles.formLabel}
                    >
                      {t.form.messageLabel}
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className={styles.formTextarea}
                      placeholder={t.form.messagePlaceholder}
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitButton}
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <>
                        ⏳ {t.form.sendingButton}
                      </>
                    ) : (
                      <>
                        {t.form.submitButton}
                        <span className={styles.sendIcon}> ✝️</span>
                      </>
                    )}
                  </motion.button>

                </form>
              )}

            </div>
          </motion.div>

          {/* ================= INFO ================= */}
          <motion.div
            className="col-lg-5 col-md-6"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideInRight}
          >
            <div className={styles.infoContainer}>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ delay: 0.2 }}
                className={styles.contactInfo}
              >
                <h3 className={styles.infoTitle}>
                  {t.info.title}
                </h3>

                <p className={styles.infoSubtitle}>
                  {t.info.subtitle}
                </p>

                <div className={styles.contactList}>

                  {contactInfo.map((item, index) => (

                    <motion.div
                      key={item.title}
                      variants={fadeInUp}
                      initial="hidden"
                      animate={isInView ? 'visible' : 'hidden'}
                      transition={{
                        delay: 0.3 + index * 0.1,
                      }}
                      className={styles.contactItem}
                    >
                      <div className={styles.contactIcon}>
                        {item.icon}
                      </div>

                      <div className={styles.contactDetails}>
                        <h4 className={styles.contactTitle}>
                          {item.title}
                        </h4>

                        <a
                          href={item.link}
                          className={styles.contactValue}
                          target={
                            item.link.startsWith('http')
                              ? '_blank'
                              : '_self'
                          }
                          rel="noopener noreferrer"
                        >
                          {item.value}
                        </a>

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