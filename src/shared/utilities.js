/**
 * Delay event handler call until user finish trigger event
 *
 * @param callback - Event handle function
 * @param delay - handel call delay
 * @returns {function(*=)} Delayed event handler function
 */

import {Config} from '../config';

export const debounce = (callback, delay = 300) => {
    let timeout = null;
    return (event) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(event);
        }, delay)
    }
};

const trailingSlash = {
    remove(str) {
        return str.endsWith('/') ? str.slice(0, -1) : str;
    }
};

export const siteUrl = (url) => {
    let urlPath = url.replace(trailingSlash.remove(Config.apiUrl), '');
    urlPath = trailingSlash.remove(urlPath);

    return (urlPath[0] === '/' || urlPath.startsWith('http')) ? urlPath : '/' + urlPath;
};

export const baseUrl = (url = '') => {
    return Config.apiUrl + url.replace('/dist', '') + '/';
};

export const ajaxEndpoint = (action) => {
    return baseUrl(`/?wc-ajax=${action}`);
};
