import { useState, useEffect } from 'react';

const Clock = ({ timezone = 'Asia/Karachi' }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format time for the selected timezone
    const formattedTime = time.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour12: true
    });

    return (
        <div className="clock-container">
            <h1 className="clock-time">
                {formattedTime}
            </h1>
        </div>
    );
};

export default Clock;
