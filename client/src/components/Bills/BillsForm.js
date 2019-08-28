import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import BillsField from './BillsField';
import formFields from './formFields';

class BillsForm extends Component {

    renderFields() {
        return _.map(formFields, ({ label, name, type}) => {
            return (
                <Field 
                component={BillsField} 
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
                <form className="ui form attached fluid segment" onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/dashboard" className="ui red basic button">Cancel</Link>
                    <button className="ui teal basic button" type="submit">Next</button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    _.each(formFields, ({ name }) => {
        if(!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'billsForm',
    destroyOnUnmount: false
})(BillsForm);