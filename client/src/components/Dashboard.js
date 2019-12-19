import React, { Component } from 'react';
import BillsList from './Bills/BillsList';
import GrossPayList from './GrossPay/List';

class Dashboard extends Component {

    render() {
        return (
            <div>
                <h3 className="ui left floated">Dashboard</h3>
                <div className="ui divider"></div>
                <GrossPayList />
                <BillsList />
            </div>
        )
    }
}

export default Dashboard;