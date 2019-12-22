import React, { Component } from 'react';
import BillsList from '../components/Bills/BillsList';

class Dashboard extends Component {

    render() {
        return (
            <div>
                <h3 className="ui left floated">Dashboard</h3>
                <div className="ui divider"></div>
                <BillsList />
            </div>
        )
    }
} 

export default Dashboard;