/**
 * Calculate dynamic shadow properties based on time of day
 * Returns CSS box-shadow string
 */
export const calculateTimeShadow = (hour = new Date().getHours()) => {
    // Morning (6 AM - 10 AM): Soft, long shadow with cool tones
    if (hour >= 6 && hour < 10) {
        const intensity = (hour - 6) / 4; // 0 to 1
        const offsetX = 20 - (intensity * 10); // 20px to 10px
        const offsetY = 30 - (intensity * 15); // 30px to 15px
        const blur = 40 - (intensity * 10); // 40px to 30px

        return `
      ${offsetX}px ${offsetY}px ${blur}px rgba(100, 150, 200, ${0.3 - intensity * 0.1}),
      ${offsetX * 0.5}px ${offsetY * 0.5}px ${blur * 0.5}px rgba(100, 150, 200, ${0.2 - intensity * 0.05})
    `;
    }

    // Noon (10 AM - 2 PM): Small, sharp shadow directly below
    else if (hour >= 10 && hour < 14) {
        return `
      0px 8px 15px rgba(0, 0, 0, 0.4),
      0px 4px 8px rgba(0, 0, 0, 0.3)
    `;
    }

    // Evening (2 PM - 6 PM): Long shadow with warm orange/amber tones
    else if (hour >= 14 && hour < 18) {
        const progress = (hour - 14) / 4; // 0 to 1
        const offsetX = -10 - (progress * 20); // -10px to -30px
        const offsetY = 15 + (progress * 25); // 15px to 40px
        const blur = 30 + (progress * 20); // 30px to 50px

        const warmR = 255;
        const warmG = Math.floor(140 - progress * 40); // 140 to 100
        const warmB = Math.floor(50 - progress * 30); // 50 to 20

        return `
      ${offsetX}px ${offsetY}px ${blur}px rgba(${warmR}, ${warmG}, ${warmB}, ${0.4 + progress * 0.1}),
      ${offsetX * 0.6}px ${offsetY * 0.6}px ${blur * 0.6}px rgba(${warmR}, ${warmG}, ${warmB}, ${0.2 + progress * 0.05})
    `;
    }

    // Night (6 PM - 6 AM): No shadow or very subtle glow
    else {
        // Subtle glow effect for dark mode
        return `
      0px 0px 20px rgba(0, 206, 209, 0.1),
      0px 0px 40px rgba(0, 206, 209, 0.05)
    `;
    }
};

/**
 * Get shadow description for UI display
 */
export const getShadowDescription = (hour = new Date().getHours()) => {
    if (hour >= 6 && hour < 10) return 'Morning - Soft Shadow';
    if (hour >= 10 && hour < 14) return 'Noon - Small Shadow';
    if (hour >= 14 && hour < 18) return 'Evening - Warm Shadow';
    return 'Night - No Shadow';
};

/**
 * Check if it's currently night time
 */
export const isNightTime = (hour = new Date().getHours()) => {
    return hour < 6 || hour >= 18;
};
