import { useState, useEffect } from 'react';

export const useBattery = () => {
    const [batteryInfo, setBatteryInfo] = useState({
        level: null,
        charging: false,
        supported: false
    });

    useEffect(() => {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                setBatteryInfo({
                    level: Math.round(battery.level * 100),
                    charging: battery.charging,
                    supported: true
                });

                battery.addEventListener('levelchange', () => {
                    setBatteryInfo(prev => ({
                        ...prev,
                        level: Math.round(battery.level * 100)
                    }));
                });

                battery.addEventListener('chargingchange', () => {
                    setBatteryInfo(prev => ({
                        ...prev,
                        charging: battery.charging
                    }));
                });
            });
        }
    }, []);

    return batteryInfo;
};
