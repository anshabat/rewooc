import React from 'react';

const Icon = (props) => {
    const classes = props.classes || [];
    classes.push('fa', props.name);
    return (
        <i className={classes.join(' ')} aria-hidden="true"></i>
    )
};
export default Icon;