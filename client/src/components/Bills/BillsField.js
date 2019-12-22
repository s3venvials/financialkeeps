import React from 'react';

export default ({ input, label, type }) => {
    return (
        <div className="field">
            <label>{label}</label>
            <input {...input} {...type} />
        </div>
    );
};