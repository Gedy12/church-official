'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

import styles from '../styles/Donate.module.css';

const Donate = () => {
    const { translations } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const t = translations.donate;

    if (!t) return null;

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="donate" className={styles.donateSection} ref={ref}>
            <div className="container">
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                    transition={{ duration: 0.6 }}
                    className="row justify-content-center"
                >
                    <div className="col-lg-10"> {/* Wider column for grid */}

                        <div className={styles.card}>
                            <div className="d-flex flex-column align-items-center">
                                <h2 className={styles.sectionTitle}>{t.sectionTitle}</h2>
                                <div className={styles.titleUnderline}></div>

                                <p className={styles.textContent}>
                                    {t.content}
                                </p>
                            </div>

                            {t.accounts && t.accounts.length > 0 && (
                                <div className={styles.bankInfoContainer}>
                                    <h3 className={styles.bankTitle}>{t.bankSectionTitle}</h3>
                                    <div className={styles.banksGrid}>
                                        {t.accounts.map((account: any, index: number) => (
                                            <div key={index} className={styles.bankItem}>
                                                <div className={styles.bankName}>{account.bankName}</div>
                                                <div className="text-center">
                                                    <div className={styles.accountNumber}>{account.accountNumber}</div>
                                                    <small className="text-muted">{account.accountName}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Donate;
