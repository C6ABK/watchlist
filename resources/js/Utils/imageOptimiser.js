import { imageCache } from './imageCache';

export const optimiseImage = (url, size = 'medium') => {
    if(!url) return null;

    // Check cache first
    const cached = imageCache.get(url, size);
    if (cached) return cached;

    // Size configs
    const sizes = {
        thumb: { w: 150, h: 225, q: 60 },
        medium: { w: 300, h: 450, q: 80 },
        large: { w: 500, h: 750, q: 90 }
    };

    const config = sizes[size] || sizes.medium;

    // Create optimised URL
    let optimisedURL = url;

    if (url.includes('?')) {
        optimisedURL = `${url}&w=${config.w}&h=${config.h}&q=${config.q}`;
    } else {
        optimisedURL = `${url}?w=${config.w}&h=${config.h}&q=${config.q}`;
    }

    // Cache the result
    imageCache.set(url, optimisedURL, size);

    return optimisedURL;
}