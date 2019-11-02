import './FormField.scss';
import React, {useState} from 'react';

const FormField = (props) => {
    const {
        className = '',
        onChange = () => {
        },
        value = '',
        ...restProps
    } = props;

    const [newValue, setValue] = useState(value);
    
    return (
        <div className="pc-form-field">
            <input
                className={`pc-form-field__control ${className}`.trim()}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e);
                }}
                value={newValue}
                {...restProps}
            />
        </div>
    );
};

export default FormField;