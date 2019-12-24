import React, { Component } from 'reactn';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import formFields from './formFields';
import axios from 'axios';

class BillsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            amount: "",
            duedate: "",
            isRecurring: false,
            transactiontype: "",
            paymentperiod: "",
            error: "",
            frequencyofpay: 2
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleChecked(e) {
        console.log(e.target.checked);
        const { name, checked } = e.target;
        this.setState({ [name]: checked });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { title, amount, duedate, isRecurring, transactiontype, paymentperiod } = this.state;

        let url = 'https://financialkeeps.herokuapp.com/api/new/bill';

        let regexp = /^\d+(\.\d{1,2})?$/;

        if (title === "") {
            this.setState({ error: "Please provide a bill title." });
        } else if (amount === "" || regexp.test(amount) === false) {
            this.setState({ error: "Please provide a valid bill amount." });
        } else {
            axios.post(url, { title, amount, duedate, isRecurring, transactiontype, paymentperiod }, { withCredentials: true })
                .then((res) => {
                    window.location = "/managebills";
                }).catch((e) => console.log(e));
        }
    }

    renderFields() {
        return _.map(formFields, ({ label, name, type }) => {
            return (
                <div className="field" key={name}>
                    <label>{label}</label>
                    <input
                        key={name}
                        type={type}
                        label={label}
                        name={name}
                        onChange={this.handleChange}
                    />
                </div>
            );
        });
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
                    <option value="">Select Payment Period...</option>
                    <option value="PayDay1">PayDay1</option>
                </select>
            );
        }

        if (frequencyofpay === 2) {
            return (
                <select name="paymentperiod" onChange={this.handleChange} >
                    <option value="">Select Payment Period...</option>
                    <option value="PayDay1">PayDay1</option>
                    <option value="PayDay2">PayDay2</option>
                </select>
            );
        } else {
            return (
                <select name="paymentperiod" onChange={this.handleChange} >
                    <option value="">Select Payment Period...</option>
                    <option value="PayDay1">PayDay1</option>
                    <option value="PayDay2">PayDay2</option>
                    <option value="PayDay3">PayDay3</option>
                    <option value="PayDay4">PayDay4</option>
                </select>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderMessage()}
                <small>Required Fields *</small>
                <form className="ui form attached fluid segment">
                    {this.renderFields()}
                    <div className="field">
                        <label>Recurring?</label>
                        <input type="checkbox" checked={this.state.isRecurring} value={this.state.isRecurring} name="isRecurring" onChange={this.handleChecked} />
                    </div>
                    <div className="field">
                        <select name="transactiontype" onChange={this.handleChange}>
                            <option value="">Select Transaction Type...</option>
                            <option value="Manual">Manual</option>
                            <option value="Auto">Automatic</option>
                        </select>
                    </div>
                    <div className="field">
                        {this.renderPaymentPeriodDropdown()}
                    </div>
                    <Link to="/managebills" className="ui red basic button">Cancel</Link>
                    <button className="ui teal basic button" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default BillsForm;