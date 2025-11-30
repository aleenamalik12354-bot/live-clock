import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { timezones } from '../data/timezones';
import './WorldClock.css';

const WorldClock = () => {
    const { t } = useLanguage();
    const [selectedCities, setSelectedCities] = useState([]);
    const [currentTimes, setCurrentTimes] = useState({});
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        // Load saved cities
        const saved = localStorage.getItem('worldClockCities');
        if (saved) {
            setSelectedCities(JSON.parse(saved));
        }

        // Auto-detect user location
        detectUserLocation();
    }, []);

    useEffect(() => {
        // Update times every second
        const interval = setInterval(() => {
            const times = {};
            selectedCities.forEach(city => {
                const now = new Date();
                times[city.value] = now.toLocaleTimeString('en-US', {
                    timeZone: city.value,
                    hour12: true
                });
            });
            setCurrentTimes(times);
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedCities]);

    const detectUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Get timezone from coordinates
                    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    setUserLocation(timezone);
                },
                (error) => {
                    console.log('Location detection failed:', error);
                    // Fallback to browser timezone
                    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    setUserLocation(timezone);
                }
            );
        } else {
            // Fallback to browser timezone
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            setUserLocation(timezone);
        }
    };

    const addCity = (cityValue) => {
        const city = timezones.find(tz => tz.value === cityValue);
        if (city && !selectedCities.find(c => c.value === cityValue)) {
            const newCities = [...selectedCities, city];
            setSelectedCities(newCities);
            localStorage.setItem('worldClockCities', JSON.stringify(newCities));
        }
    };

    const removeCity = (cityValue) => {
        const newCities = selectedCities.filter(c => c.value !== cityValue);
        setSelectedCities(newCities);
        localStorage.setItem('worldClockCities', JSON.stringify(newCities));
    };

    return (
        <div className="world-clock-widget">
            <h3>🌍 {t('worldClock.title')}</h3>

            {userLocation && (
                <div className="user-location-info">
                    <span>📍 Your Location: {userLocation}</span>
                </div>
            )}

            <div className="city-selector">
                <select
                    onChange={(e) => {
                        if (e.target.value) {
                            addCity(e.target.value);
                            e.target.value = '';
                        }
                    }}
                    className="city-dropdown"
                >
                    <option value="">{t('worldClock.addCity')}</option>
                    {timezones.map(tz => (
                        <option key={tz.value} value={tz.value}>
                            {tz.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="cities-list">
                {selectedCities.length === 0 ? (
                    <p className="no-cities">{t('worldClock.noCities')}</p>
                ) : (
                    selectedCities.map(city => (
                        <div key={city.value} className="city-item">
                            <div className="city-info">
                                <span className="city-name">{city.name}</span>
                                <span className="city-time">{currentTimes[city.value] || '--:--:--'}</span>
                            </div>
                            <button
                                onClick={() => removeCity(city.value)}
                                className="city-remove"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WorldClock;
