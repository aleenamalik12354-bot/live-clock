import { useBattery } from '../hooks/useBattery';
import './BatteryIndicator.css';

const BatteryIndicator = () => {
    const { level, charging, supported } = useBattery();

    if (!supported || level === null) return null;

    const getBatteryColor = () => {
        if (charging) return '#00ff00';
        if (level > 50) return '#00ff00';
        if (level > 20) return '#ffa500';
        return '#ff0000';
    };

    const getBatteryIcon = () => {
        if (charging) return '⚡';
        if (level > 75) return '🔋';
        if (level > 50) return '🔋';
        if (level > 25) return '🪫';
        return '🪫';
    };

    return (
        <div className="battery-indicator">
            <span className="battery-icon">{getBatteryIcon()}</span>
            <div className="battery-bar">
                <div
                    className="battery-fill"
                    style={{
                        width: `${level}%`,
                        backgroundColor: getBatteryColor()
                    }}
                ></div>
            </div>
            <span className="battery-percentage">{level}%</span>
            {charging && <span className="charging-indicator">⚡</span>}
        </div>
    );
};

export default BatteryIndicator;
