import React, { Component } from 'react';
import PayList from './PayList';

class Dashboard extends Component {

    render() {
        return (
            <div>
                <h3>Dashboard</h3>
                <PayList />
            </div>
        )
    }
}

export default Dashboard;