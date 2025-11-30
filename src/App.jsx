import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './contexts/LanguageContext';
import { useSettings } from './components/Settings';
import { calculateTimeShadow } from './utils/shadowCalculator';
import Clock from './components/Clock';
import AnalogClock from './components/AnalogClock';
import Calendar from './components/Calendar';
import Stopwatch from './components/Stopwatch';
import Alarm from './components/Alarm';
import WorldClock from './components/WorldClock';
import Weather from './components/Weather';
import Settings from './components/Settings';
import ThemeSelector from './components/ThemeSelector';
import LanguageSelector from './components/LanguageSelector';
import BatteryIndicator from './components/BatteryIndicator';
import AnimatedBackground from './components/AnimatedBackground';
import CelebrationEffects from './components/CelebrationEffects';
import { timezones } from './data/timezones';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const settings = useSettings();
  const [clockType, setClockType] = useState('digital');
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Karachi');
  const [activeWidget, setActiveWidget] = useState('clock');
  const [dynamicShadow, setDynamicShadow] = useState('');

  // Update dynamic shadow based on time
  useEffect(() => {
    const updateShadow = () => {
      const shadow = calculateTimeShadow();
      setDynamicShadow(shadow);
    };

    updateShadow();
    const interval = setInterval(updateShadow, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const toggleClockType = () => {
    setClockType(prev => prev === 'digital' ? 'analog' : 'digital');
  };

  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.value);
  };

  return (
    <div className="app-container">
      {/* Animated Background */}
      {settings.animations && <AnimatedBackground theme={theme} />}

      {/* Battery Indicator */}
      {settings.showBattery && <BatteryIndicator />}

      {/* Top Controls */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '☀️ ' + t('theme.light') : '🌙 ' + t('theme.dark')}
      </button>

      <ThemeSelector />

      <button className="clock-type-toggle" onClick={toggleClockType}>
        {clockType === 'digital' ? '🕐 ' + t('clock.analog') : '🔢 ' + t('clock.digital')}
      </button>

      {/* Language Selector */}
      <LanguageSelector />

      {/* Widget Navigation */}
      <div className="widget-nav">
        <button
          className={`widget-nav-btn ${activeWidget === 'clock' ? 'active' : ''}`}
          onClick={() => setActiveWidget('clock')}
        >
          🕐 {t('app.clock')}
        </button>
        <button
          className={`widget-nav-btn ${activeWidget === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveWidget('calendar')}
        >
          📅 {t('app.calendar')}
        </button>
        <button
          className={`widget-nav-btn ${activeWidget === 'stopwatch' ? 'active' : ''}`}
          onClick={() => setActiveWidget('stopwatch')}
        >
          ⏱️ {t('app.stopwatch')}
        </button>
        <button
          className={`widget-nav-btn ${activeWidget === 'alarm' ? 'active' : ''}`}
          onClick={() => setActiveWidget('alarm')}
        >
          ⏰ {t('app.alarm')}
        </button>
        <button
          className={`widget-nav-btn ${activeWidget === 'worldClock' ? 'active' : ''}`}
          onClick={() => setActiveWidget('worldClock')}
        >
          🌍 {t('app.worldClock')}
        </button>
        <button
          className={`widget-nav-btn ${activeWidget === 'weather' ? 'active' : ''}`}
          onClick={() => setActiveWidget('weather')}
        >
          🌤️ {t('app.weather')}
        </button>
        <button
          className={`widget-nav-btn ${activeWidget === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveWidget('settings')}
        >
          ⚙️ {t('app.settings')}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="main-content" style={{ boxShadow: dynamicShadow }}>
        {activeWidget === 'clock' && (
          <>
            {/* Timezone Selector */}
            <div className="timezone-selector">
              <label htmlFor="timezone">🌍 {t('clock.timezone')}: </label>
              <select
                id="timezone"
                value={selectedTimezone}
                onChange={handleTimezoneChange}
                className="timezone-dropdown"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clock Display */}
            {clockType === 'digital' ?
              <Clock timezone={selectedTimezone} /> :
              <AnalogClock timezone={selectedTimezone} />
            }
          </>
        )}

        {activeWidget === 'calendar' && <Calendar />}
        {activeWidget === 'stopwatch' && <Stopwatch />}
        {activeWidget === 'alarm' && <Alarm />}
        {activeWidget === 'worldClock' && <WorldClock />}
        {activeWidget === 'weather' && <Weather />}
        {activeWidget === 'settings' && <Settings />}
      </div>

      {/* Celebration Effects Overlay */}
      <CelebrationEffects />
    </div>
  );
}

export default App;
