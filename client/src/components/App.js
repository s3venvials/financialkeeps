import React, { Component } from 'reactn';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Nav from './Nav';
import Landing from './Landing';
import Dashboard from './Dashboard';
import ManageBills from './ManageBills';
import NewProfile from './NewProfile';
import EditProfile from './EditProfile';
import Footer from './Footer';
import BillsNew from './Bills/BillsNew';
import BillsEdit from './Bills/BillsEdit';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Nav />
                    <div className="ui container" style={{ marginTop: '2em', marginBottom: '5em' }}>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/managebills" component={ManageBills} />
                        <Route exact path="/new/bill" component={BillsNew} />
                        <Route exact path="/edit/bill/:id" component={BillsEdit} />
                        <Route exact path="/new/profile" component={NewProfile} />
                        <Route exact path="/edit/profile" component={EditProfile} />
                    </div>
                    <Footer />
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);