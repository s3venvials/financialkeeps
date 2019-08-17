import React, { Component } from 'react';
import BillsForm from './BillsForm';

class BillsNew extends Component {
    render() {
        return (
            <div>
                <h3>Add New Bill</h3>
                <BillsForm />
            </div>
        );
    }
}

export default BillsNew;