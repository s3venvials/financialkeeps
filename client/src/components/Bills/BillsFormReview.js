import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const BillsReview = ({ onCancel, formValues, submitBills, history }) => {
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div className="item" key={name}>
                <div className="header">
                    {label}
                </div>
                {formValues[name]}
            </div>
        );
    });

    return (
        <div className="ui form attached fluid segment">
            <h5 className="header">Please confirm your entries.</h5>
            <div className="ui list">
                {reviewFields}
            </div>
            <button className="ui basic yellow button" onClick={onCancel}>
                Back
            </button>
            <button className="ui right floated basic teal button" onClick={() => submitBills(formValues, history)}>
                Confirm Entries
            </button>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        formValues: state.form.billsForm.values
    };
}

export default connect(mapStateToProps, actions)(withRouter(BillsReview));