import { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
    const [currentDate] = useState(new Date());

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];

        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }

        // Add all days in month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const days = getDaysInMonth(currentDate);
    const today = currentDate.getDate();

    return (
        <div className="calendar-widget">
            <div className="calendar-header">
                <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                <p className="current-day">{dayNames[currentDate.getDay()]}, {today}</p>
            </div>

            <div className="calendar-grid">
                {dayNames.map(day => (
                    <div key={day} className="calendar-day-name">{day}</div>
                ))}

                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-day ${day === today ? 'today' : ''} ${!day ? 'empty' : ''}`}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
