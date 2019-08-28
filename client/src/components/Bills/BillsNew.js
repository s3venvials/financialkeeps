import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import BillsForm from './BillsForm';
import BillsFormReview from './BillsFormReview';

class BillsNew extends Component {
    state = { showReview: false };

    renderContent() {
        if(this.state.showReview) {
            return <BillsFormReview 
                onCancel={() => this.setState({ showReview: false })}
            />;
        }

        return <BillsForm onSurveySubmit={() =>
                        this.setState({ showReview: true }
                    )} 
                />
    }

    render() {
        return (
            <div>
                <div className="ui attached message">
                        <div className="header">
                            <h3>Add New Bill</h3>
                        </div>
                </div>
            {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'billsForm'
})(BillsNew);