import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';


import Nav from './Nav';
import Landing from './Landing';
import Dashboard from './Dashboard';
import BillsNew from './Bills/BillsNew';
import GrossPayNew from './GrossPay/New';
import GrossPayEdit from './GrossPay/Edit';
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
                    <div className="ui container" style={{ marginTop: '2em', marginBottom: '5em' }}>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route path="/bills/new" component={BillsNew} />
                        <Route path="/grosspay/new" component={GrossPayNew} />
                        <Route path="/grosspay/edit" component={GrossPayEdit} />
                    </div>
                    <Footer />
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);