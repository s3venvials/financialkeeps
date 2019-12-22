import React, { Component } from 'react';
import BillsForm from './BillsForm';

class BillsNew extends Component {

    render() {
        return (
            <div>
                <div className="ui attached message">
                        <div className="header">
                            <h3>Add New Bill</h3>
                            <BillsForm />
                        </div>
                </div>
            </div>
        );
    }
}

export default BillsNew;