import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import FlipTimer from './widgets/FlipTimer';
import NeonRingClock from './widgets/NeonRingClock';
import FloatingCards from './widgets/FloatingCards';
import Clock from './Clock';
import AnalogClock from './AnalogClock';
import './WidgetCustomizer.css';

function WidgetCustomizer({ timezone }) {
    const { t } = useLanguage();
    const [selectedWidget, setSelectedWidget] = useState(() => {
        return localStorage.getItem('selectedClockWidget') || 'default';
    });

    useEffect(() => {
        localStorage.setItem('selectedClockWidget', selectedWidget);
    }, [selectedWidget]);

    const widgets = [
        { id: 'default', name: t('widgets.default'), icon: '🕐', component: Clock },
        { id: 'analog', name: t('widgets.analog'), icon: '⏰', component: AnalogClock },
        { id: 'flip', name: t('widgets.flipTimer'), icon: '🔄', component: FlipTimer },
        { id: 'neonRing', name: t('widgets.neonRing'), icon: '⭕', component: NeonRingClock },
        { id: 'floatingCards', name: t('widgets.floatingCards'), icon: '🎴', component: FloatingCards },
    ];

    const SelectedComponent = widgets.find(w => w.id === selectedWidget)?.component || Clock;

    return (
        <div className="widget-customizer-container">
            <h2 className="customizer-title">🎨 {t('widgets.title')}</h2>

            <div className="widget-selector">
                {widgets.map(widget => (
                    <button
                        key={widget.id}
                        className={`widget-option ${selectedWidget === widget.id ? 'active' : ''}`}
                        onClick={() => setSelectedWidget(widget.id)}
                    >
                        <span className="widget-icon">{widget.icon}</span>
                        <span className="widget-name">{widget.name}</span>
                    </button>
                ))}
            </div>

            <div className="widget-preview">
                <SelectedComponent timezone={timezone} />
            </div>
        </div>
    );
}

export default WidgetCustomizer;
