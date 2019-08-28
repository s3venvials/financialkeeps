import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BillsList from './Bills/BillsList';

class Dashboard extends Component {

    render() {
        return (
            <div>
                <h3 className="ui left floated">Dashboard</h3>
                <div className="ui divider"></div>
                <div>
                    <Link to="/bills/new" className="circular ui green basic right floated button" style={{ marginBottom: '2em' }}>
                        <i className="plus icon"></i> New
                    </Link>
                </div>
                <BillsList />
            </div>
        )
    }
}

export default Dashboard;