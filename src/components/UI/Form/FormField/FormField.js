import './FormField.scss';
import React from 'react';

const FormField = (props) => {
    const {className = '', ...restProps} = props;
    return (
        <div className="pc-form-field">
            <input
                className={`pc-form-field__control ${className}`.trim()}
                {...restProps}
            />
        </div>
    );
};

export default FormField;