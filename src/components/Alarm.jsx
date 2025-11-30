import { useState, useEffect } from 'react';
import './Alarm.css';

const Alarm = () => {
    const [alarms, setAlarms] = useState([]);
    const [newAlarmTime, setNewAlarmTime] = useState('');
    const [newAlarmLabel, setNewAlarmLabel] = useState('');

    useEffect(() => {
        // Load alarms from localStorage
        const savedAlarms = localStorage.getItem('alarms');
        if (savedAlarms) {
            setAlarms(JSON.parse(savedAlarms));
        }
    }, []);

    useEffect(() => {
        // Save alarms to localStorage
        localStorage.setItem('alarms', JSON.stringify(alarms));

        // Check alarms every second
        const interval = setInterval(() => {
            const now = new Date();
            const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            alarms.forEach(alarm => {
                if (alarm.enabled && alarm.time === currentTime && !alarm.triggered) {
                    triggerAlarm(alarm);
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [alarms]);

    const triggerAlarm = (alarm) => {
        // Play notification
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('⏰ Alarm!', {
                body: alarm.label || `Alarm at ${alarm.time}`,
                icon: '⏰'
            });
        }

        // Mark as triggered
        setAlarms(prev => prev.map(a =>
            a.id === alarm.id ? { ...a, triggered: true } : a
        ));

        // Reset triggered status after 1 minute
        setTimeout(() => {
            setAlarms(prev => prev.map(a =>
                a.id === alarm.id ? { ...a, triggered: false } : a
            ));
        }, 60000);
    };

    const addAlarm = () => {
        if (!newAlarmTime) return;

        const newAlarm = {
            id: Date.now(),
            time: newAlarmTime,
            label: newAlarmLabel || 'Alarm',
            enabled: true,
            triggered: false
        };

        setAlarms([...alarms, newAlarm]);
        setNewAlarmTime('');
        setNewAlarmLabel('');

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    };

    const toggleAlarm = (id) => {
        setAlarms(prev => prev.map(alarm =>
            alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
        ));
    };

    const deleteAlarm = (id) => {
        setAlarms(prev => prev.filter(alarm => alarm.id !== id));
    };

    return (
        <div className="alarm-widget">
            <h3>⏰ Alarms</h3>

            <div className="alarm-input-group">
                <input
                    type="time"
                    value={newAlarmTime}
                    onChange={(e) => setNewAlarmTime(e.target.value)}
                    className="alarm-time-input"
                />
                <input
                    type="text"
                    value={newAlarmLabel}
                    onChange={(e) => setNewAlarmLabel(e.target.value)}
                    placeholder="Label (optional)"
                    className="alarm-label-input"
                />
                <button onClick={addAlarm} className="alarm-add-btn">
                    Add
                </button>
            </div>

            <div className="alarms-list">
                {alarms.length === 0 ? (
                    <p className="no-alarms">No alarms set</p>
                ) : (
                    alarms.map(alarm => (
                        <div key={alarm.id} className={`alarm-item ${!alarm.enabled ? 'disabled' : ''}`}>
                            <div className="alarm-info">
                                <span className="alarm-time">{alarm.time}</span>
                                <span className="alarm-label">{alarm.label}</span>
                            </div>
                            <div className="alarm-controls">
                                <button
                                    onClick={() => toggleAlarm(alarm.id)}
                                    className={`alarm-toggle ${alarm.enabled ? 'on' : 'off'}`}
                                >
                                    {alarm.enabled ? 'ON' : 'OFF'}
                                </button>
                                <button
                                    onClick={() => deleteAlarm(alarm.id)}
                                    className="alarm-delete"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Alarm;
