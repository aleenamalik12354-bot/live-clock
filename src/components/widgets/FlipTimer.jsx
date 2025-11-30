import { useState, useEffect } from 'react';
import './FlipTimer.css';

function FlipTimer({ timezone = 'Asia/Karachi' }) {
    const [time, setTime] = useState(new Date());
    const [prevTime, setPrevTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setPrevTime(time);
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).split(':');
    };

    const [hours, minutes, seconds] = formatTime(time);
    const [prevHours, prevMinutes, prevSeconds] = formatTime(prevTime);

    const FlipDigit = ({ current, previous }) => {
        const hasChanged = current !== previous;

        return (
            <div className="flip-digit">
                <div className={`flip-card ${hasChanged ? 'flipping' : ''}`}>
                    <div className="flip-card-top">
                        <span>{previous}</span>
                    </div>
                    <div className="flip-card-bottom">
                        <span>{current}</span>
                    </div>
                    <div className="flip-card-back">
                        <span>{current}</span>
                    </div>
                    <div className="flip-card-front">
                        <span>{previous}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flip-timer-container">
            <div className="flip-display">
                <div className="flip-group">
                    <FlipDigit current={hours[0]} previous={prevHours[0]} />
                    <FlipDigit current={hours[1]} previous={prevHours[1]} />
                </div>
                <div className="flip-separator">:</div>
                <div className="flip-group">
                    <FlipDigit current={minutes[0]} previous={prevMinutes[0]} />
                    <FlipDigit current={minutes[1]} previous={prevMinutes[1]} />
                </div>
                <div className="flip-separator">:</div>
                <div className="flip-group">
                    <FlipDigit current={seconds[0]} previous={prevSeconds[0]} />
                    <FlipDigit current={seconds[1]} previous={prevSeconds[1]} />
                </div>
            </div>
            <div className="flip-date">
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

export default FlipTimer;
