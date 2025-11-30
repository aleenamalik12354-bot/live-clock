import './AnimatedBackground.css';

const AnimatedBackground = ({ theme }) => {
    const isNight = theme === 'dark';

    return (
        <div className="animated-background">
            {isNight ? (
                <>
                    {/* Stars */}
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={`star-${i}`}
                            className="star"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                    {/* Moon */}
                    <div className="moon"></div>
                </>
            ) : (
                <>
                    {/* Clouds */}
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={`cloud-${i}`}
                            className="cloud"
                            style={{
                                top: `${10 + Math.random() * 30}%`,
                                animationDelay: `${i * 2}s`,
                                animationDuration: `${20 + Math.random() * 10}s`
                            }}
                        />
                    ))}
                    {/* Sun */}
                    <div className="sun"></div>
                </>
            )}
        </div>
    );
};

export default AnimatedBackground;
