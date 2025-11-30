import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSelector.css';

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
];

const LanguageSelector = () => {
    const { language, changeLanguage } = useLanguage();

    return (
        <div className="language-selector">
            <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="language-dropdown"
            >
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
