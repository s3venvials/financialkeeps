import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Form from './Form';
import FormReview from './FormReview';

class GrossPayNew extends Component {
    state = { showReview: false };

    renderContent() {
        if(this.state.showReview) {
            return <FormReview 
                onCancel={() => this.setState({ showReview: false })}
            />;
        }

        return <Form onGrossPaySubmit={() =>
                        this.setState({ showReview: true }
                    )} 
                />
    }

    render() {
        return (
            <div>
                <div className="ui attached message">
                        <div className="header">
                            <h3>Add New Gross Pay</h3>
                        </div>
                </div>
            {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'grossPayForm'
})(GrossPayNew);