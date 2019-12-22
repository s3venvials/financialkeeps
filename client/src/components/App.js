import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Nav from './Nav';
import Landing from './Landing';
import Dashboard from './Dashboard';
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
                        <Route exact path="/new/bill" component={BillsNew} />
                        <Route exact path="/edit/bill/:id" component={BillsEdit} />
                    </div>
                    <Footer />
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);