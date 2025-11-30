import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Weather.css';

// Mock weather service (replace with real API if key is provided)
const getMockWeatherData = () => {
    const conditions = ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];

    return {
        current: {
            temp: Math.floor(Math.random() * 30) + 10,
            feelsLike: Math.floor(Math.random() * 30) + 10,
            humidity: Math.floor(Math.random() * 60) + 40,
            windSpeed: Math.floor(Math.random() * 20) + 5,
            windDirection: Math.floor(Math.random() * 360),
            condition: randomCondition,
            description: randomCondition.toLowerCase()
        },
        hourly: Array.from({ length: 24 }, (_, i) => ({
            hour: i,
            temp: Math.floor(Math.random() * 25) + 10,
            condition: conditions[Math.floor(Math.random() * conditions.length)]
        }))
    };
};

function Weather() {
    const { t } = useLanguage();
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWeather();
        // Refresh every 30 minutes
        const interval = setInterval(fetchWeather, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchWeather = async () => {
        try {
            setLoading(true);
            // Using mock data - replace with real API call if needed
            setTimeout(() => {
                const data = getMockWeatherData();
                setWeatherData(data);
                setLoading(false);
            }, 500);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const getWeatherIcon = (condition) => {
        const icons = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Snow': '❄️',
            'Thunderstorm': '⛈️'
        };
        return icons[condition] || '🌤️';
    };

    const getWindDirection = (degrees) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    };

    if (loading) {
        return (
            <div className="weather-container">
                <div className="weather-loading">
                    <div className="loading-spinner"></div>
                    <p>{t('weather.loading')}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="weather-container">
                <div className="weather-error">
                    <p>❌ {t('weather.error')}</p>
                    <button onClick={fetchWeather} className="retry-button">
                        {t('weather.retry')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="weather-container">
            <h2 className="weather-title">🌤️ {t('weather.title')}</h2>

            {/* Current Weather */}
            <div className="current-weather">
                <div className="weather-icon-large">
                    {getWeatherIcon(weatherData.current.condition)}
                </div>

                <div className="weather-main-info">
                    <div className="temperature-display">
                        <span className="temp-value">{weatherData.current.temp}°</span>
                        <span className="temp-unit">C</span>
                    </div>
                    <div className="feels-like">
                        {t('weather.feelsLike')}: {weatherData.current.feelsLike}°C
                    </div>
                    <div className="weather-condition">
                        {weatherData.current.description}
                    </div>
                </div>

                <div className="weather-details">
                    <div className="detail-item">
                        <span className="detail-icon">💧</span>
                        <div className="detail-info">
                            <span className="detail-label">{t('weather.humidity')}</span>
                            <span className="detail-value">{weatherData.current.humidity}%</span>
                        </div>
                    </div>

                    <div className="detail-item">
                        <span className="detail-icon">💨</span>
                        <div className="detail-info">
                            <span className="detail-label">{t('weather.wind')}</span>
                            <span className="detail-value">
                                {weatherData.current.windSpeed} km/h {getWindDirection(weatherData.current.windDirection)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 24-Hour Forecast */}
            <div className="forecast-section">
                <h3 className="forecast-title">{t('weather.forecast24h')}</h3>
                <div className="forecast-timeline">
                    {weatherData.hourly.map((hour, index) => (
                        <div key={index} className="forecast-hour">
                            <div className="forecast-time">
                                {hour.hour.toString().padStart(2, '0')}:00
                            </div>
                            <div className="forecast-icon">
                                {getWeatherIcon(hour.condition)}
                            </div>
                            <div className="forecast-temp">
                                {hour.temp}°
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="weather-note">
                <small>{t('weather.mockNote')}</small>
            </div>
        </div>
    );
}

export default Weather;
