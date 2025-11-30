import { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import ur from '../locales/ur.json';
import ar from '../locales/ar.json';
import zh from '../locales/zh.json';
import es from '../locales/es.json';

const translations = { en, ur, ar, zh, es };

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('language');
        if (savedLang && translations[savedLang]) {
            setLanguage(savedLang);
            updateDirection(savedLang);
        }
    }, []);

    const updateDirection = (lang) => {
        // Set RTL for Arabic and Urdu
        if (lang === 'ar' || lang === 'ur') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
    };

    const changeLanguage = (lang) => {
        if (translations[lang]) {
            setLanguage(lang);
            localStorage.setItem('language', lang);
            updateDirection(lang);
        }
    };

    const t = (path) => {
        const keys = path.split('.');
        let value = translations[language];

        for (const key of keys) {
            value = value?.[key];
        }

        return value || path;
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
