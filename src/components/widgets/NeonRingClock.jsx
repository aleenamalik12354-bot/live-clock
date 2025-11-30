import { useState, useEffect } from 'react';
import './NeonRingClock.css';

function NeonRingClock({ timezone = 'Asia/Karachi' }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getTimeValues = () => {
        const timeString = time.toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const [hours, minutes, seconds] = timeString.split(':').map(Number);

        return {
            hours,
            minutes,
            seconds,
            hoursPercent: (hours / 24) * 100,
            minutesPercent: (minutes / 60) * 100,
            secondsPercent: (seconds / 60) * 100
        };
    };

    const { hours, minutes, seconds, hoursPercent, minutesPercent, secondsPercent } = getTimeValues();

    return (
        <div className="neon-ring-container">
            <div className="rings-display">
                {/* Seconds ring (outer) */}
                <svg className="ring-svg seconds-ring" viewBox="0 0 200 200">
                    <circle
                        className="ring-background"
                        cx="100"
                        cy="100"
                        r="90"
                    />
                    <circle
                        className="ring-progress"
                        cx="100"
                        cy="100"
                        r="90"
                        style={{
                            strokeDasharray: `${2 * Math.PI * 90}`,
                            strokeDashoffset: `${2 * Math.PI * 90 * (1 - secondsPercent / 100)}`
                        }}
                    />
                </svg>

                {/* Minutes ring (middle) */}
                <svg className="ring-svg minutes-ring" viewBox="0 0 200 200">
                    <circle
                        className="ring-background"
                        cx="100"
                        cy="100"
                        r="70"
                    />
                    <circle
                        className="ring-progress"
                        cx="100"
                        cy="100"
                        r="70"
                        style={{
                            strokeDasharray: `${2 * Math.PI * 70}`,
                            strokeDashoffset: `${2 * Math.PI * 70 * (1 - minutesPercent / 100)}`
                        }}
                    />
                </svg>

                {/* Hours ring (inner) */}
                <svg className="ring-svg hours-ring" viewBox="0 0 200 200">
                    <circle
                        className="ring-background"
                        cx="100"
                        cy="100"
                        r="50"
                    />
                    <circle
                        className="ring-progress"
                        cx="100"
                        cy="100"
                        r="50"
                        style={{
                            strokeDasharray: `${2 * Math.PI * 50}`,
                            strokeDashoffset: `${2 * Math.PI * 50 * (1 - hoursPercent / 100)}`
                        }}
                    />
                </svg>

                {/* Center time display */}
                <div className="center-time">
                    <div className="digital-time">
                        {hours.toString().padStart(2, '0')}:
                        {minutes.toString().padStart(2, '0')}:
                        {seconds.toString().padStart(2, '0')}
                    </div>
                </div>
            </div>

            <div className="ring-labels">
                <div className="ring-label">
                    <span className="label-icon seconds-color">⏱️</span>
                    <span className="label-text">{seconds}s</span>
                </div>
                <div className="ring-label">
                    <span className="label-icon minutes-color">⏰</span>
                    <span className="label-text">{minutes}m</span>
                </div>
                <div className="ring-label">
                    <span className="label-icon hours-color">🕐</span>
                    <span className="label-text">{hours}h</span>
                </div>
            </div>

            <div className="ring-date">
                {time.toLocaleDateString('en-US', {
                    timeZone: timezone,
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </div>
        </div>
    );
}

export default NeonRingClock;
