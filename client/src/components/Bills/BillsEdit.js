import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

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
            error: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let url = "http://localhost:5000/edit/bill/" + this.props.match.params.id;

        axios.get(url)
            .then((res) => {
                this.setState({ title: res.data.title });
                this.setState({ amount: res.data.amount });
                this.setState({ duedate: res.data.duedate });
                this.setState({ isRecurring: res.data.isRecurring });
                this.setState({ transactiontype: res.data.transactiontype });
                this.setState({ paymentperiod: res.data.paymentperiod });
                this.setState({ id: res.data._id });
            })
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

        const { title, amount, duedate, id, isRecurring, transactiontype, paymentperiod } = this.state;
        let url = "http://localhost:5000/edit/bill/update";

        let regexp = /^\d+(\.\d{1,2})?$/;

        if (title === "") {
            this.setState({ error: "Please provide a bill title." });
        } else if (amount === "" || regexp.test(amount) === false) {
            this.setState({ error: "Please provide a valid bill amount." });
        } else {

            axios.post(url, { title, amount, duedate, id, isRecurring, transactiontype, paymentperiod })
                .then((res) => {
                    window.location = "/dashboard";
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
                                <select name="transactiontype" onChange={this.handleChange}>
                                    <option value={this.state.transactiontype}>{this.state.transactiontype}</option>
                                    <option value="Manual">Manual</option>
                                    <option value="Auto">Automatic</option>
                                </select>
                            </div>

                            <div className="field">
                                <select name="paymentperiod" onChange={this.handleChange} >
                                    <option value="this.state.paymentperiod">{this.state.paymentperiod}</option>
                                    <option value="PayDay1">PayDay1</option>
                                    <option value="PayDay2">PayDay2</option>
                                </select>
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