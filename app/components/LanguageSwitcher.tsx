'use client';

import { useLanguage, Language } from '../context/LanguageContext';

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
    };

    const languages: { code: Language; label: string; flag: string }[] = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'am', label: 'Amharic', flag: '🇪🇹' },
        { code: 'om', label: 'Oromo', flag: 'Om' }, // Using tree for Oromo for now or generic flag
    ];

    // Oromo flag is often represented by the Gadaa flag colors (Black, Red, White) 
    // or simple Ethiopian flag for region. Let's use generic Ethiopia for now or no flag if preferred.
    // The user requested "Ethiopian language, Amharic and Oromo"
    // Let's use the Ethiopian flag for both or distinct if available text-wise.
    // Actually, standard emoji for Oromo isn't standard country flag.
    // I will stick to text codes or labels if icons look bad, but let's try emojis first.

    return (
        <div className="dropdown">
            <button
                className="btn btn-link text-decoration-none dropdown-toggle d-flex align-items-center"
                type="button"
                id="languageDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: 'inherit' }}
            >
                <span className="me-1">{languages.find(l => l.code === language)?.flag}</span>
                <span className="d-none d-md-inline">{languages.find(l => l.code === language)?.label}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                {languages.map((lang) => (
                    <li key={lang.code}>
                        <button
                            className={`dropdown-item d-flex align-items-center ${language === lang.code ? 'active' : ''}`}
                            onClick={() => handleLanguageChange(lang.code)}
                        >
                            <span className="me-2">{lang.flag}</span>
                            {lang.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LanguageSwitcher;
