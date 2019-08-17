import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

    render() {
        return (
            <div>
                <h3>Dashboard</h3>
                <Link to="/bills/new" className="circular ui green basic right floated button">
                    <i className="plus icon"></i> New
                </Link>
            </div>
        )
    }
}

export default Dashboard;