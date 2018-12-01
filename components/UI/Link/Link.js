import './Link.scss';
import React from 'react';
import NextLink from 'next/link';
import {siteUrl} from '../../../shared/utilities';

const Link = ({href, children, className = '', ...props}) => {
    const classes = `rw-link ${className}`.trim();

    if(children.type === `a`){
        return (
            <NextLink href={siteUrl(href)} {...props}>
                {React.cloneElement(children, {
                    className: classes
                })}
            </NextLink>
        );
    } else {
        return (
            <a href={siteUrl(href)} className={classes} {...props}>{children}</a>
        )
    }

};

export default Link;