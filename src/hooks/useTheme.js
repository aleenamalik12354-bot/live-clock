import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const getInitialTheme = () => {
            const now = new Date();
            const hours = now.getHours();
            // 6 AM to 6 PM (18:00) -> Light Mode
            // Otherwise -> Dark Mode
            const isDayTime = hours >= 6 && hours < 18;
            return isDayTime ? 'light' : 'dark';
        };

        const initialTheme = getInitialTheme();
        setTheme(initialTheme);
        document.body.className = initialTheme;
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            document.body.className = newTheme;
            return newTheme;
        });
    };

    return { theme, toggleTheme };
};
