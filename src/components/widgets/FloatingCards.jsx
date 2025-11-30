import { useState, useEffect } from 'react';
import './FloatingCards.css';

function FloatingCards({ timezone = 'Asia/Karachi' }) {
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

        const [hours, minutes, seconds] = timeString.split(':');
        return { hours, minutes, seconds };
    };

    const { hours, minutes, seconds } = getTimeValues();

    return (
        <div className="floating-cards-container">
            <div className="cards-display">
                <div className="time-card hours-card">
                    <div className="card-inner">
                        <div className="card-label">Hours</div>
                        <div className="card-value">{hours}</div>
                        <div className="card-icon">🕐</div>
                    </div>
                </div>

                <div className="card-separator">:</div>

                <div className="time-card minutes-card">
                    <div className="card-inner">
                        <div className="card-label">Minutes</div>
                        <div className="card-value">{minutes}</div>
                        <div className="card-icon">⏰</div>
                    </div>
                </div>

                <div className="card-separator">:</div>

                <div className="time-card seconds-card">
                    <div className="card-inner">
                        <div className="card-label">Seconds</div>
                        <div className="card-value">{seconds}</div>
                        <div className="card-icon">⏱️</div>
                    </div>
                </div>
            </div>

            <div className="floating-date">
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

export default FloatingCards;
