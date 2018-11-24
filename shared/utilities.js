/**
 * Delay event handler call until user finish trigger event
 *
 * @param callback - Event handle function
 * @param delay - handel call delay
 * @returns {function(*=)} Delayed event handler function
 */

import React, {Component} from 'react';

export const debounce = (callback, delay = 300) => {
    let timeout = null;
    return (event) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(event);
        }, delay)
    }
};

const trimLastSlash = (str) => {
    return str.endsWith('/') ? str.slice(0, -1) : str;
};

const absoluteToRelative = (url) => {
    const urlPath = url.replace('http://rewooc.loc/server/wp', '');
    return (urlPath[0] === '/') ? urlPath : '/' + urlPath;
};

export const siteUrl = (url) => {
    return absoluteToRelative(trimLastSlash(url));
};

export const ajaxEndpoint = (action) => {
    return 'http://rewooc.loc/server/wp/?wc-ajax=%%endpoint%%'.toString().replace( '%%endpoint%%', action );
};

/*export class siteUrl extends Component  {
    constructor() {
        super();
    }
    render () {
        return url.replace('http://rewooc.loc', '');
    }
};*/


/*
export const baseUrl = (url = '') => {
    return appData.settings.baseUrl + url;
};

export const ajaxEndpoint = (action) => {
    return appData.settings.ajaxUrl.toString().replace( '%%endpoint%%', action );
};*/
