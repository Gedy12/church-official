'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

import enCommon from '../locales/en/common.json';
import enHero from '../locales/en/hero.json';
import enExperience from '../locales/en/experience.json';
import enMissionVision from '../locales/en/missionVision.json';
import enServices from '../locales/en/services.json';
import enAbout from '../locales/en/about.json';
import enContact from '../locales/en/contact.json';
import enFooter from '../locales/en/footer.json';
import enDonate from '../locales/en/donate.json';

// Define available languages
export type Language = 'en' | 'am' | 'om';

// Define structure for translation data
// Using any for flexibility as JSON structure varies by file
type Translations = Record<string, any>;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const defaultTranslations = {
    common: enCommon,
    hero: enHero,
    experience: enExperience,
    missionVision: enMissionVision,
    services: enServices,
    about: enAbout,
    contact: enContact,
    footer: enFooter,
    donate: enDonate
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');
    const [translations, setTranslations] = useState<Translations>(defaultTranslations);
    const isInitialized = useRef(false);

    // Initialize from local storage
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && ['en', 'am', 'om'].includes(savedLang)) {
            setLanguage(savedLang);
        }
        isInitialized.current = true;
    }, []);

    // Save to local storage
    useEffect(() => {
        if (isInitialized.current) {
            localStorage.setItem('language', language);
        }
    }, [language]);

    // Load translations when language changes
    useEffect(() => {
        const loadTranslations = async () => {
            try {
                let commonData, heroData, experienceData, missionVisionData, servicesData, aboutData, contactData, footerData, donateData;

                switch (language) {
                    case 'am':
                        commonData = await import('../locales/am/common.json');
                        heroData = await import('../locales/am/hero.json');
                        experienceData = await import('../locales/am/experience.json');
                        missionVisionData = await import('../locales/am/missionVision.json');
                        servicesData = await import('../locales/am/services.json');
                        aboutData = await import('../locales/am/about.json');
                        contactData = await import('../locales/am/contact.json');
                        footerData = await import('../locales/am/footer.json');
                        donateData = await import('../locales/am/donate.json');
                        break;
                    case 'om':
                        commonData = await import('../locales/om/common.json');
                        heroData = await import('../locales/om/hero.json');
                        experienceData = await import('../locales/om/experience.json');
                        missionVisionData = await import('../locales/om/missionVision.json');
                        servicesData = await import('../locales/om/services.json');
                        aboutData = await import('../locales/om/about.json');
                        contactData = await import('../locales/om/contact.json');
                        footerData = await import('../locales/om/footer.json');
                        donateData = await import('../locales/om/donate.json');
                        break;
                    case 'en':
                    default:
                        commonData = await import('../locales/en/common.json');
                        heroData = await import('../locales/en/hero.json');
                        experienceData = await import('../locales/en/experience.json');
                        missionVisionData = await import('../locales/en/missionVision.json');
                        servicesData = await import('../locales/en/services.json');
                        aboutData = await import('../locales/en/about.json');
                        contactData = await import('../locales/en/contact.json');
                        footerData = await import('../locales/en/footer.json');
                        donateData = await import('../locales/en/donate.json');
                        break;
                }

                setTranslations({
                    common: commonData.default || commonData,
                    hero: heroData.default || heroData,
                    experience: experienceData.default || experienceData,
                    missionVision: missionVisionData.default || missionVisionData,
                    services: servicesData.default || servicesData,
                    about: aboutData.default || aboutData,
                    contact: contactData.default || contactData,
                    footer: footerData.default || footerData,
                    donate: donateData.default || donateData
                });

            } catch (error) {
                console.error('Failed to load translations', error);
            }
        };

        loadTranslations();
    }, [language]);

    // Translation helper function
    // Supports nested keys: t("hero.title")
    const t = (key: string): string => {
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // Fallback to key if not found
            }
        }

        if (typeof value === 'string') return value;
        return key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
