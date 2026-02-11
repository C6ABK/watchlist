class ImageCache {
    constructor() {
        this.memory = new Map();
        this.storageKey = 'movieImageCache';
    }

    get(url, size = 'medium') {
        const key = `${url}-${size}`;

        // Check memory first
        if (this.memory.has(key)) {
            return this.memory.get(key);
        }

        // Check localStorage
        try {
            const stored = localStorage.getItem(`${this.storageKey}-${key}`);

            if (stored) {
                const data = JSON.parse(stored);
                // Check if cached less than 24 hours ago
                if (Date.now() - data.timestap < 24 * 60 * 60 * 1000) {
                    this.memory.set(key, data.optimizedUrl);
                    return data.optimizedUrl;
                }
            }
        } catch (e) {
            console.warn('Cache read error: ', e);
        }

        return null;
    }

    set(url, optimizedUrl, size = 'medium') {
        const key = `${url}-${size}`;

        // Store in memory
        this.memory.set(key, optimizedUrl);

        // Store in localStorage
        try {
            localStorage.setItem(`${this.storageKey}-${key}`, JSON.stringify({
                optimizedUrl,
                timestamp: Date.now()
            }));
        } catch (e) {
            console.warn('Cache write error: ', e);
        }
    }
}

export const imageCache = new ImageCache();