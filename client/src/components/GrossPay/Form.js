import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Fields from './Fields';
import formFields from './FormFields';

class GrossPayForm extends Component {

    renderFields() {
        return _.map(formFields, ({ label, name, type}) => {
            return (
                <Field 
                component={Fields} 
                key={name} 
                type={type} 
                label={label} 
                name={name} 
                />
            );
        });
    }

    render() {
        return (
            <div>
                <form className="ui form attached fluid segment">
                    {this.renderFields()}
                    <Link to="/dashboard" className="ui red basic button">Cancel</Link>
                    <button className="ui teal basic button" type="submit">Next</button>
                </form>
            </div>
        );
    }
}

export default GrossPayForm;