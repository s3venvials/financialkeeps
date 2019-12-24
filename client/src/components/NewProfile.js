import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import URI from '../utils/network';

class NewProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            grosspay: "",
            netpay: "",
            frequencyofpay: "",
            newuser: false,
            error: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderMessage = this.renderMessage.bind(this);
        this.handleOptOut = this.handleOptOut.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    renderMessage() {
        if (this.state.error !== "") {
            return <div className="ui red message">{this.state.error}</div>
        } else {
            return null;
        }
    }

    handleOptOut(e){
        e.preventDefault();

        const { newuser } = this.state;

        axios.post(`${URI.URI}/api/user/optout`, { newuser }, { withCredentials: true })
            .then((res) => {
                window.location = "/managebills";
            }).catch((e) => { console.log(e) });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { grosspay, netpay, frequencyofpay, newuser, id } = this.state;

        let url = `${URI.URI}/api/user/new/profile`;

        let regexp = /^\d+(\.\d{1,2})?$/;

        if (grosspay === "" || regexp.test(grosspay) === false) {
            this.setState({ error: "Please provide a valid pross amount." });
        } else if (netpay === "" || regexp.test(netpay) === false) {
            this.setState({ error: "Please provide a valid net amount." });
        } else {
            axios.post(url, { grosspay, netpay, frequencyofpay, newuser, id }, { withCredentials: true })
                .then((res) => {
                    window.location = "/dashboard";
                }).catch((e) => console.log(e));
        }
    }

    render() {
        return (
            <div>
                <div className="ui attached message">
                    <div className="header">
                        <h3>New Profile</h3>
                        <p>
                            Welcome, {this.props.auth['username']} to get started please provide
                            us with the following information. We will only use your
                            data to create your profile and customize your dashboard.
                        </p>
                        <p>
                            If you wish to opt-out some features will not be available.
                        </p>
                        <p>
                            This information can be added or updated at a later time from the Edit Profile page.
                        </p>
                        <p>
                            To no longer see this page after login, please submit your information
                            or opt-out.
                        </p>
                    </div>
                </div>

                <div style={{ margin: "1em"}}>
                    {this.renderMessage()}
                </div>

                <form className="ui form" style={{ marginTop: "1.5em" }}>
                    <div className="field">
                        <label>Monthly Gross Pay</label>
                        <input type="text" name="grosspay" value={this.state.grosspay} onChange={this.handleChange} />
                    </div>

                    <div className="field">
                        <label>Monthly Net Pay</label>
                        <input type="text" name="netpay" value={this.state.netpay} onChange={this.handleChange} />
                    </div>

                    <div className="field">
                        <label>Frequency of Pay</label>
                        <select name="frequencyofpay" onChange={this.handleChange} >
                            <option value="">Select One...</option>
                            <option value="2">Bi - Weekly</option>
                            <option value="4">Weekly</option>
                            <option value="1">Monthly</option>
                        </select>
                    </div>

                    <input type="hidden" name="newuser" value={this.state.newuser} onChange={this.handleChange} />

                    <button className="ui basic blue button" onClick={this.handleSubmit} type="submit">Submit</button>
                </form>

                <div style={{ marginTop: '1em' }}>
                    <button className="ui basic button" onClick={this.handleOptOut} name="optout">Opt-out</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}


export default connect(mapStateToProps)(NewProfile);