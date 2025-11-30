import { useState, useEffect } from 'react';
import { themes } from '../data/themes';
import './ThemeSelector.css';

const ThemeSelector = ({ onThemeChange }) => {
    const [selectedTheme, setSelectedTheme] = useState('dark');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Load saved theme
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme && themes[savedTheme]) {
            setSelectedTheme(savedTheme);
            applyTheme(savedTheme);
        }
    }, []);

    const applyTheme = (themeKey) => {
        const theme = themes[themeKey];
        const root = document.documentElement;

        root.style.setProperty('--bg-color', theme.background);
        root.style.setProperty('--text-color', theme.color);
        root.style.setProperty('--clock-bg', theme.clockBg);
        root.style.setProperty('--clock-border', theme.clockBorder);
        root.style.setProperty('--clock-glow', theme.clockGlow);

        if (theme.blur) {
            root.style.setProperty('--blur-amount', theme.blur);
        }

        document.body.style.background = theme.background;
        document.body.style.color = theme.color;

        localStorage.setItem('selectedTheme', themeKey);

        if (onThemeChange) {
            onThemeChange(themeKey);
        }
    };

    const handleThemeSelect = (themeKey) => {
        setSelectedTheme(themeKey);
        applyTheme(themeKey);
        setIsOpen(false);
    };

    return (
        <div className="theme-selector-container">
            <button
                className="theme-selector-btn"
                onClick={() => setIsOpen(!isOpen)}
            >
                🎨 {themes[selectedTheme].name}
            </button>

            {isOpen && (
                <div className="theme-dropdown">
                    {Object.entries(themes).map(([key, theme]) => (
                        <div
                            key={key}
                            className={`theme-option ${selectedTheme === key ? 'active' : ''}`}
                            onClick={() => handleThemeSelect(key)}
                        >
                            <div
                                className="theme-preview"
                                style={{ background: theme.clockBg, borderColor: theme.clockBorder }}
                            ></div>
                            <span>{theme.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
