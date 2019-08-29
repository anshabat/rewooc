import './FormField.scss';
import React from 'react';

const FormField = ({value = 1, type = 'text', onChange}) => {
    return (
        <div className="pc-form-field">
            <input
                className="pc-form-field__control"
                value={value}
                type={type}
                onChange={onChange}
            />
        </div>
    );
};

export default FormField;