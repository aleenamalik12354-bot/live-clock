import { useState, useEffect } from 'react';
import './CelebrationEffects.css';

function CelebrationEffects() {
    const [celebration, setCelebration] = useState(null);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const checkCelebration = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const month = now.getMonth();
            const date = now.getDate();

            // Check for New Year (January 1st, midnight)
            if (month === 0 && date === 1 && hours === 0 && minutes === 0 && seconds === 0) {
                triggerCelebration('newYear');
            }
            // Check for noon (12:00 PM)
            else if (hours === 12 && minutes === 0 && seconds === 0) {
                triggerCelebration('noon');
            }
            // Check for new hour (every hour at :00:00)
            else if (minutes === 0 && seconds === 0) {
                triggerCelebration('hourly');
            }
        };

        // Check every second
        const interval = setInterval(checkCelebration, 1000);

        return () => clearInterval(interval);
    }, []);

    const triggerCelebration = (type) => {
        setCelebration(type);

        // Generate particles based on celebration type
        const particleCount = type === 'newYear' ? 150 : type === 'noon' ? 100 : 50;
        const newParticles = [];

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: Math.random(),
                type: type,
                left: Math.random() * 100,
                delay: Math.random() * 0.5,
                duration: 2 + Math.random() * 2,
                rotation: Math.random() * 360,
                color: getRandomColor(type)
            });
        }

        setParticles(newParticles);

        // Clear celebration after animation
        const duration = type === 'newYear' ? 8000 : type === 'noon' ? 5000 : 3000;
        setTimeout(() => {
            setCelebration(null);
            setParticles([]);
        }, duration);
    };

    const getRandomColor = (type) => {
        if (type === 'newYear') {
            const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
            return colors[Math.floor(Math.random() * colors.length)];
        } else if (type === 'noon') {
            const colors = ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#00CED1', '#7B68EE'];
            return colors[Math.floor(Math.random() * colors.length)];
        } else {
            const colors = ['#00CED1', '#0fa', '#FFD700', '#FFA500'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    };

    if (!celebration) return null;

    return (
        <div className={`celebration-overlay celebration-${celebration}`}>
            {/* Sparkle particles for hourly */}
            {celebration === 'hourly' && particles.map(particle => (
                <div
                    key={particle.id}
                    className="sparkle-particle"
                    style={{
                        left: `${particle.left}%`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                        '--sparkle-color': particle.color
                    }}
                >
                    ✨
                </div>
            ))}

            {/* Confetti for noon */}
            {celebration === 'noon' && particles.map(particle => (
                <div
                    key={particle.id}
                    className="confetti-particle"
                    style={{
                        left: `${particle.left}%`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                        transform: `rotate(${particle.rotation}deg)`,
                        backgroundColor: particle.color
                    }}
                />
            ))}

            {/* Fireworks + Confetti for New Year */}
            {celebration === 'newYear' && (
                <>
                    {/* Fireworks */}
                    <div className="fireworks-container">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={`firework-${i}`}
                                className="firework"
                                style={{
                                    left: `${20 + Math.random() * 60}%`,
                                    top: `${20 + Math.random() * 40}%`,
                                    animationDelay: `${i * 0.5}s`
                                }}
                            >
                                {[...Array(12)].map((_, j) => (
                                    <div
                                        key={`spark-${j}`}
                                        className="firework-spark"
                                        style={{
                                            transform: `rotate(${j * 30}deg)`,
                                            backgroundColor: getRandomColor('newYear')
                                        }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Confetti */}
                    {particles.map(particle => (
                        <div
                            key={particle.id}
                            className="confetti-particle"
                            style={{
                                left: `${particle.left}%`,
                                animationDelay: `${particle.delay}s`,
                                animationDuration: `${particle.duration}s`,
                                transform: `rotate(${particle.rotation}deg)`,
                                backgroundColor: particle.color
                            }}
                        />
                    ))}

                    {/* New Year Text */}
                    <div className="new-year-text">
                        🎉 Happy New Year! 🎉
                    </div>
                </>
            )}

            {/* Celebration message */}
            {celebration === 'noon' && (
                <div className="celebration-message">
                    🌞 It's Noon! 🌞
                </div>
            )}
        </div>
    );
}

export default CelebrationEffects;
