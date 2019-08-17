import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';


import Nav from './Nav';
import Landing from './Landing';
import Dashboard from './Dashboard';
import BillsNew from './Bills/BillsNew';
import Footer from './Footer';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Nav />
                    <div className="ui container" style={{ marginTop: '7em'}}>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route path="/bills/new" component={BillsNew} />
                    </div>
                    <Footer />
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);