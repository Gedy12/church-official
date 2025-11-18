'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from '../styles/Contact.module.css';

const Contact = () => {
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

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'hiyawqal@gmail.com',
      link: 'mailto:hiyawqal@gmail.com'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1(206) 609 6878',
      link: 'tel:+12066096878'
    },
    {
      icon: '📍',
      title: 'Location',
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
          <h2 className={styles.sectionTitle}>Connect With Our Church</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.sectionSubtitle}>
            We're here to serve you. Reach out for prayer, spiritual guidance, or to learn more about our community.
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
                  <h3>Prayer Request Sent!</h3>
                  <p>Thank you for reaching out. We'll pray for you and get back to you soon with God's blessings.</p>
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
                        <label htmlFor="name" className={styles.formLabel}>Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className={styles.formInput}
                          placeholder="Enter your full name"
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
                        <label htmlFor="email" className={styles.formLabel}>Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className={styles.formInput}
                          placeholder="Enter your email address"
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
                    <label htmlFor="message" className={styles.formLabel}>Your Message or Prayer Request</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className={styles.formTextarea}
                      placeholder="Share your prayer requests, questions about our church, or how we can support you spiritually..."
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
                        Your Message Is Sending ...
                      </>
                    ) : (
                      <>
                        Send
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
                <h3 className={styles.infoTitle}>Church Contact Information</h3>
                <p className={styles.infoSubtitle}>
                  Reach out to Ethiopian Living Word Evangelical Church through any of these contacts
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