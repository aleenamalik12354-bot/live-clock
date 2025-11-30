import { useState, useEffect } from 'react';

const AnalogClock = ({ timezone = 'Asia/Karachi' }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Get time components for the selected timezone
    const getTimeInTimezone = () => {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        });

        const parts = formatter.formatToParts(time);
        const hours = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
        const minutes = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
        const seconds = parseInt(parts.find(p => p.type === 'second')?.value || '0');

        return { hours, minutes, seconds };
    };

    const { hours, minutes, seconds } = getTimeInTimezone();
    const hours12 = hours % 12;

    // Calculate rotation angles
    const secondAngle = (seconds * 6);
    const minuteAngle = (minutes * 6) + (seconds * 0.1);
    const hourAngle = (hours12 * 30) + (minutes * 0.5);

    // Generate particles
    const particles = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: 3 + Math.random() * 4,
        size: 2 + Math.random() * 4
    }));

    // Calculate Sun/Moon position (24-hour cycle)
    // Sun/Moon makes one full revolution in 24 hours
    // 00:00 = bottom (night), 06:00 = left (sunrise), 12:00 = top (noon), 18:00 = right (sunset)
    const totalMinutes = hours * 60 + minutes;
    const dayProgress = totalMinutes / (24 * 60); // 0 to 1
    const orbitAngle = (dayProgress * 360) + 180; // Start at bottom (midnight)

    const isDay = hours >= 6 && hours < 18;

    return (
        <div className="analog-clock-container">
            {/* Revolving Ball Animation */}
            <div className="revolving-ball-container ring-1">
                <div className="revolving-ball"></div>
            </div>
            <div className="revolving-ball-container ring-2">
                <div className="revolving-ball"></div>
            </div>
            <div className="revolving-ball-container ring-3">
                <div className="revolving-ball"></div>
            </div>
            <div className="revolving-ball-container ring-4">
                <div className="revolving-ball"></div>
            </div>
            <div className="revolving-ball-container ring-5">
                <div className="revolving-ball"></div>
            </div>
            <div className="revolving-ball-container ring-6">
                <div className="revolving-ball"></div>
            </div>

            {/* Particle effects */}
            <div className="particles">
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: `${particle.left}%`,
                            animationDelay: `${particle.animationDelay}s`,
                            animationDuration: `${particle.animationDuration}s`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`
                        }}
                    />
                ))}
            </div>

            <div className="analog-clock">
                {/* Hour numbers */}
                {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => (
                    <div
                        key={num}
                        className="hour-number"
                        style={{
                            '--rotation': i * 30,
                            '--index': i,
                            transform: `rotate(${i * 30}deg) translateY(-130px) rotate(-${i * 30}deg)`
                        }}
                    >
                        {num}
                    </div>
                ))}

                {/* Minute markers (60 small ticks) */}
                {[...Array(60)].map((_, i) => (
                    <div
                        key={i}
                        className={`minute-marker ${i % 5 === 0 ? 'major' : ''}`}
                        style={{
                            transform: `rotate(${i * 6}deg) translateY(-145px)`
                        }}
                    />
                ))}

                {/* Hour hand */}
                <div
                    className="hand hour-hand"
                    style={{ transform: `rotate(${hourAngle}deg)` }}
                />

                {/* Minute hand */}
                <div
                    className="hand minute-hand"
                    style={{ transform: `rotate(${minuteAngle}deg)` }}
                />

                {/* Second hand with number display */}
                <div
                    className="hand second-hand"
                    style={{ transform: `rotate(${secondAngle}deg)` }}
                >
                    <div className="second-number">{seconds}</div>
                </div>

                {/* Center dot */}
                <div className="center-dot"></div>
            </div>


        </div>
    );
};

export default AnalogClock;
