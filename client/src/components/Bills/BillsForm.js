import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import BillsField from './BillsField';

const FIELDS = [
    { label: 'Bill Title', name: 'title' },
    { label: 'Amount', name: 'amount' },
    { label: 'Due Date', name: 'duedate'}
];

class BillsForm extends Component {

    renderFields() {
        return _.map(FIELDS, ({ label, name}) => {
            return (
                <Field 
                component={BillsField} 
                key={name} 
                type="text" 
                label={label} 
                name={name} 
                />
            );
        });
    }

    render() {
        return (
            <div>
                <form className="ui form" onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <button className="ui teal basic right floated button" type="submit">Submit</button>
                    <Link to="/dashboard" className="ui red basic left floated button">Cancel</Link>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if(!values.title) {
        errors.title = "Please provide a title.";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'billsForm'
})(BillsForm);