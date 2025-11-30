import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './Settings.css';

const Settings = () => {
    const { t } = useLanguage();
    const [settings, setSettings] = useState({
        timeFormat: '12',
        dateFormat: 'MM/DD/YYYY',
        showSeconds: true,
        showBattery: true,
        animations: true,
        notifications: true
    });

    useEffect(() => {
        const saved = localStorage.getItem('appSettings');
        if (saved) {
            setSettings(JSON.parse(saved));
        }
    }, []);

    const updateSetting = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        localStorage.setItem('appSettings', JSON.stringify(newSettings));
    };

    return (
        <div className="settings-widget">
            <h3>⚙️ Settings</h3>

            <div className="settings-section">
                <h4>⏰ Time & Date</h4>

                <div className="setting-item">
                    <label>Time Format</label>
                    <select
                        value={settings.timeFormat}
                        onChange={(e) => updateSetting('timeFormat', e.target.value)}
                    >
                        <option value="12">12-hour (AM/PM)</option>
                        <option value="24">24-hour</option>
                    </select>
                </div>

                <div className="setting-item">
                    <label>Date Format</label>
                    <select
                        value={settings.dateFormat}
                        onChange={(e) => updateSetting('dateFormat', e.target.value)}
                    >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                </div>

                <div className="setting-item">
                    <label>Show Seconds</label>
                    <input
                        type="checkbox"
                        checked={settings.showSeconds}
                        onChange={(e) => updateSetting('showSeconds', e.target.checked)}
                    />
                </div>
            </div>

            <div className="settings-section">
                <h4>🎨 Display</h4>

                <div className="setting-item">
                    <label>Show Battery Indicator</label>
                    <input
                        type="checkbox"
                        checked={settings.showBattery}
                        onChange={(e) => updateSetting('showBattery', e.target.checked)}
                    />
                </div>

                <div className="setting-item">
                    <label>Enable Animations</label>
                    <input
                        type="checkbox"
                        checked={settings.animations}
                        onChange={(e) => updateSetting('animations', e.target.checked)}
                    />
                </div>
            </div>

            <div className="settings-section">
                <h4>🔔 Notifications</h4>

                <div className="setting-item">
                    <label>Enable Notifications</label>
                    <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={(e) => updateSetting('notifications', e.target.checked)}
                    />
                </div>
            </div>

            <div className="settings-info">
                <p>💡 Settings are automatically saved</p>
            </div>
        </div>
    );
};

export default Settings;

export const useSettings = () => {
    const [settings, setSettings] = useState({
        timeFormat: '12',
        dateFormat: 'MM/DD/YYYY',
        showSeconds: true,
        showBattery: true,
        animations: true,
        notifications: true
    });

    useEffect(() => {
        const saved = localStorage.getItem('appSettings');
        if (saved) {
            setSettings(JSON.parse(saved));
        }
    }, []);

    return settings;
};
