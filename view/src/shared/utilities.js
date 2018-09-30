/**
 * Delay event handler call until user finish trigger event
 *
 * @param callback - Event handle function
 * @param delay - handel call delay
 * @returns {function(*=)} Delayed event handler function
 */
export const debounce = (callback, delay = 300) => {
    let timeout = null;
    return (event) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(event);
        }, delay)
    }
};

export const cutUrlDomain = (url) => {
    return url.replace(location.origin, '');
};