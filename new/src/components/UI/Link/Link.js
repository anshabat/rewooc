import './Link.css';
import React from 'react';
import {siteUrl} from '../../../shared/utilities';

const Link = ({href, children, className = '', ...props}) => {
    const classes = `rw-link ${className}`.trim();

    if (children.type === `a`) {
        return (
            <div title={href} {...props}>
                {React.cloneElement(children, {
                    className: classes
                })}
            </div>
        );
    } else {
        return (
            <a href={href} className={classes} {...props}>{children}</a>
        )
    }

};

export default Link;