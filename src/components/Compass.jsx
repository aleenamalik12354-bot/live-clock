import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Compass.css';

function Compass() {
    const { t } = useLanguage();
    const [heading, setHeading] = useState(0);
    const [isSupported, setIsSupported] = useState(true);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        // Check if DeviceOrientationEvent is supported
        if (!window.DeviceOrientationEvent) {
            setIsSupported(false);
            return;
        }

        // Request permission for iOS 13+
        const requestPermission = async () => {
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    const permission = await DeviceOrientationEvent.requestPermission();
                    if (permission === 'granted') {
                        setPermissionGranted(true);
                    }
                } catch (error) {
                    console.error('Permission denied:', error);
                }
            } else {
                // Non-iOS devices or older iOS versions
                setPermissionGranted(true);
            }
        };

        requestPermission();
    }, []);

    useEffect(() => {
        if (!isSupported || !permissionGranted) return;

        const handleOrientation = (event) => {
            // Get the compass heading
            let compassHeading = event.webkitCompassHeading || event.alpha;

            if (compassHeading !== null) {
                // Normalize to 0-360
                if (event.webkitCompassHeading) {
                    setHeading(compassHeading);
                } else {
                    // For non-webkit browsers, alpha goes from 0 to 360
                    setHeading(360 - compassHeading);
                }
            }
        };

        window.addEventListener('deviceorientation', handleOrientation);

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [isSupported, permissionGranted]);

    const getDirection = (degrees) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    };

    const getDirectionName = (dir) => {
        const names = {
            'N': t('compass.north'),
            'NE': t('compass.northeast'),
            'E': t('compass.east'),
            'SE': t('compass.southeast'),
            'S': t('compass.south'),
            'SW': t('compass.southwest'),
            'W': t('compass.west'),
            'NW': t('compass.northwest')
        };
        return names[dir] || dir;
    };

    if (!isSupported) {
        return (
            <div className="compass-container">
                <div className="compass-error">
                    <h2>🧭 {t('compass.title')}</h2>
                    <p>{t('compass.notSupported')}</p>
                    <p className="compass-hint">{t('compass.mobileOnly')}</p>
                </div>
            </div>
        );
    }

    if (!permissionGranted) {
        return (
            <div className="compass-container">
                <div className="compass-error">
                    <h2>🧭 {t('compass.title')}</h2>
                    <p>{t('compass.permissionRequired')}</p>
                    <button
                        className="permission-button"
                        onClick={() => window.location.reload()}
                    >
                        {t('compass.grantPermission')}
                    </button>
                </div>
            </div>
        );
    }

    const currentDirection = getDirection(heading);

    return (
        <div className="compass-container">
            <h2 className="compass-title">🧭 {t('compass.title')}</h2>

            <div className="compass-display">
                <div className="compass-circle" style={{ transform: `rotate(${-heading}deg)` }}>
                    {/* Cardinal directions */}
                    <div className="compass-direction north">N</div>
                    <div className="compass-direction east">E</div>
                    <div className="compass-direction south">S</div>
                    <div className="compass-direction west">W</div>

                    {/* Degree markers */}
                    {[...Array(36)].map((_, i) => (
                        <div
                            key={i}
                            className={`degree-marker ${i % 9 === 0 ? 'major' : ''}`}
                            style={{ transform: `rotate(${i * 10}deg)` }}
                        />
                    ))}
                </div>

                {/* Fixed arrow pointing up (North indicator) */}
                <div className="compass-arrow">
                    <div className="arrow-head"></div>
                    <div className="arrow-tail"></div>
                </div>

                <div className="compass-center-dot"></div>
            </div>

            <div className="compass-info">
                <div className="heading-display">
                    <span className="heading-value">{Math.round(heading)}°</span>
                </div>
                <div className="direction-display">
                    <span className="direction-label">{currentDirection}</span>
                    <span className="direction-name">{getDirectionName(currentDirection)}</span>
                </div>
            </div>

            <div className="compass-hint-text">
                {t('compass.hint')}
            </div>
        </div>
    );
}

export default Compass;
