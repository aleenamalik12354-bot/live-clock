import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './SunMoonTracker.css';

function SunMoonTracker() {
    const { t } = useLanguage();
    const [time, setTime] = useState(new Date());
    const [celestialData, setCelestialData] = useState({
        position: 0,
        type: 'sun',
        phase: 'day'
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const totalMinutes = hours * 60 + minutes;

        // Calculate position and determine sun/moon
        let position, type, phase;

        // Sunrise: 6 AM (360 minutes)
        // Noon: 12 PM (720 minutes)
        // Sunset: 6 PM (1080 minutes)
        // Midnight: 12 AM (0 or 1440 minutes)

        if (hours >= 6 && hours < 18) {
            // Daytime - show sun
            type = 'sun';
            // Calculate sun position from 6 AM to 6 PM (0% to 100%)
            const dayMinutes = totalMinutes - 360; // Minutes since 6 AM
            const dayDuration = 720; // 12 hours in minutes
            position = (dayMinutes / dayDuration) * 100;

            if (hours >= 6 && hours < 9) phase = 'sunrise';
            else if (hours >= 9 && hours < 15) phase = 'day';
            else phase = 'sunset';
        } else {
            // Nighttime - show moon
            type = 'moon';
            // Calculate moon position
            if (hours >= 18) {
                // Evening to midnight (6 PM to 12 AM)
                const nightMinutes = totalMinutes - 1080; // Minutes since 6 PM
                const nightDuration = 360; // 6 hours in minutes
                position = (nightMinutes / nightDuration) * 100;
            } else {
                // Midnight to sunrise (12 AM to 6 AM)
                const nightMinutes = totalMinutes + 360; // Adjusted minutes
                const nightDuration = 360; // 6 hours in minutes
                position = (nightMinutes / nightDuration) * 100;
            }
            phase = 'night';
        }

        setCelestialData({ position, type, phase });
    }, [time]);

    const getTimeOfDay = () => {
        const hours = time.getHours();
        if (hours >= 6 && hours < 9) return t('sunMoon.sunrise');
        if (hours >= 9 && hours < 12) return t('sunMoon.morning');
        if (hours >= 12 && hours < 15) return t('sunMoon.afternoon');
        if (hours >= 15 && hours < 18) return t('sunMoon.sunset');
        if (hours >= 18 && hours < 21) return t('sunMoon.evening');
        return t('sunMoon.night');
    };

    // Calculate arc position (x, y coordinates)
    const getArcPosition = (percentage) => {
        // Arc goes from left (0%) to right (100%)
        // Using a semicircle path
        const angle = (percentage / 100) * Math.PI; // 0 to PI radians
        const x = 50 + (Math.cos(Math.PI - angle) * 40); // Center at 50%, radius 40%
        const y = 80 - (Math.sin(angle) * 40); // Bottom at 80%, arc upward
        return { x, y };
    };

    const position = getArcPosition(celestialData.position);

    return (
        <div className={`sun-moon-container phase-${celestialData.phase}`}>
            <h2 className="sun-moon-title">
                {celestialData.type === 'sun' ? '☀️' : '🌙'} {t('sunMoon.title')}
            </h2>

            <div className="sky-container">
                {/* Sky background with gradient */}
                <div className="sky-background"></div>

                {/* Arc path visualization */}
                <svg className="arc-path" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                        d="M 10 80 Q 50 20, 90 80"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        opacity="0.3"
                        strokeDasharray="2,2"
                    />
                </svg>

                {/* Sun or Moon */}
                <div
                    className={`celestial-body ${celestialData.type}`}
                    style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`
                    }}
                >
                    {celestialData.type === 'sun' ? (
                        <div className="sun">
                            <div className="sun-core"></div>
                            {[...Array(12)].map((_, i) => (
                                <div
                                    key={i}
                                    className="sun-ray"
                                    style={{ transform: `rotate(${i * 30}deg)` }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="moon">
                            <div className="moon-surface">
                                <div className="crater crater-1"></div>
                                <div className="crater crater-2"></div>
                                <div className="crater crater-3"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Ground/Horizon */}
                <div className="horizon"></div>
            </div>

            <div className="sun-moon-info">
                <div className="time-of-day">
                    <span className="time-label">{getTimeOfDay()}</span>
                </div>
                <div className="current-time">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
}

export default SunMoonTracker;
