import React from 'react';

export default ({ input, label }) => {
    return (
        <div className="field">
            <label>{label}</label>
            <input {...input} />
        </div>
    );
};