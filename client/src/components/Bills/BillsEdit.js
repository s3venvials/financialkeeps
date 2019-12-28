import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import URI from '../../utils/network';

class BillsEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            amount: "",
            duedate: "",
            isRecurring: false,
            transactiontype: "",
            paymentperiod: "",
            id: "",
            error: "",
            frequencyofpay: 2
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }

    componentDidMount() {
        let url = `${URI.URI}/edit/bill/` + this.props.match.params.id;

        axios.get(url)
            .then((res) => {
                this.setState({ title: res.data.title });
                this.setState({ amount: res.data.amount });
                this.setState({ duedate: res.data.duedate });
                this.setState({ isRecurring: res.data.isRecurring });
                this.setState({ transactiontype: res.data.transactiontype });
                this.setState({ paymentperiod: res.data.paymentperiod });
                this.setState({ id: res.data._id });
            });

        axios.get(`${URI.URI}/api/user/profile`, { withCredentials: true })
            .then((res) => {
                this.setState({ frequencyofpay: res.data.frequencyofpay });
            })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleChecked(e) {
        const { name, checked } = e.target;
        this.setState({ [name]: checked });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { title, amount, duedate, id, isRecurring, transactiontype, paymentperiod } = this.state;
        let url = `${URI.URI}/edit/bill/update`;

        let regexp = /^\d+(\.\d{1,2})?$/;
        let regexpdate = /^\d{2}-\d{2}-\d{4}$/;

        if (title === "") {
            this.setState({ error: "Please provide a bill title." });
        } else if (amount === "" || regexp.test(amount) === false) {
            this.setState({ error: "Please provide a valid bill amount." });
        } else if (duedate === "" || regexpdate.test(duedate) === false) {
            this.setState({ error: "Please provide a valid due date. (MM/DD/YYYY)" });
        } else {

            axios.post(url, { title, amount, duedate, id, isRecurring, transactiontype, paymentperiod })
                .then((res) => {
                    window.location = "/managebills";
                }).catch((e) => console.log(e));
        }
    }

    renderMessage() {
        if (this.state.error !== "") {
            return <div className="ui red message">{this.state.error}</div>
        } else {
            return null;
        }
    }

    renderPaymentPeriodDropdown() {
        let { frequencyofpay } = this.state;

        if (frequencyofpay === 1) {
            return (
                <select name="paymentperiod" onChange={this.handleChange} >
                    <option value={this.state.paymentperiod}>{this.state.paymentperiod}</option>
                    <option value="Monthly PayDay1">Monthly PayDay1</option>
                </select>
            );
        }

        if (frequencyofpay === 2) {
            return (
                <select name="paymentperiod" onChange={this.handleChange} >
                    <option value={this.state.paymentperiod}>{this.state.paymentperiod}</option>
                    <option value="Bi - Weekly PayDay1">Bi - Weekly PayDay1</option>
                    <option value="Bi - Weekly PayDay2">Bi - Weekly PayDay2</option>
                </select>
            );
        } else {
            return (
                <select name="paymentperiod" onChange={this.handleChange} >
                    <option value={this.state.paymentperiod}>{this.state.paymentperiod}</option>
                    <option value="Weekly PayDay1">Weekly PayDay1</option>
                    <option value="Weekly PayDay2">Weekly PayDay2</option>
                    <option value="Weekly PayDay3">Weekly PayDay3</option>
                    <option value="Weekly PayDay4">Weekly PayDay4</option>
                </select>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderMessage()}
                <div className="ui attached message">
                    <div className="header">
                        <h3>Edit Bill</h3>
                        <form className="ui form">
                            <div className="field">
                                <label>Title</label>
                                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                            </div>
                            <div className="field">
                                <label>Amount</label>
                                <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange} />
                            </div>
                            <div className="field">
                                <label>Date</label>
                                <input type="text" name="duedate" value={this.state.duedate} onChange={this.handleChange} />
                            </div>

                            <div className="field">
                                <label>Recurring?</label>
                                <input type="checkbox" name="isRecurring" value={this.state.isRecurring} onChange={this.handleChecked} checked={this.state.isRecurring} />
                            </div>

                            <div className="field">
                                <label>Transaction Type</label>
                                <select name="transactiontype" onChange={this.handleChange}>
                                    <option value={this.state.transactiontype}>{this.state.transactiontype}</option>
                                    <option value="Manual">Manual</option>
                                    <option value="Automatic">Automatic</option>
                                </select>
                            </div>

                            <div className="field">
                                <label>Payment Period</label>
                                {this.renderPaymentPeriodDropdown()}
                            </div>

                            <input type="hidden" name="id" value={this.state.id} />

                            <button className="ui basic blue button" type="submit" onClick={this.handleSubmit} >Update</button>
                            <Link className="ui basic button" to="/managebills">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default BillsEdit;