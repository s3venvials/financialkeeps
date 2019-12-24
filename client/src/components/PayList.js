import React, { Component } from "react";
import axios from "axios";

import URI from '../utils/network';

class PayList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            grosspay: "",
            netpay: "",
            frequencyofpay: "",
            data: [],
            loader: "ui active centered inline loader"
        }

        this.handleChecked = this.handleChecked.bind(this);
    }

    handleChecked(event) {
        let { data } = this.state;

        data.forEach(data => {
            if (data._id === event.target.value) {
                data.paid = event.target.checked

                event.preventDefault();

                axios.post(`${URI.URI}/api/update/paid`, { data }, { withCredentials: true })
                    .then((res) => {
                        this.setState({ data: res.data.bills });
                    }).catch((e) => {
                        console.log(e);
                    })
            }
        });
    }

    componentDidMount() {

        axios.get(`${URI.URI}/api/user/profile`, { withCredentials: true })
            .then((res) => {
                this.setState({ grosspay: res.data.grosspay });
                this.setState({ netpay: res.data.netpay });
                this.setState({ frequencyofpay: res.data.frequencyofpay });
            });

        axios.get(`${URI.URI}/api/bills`, { withCredentials: true })
            .then((res) => {
                this.setState({ data: res.data });
                this.setState({ loader: "" });
            });
    }

    renderMessage() {
        const { data } = this.state;

        if (data.length === 0) {
            return (
                <div className="ui info message">
                    No bills have been added yet, head over to the
                    Manage Bills page to add them!
                </div>
            );
        } else {
            return null;
        }
    }

    renderGrosspay() {
        if (this.state.grosspay !== 0) {
            return <div className="ui info  message" > Monthly Gross Pay ${this.state.grosspay}</div>
        } else {
            return null;
        }
    }

    renderNetpay() {
        if (this.state.netpay !== 0) {
            return <div className="ui info  message" > Monthly Net Pay ${this.state.netpay}</div>
        } else {
            return null;
        }
    }

    renderMonthlyTableList() {
        return (
            <table className="ui unstackable celled table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>{(this.state.data.map((bill) => {
                    if (bill.paymentperiod === "Monthly PayDay1") {
                        return (
                            <tr key={bill._id}>
                                <td>{bill.title}</td>
                                <td>${bill.amount}</td>
                                <td>{new Date(bill.duedate).toLocaleDateString()}</td>
                                <td><input type="checkbox" name="paid" value={bill._id} checked={bill.paid} onChange={this.handleChecked} /></td>
                            </tr>
                        )
                    } else {
                        return null;
                    }
                }))}
                </tbody>
            </table>
        );
    }

    renderBiWeeklyTableList1() {
        return (
            <table className="ui unstackable celled table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>{(this.state.data.map((bill) => {
                    if (bill.paymentperiod === "Bi - Weekly PayDay1") {
                        return (
                            <tr key={bill._id}>
                                <td>{bill.title}</td>
                                <td>${bill.amount}</td>
                                <td>{new Date(bill.duedate).toLocaleDateString()}</td>
                                <td><input type="checkbox" name="paid" value={bill._id} checked={bill.paid} onChange={this.handleChecked} /></td>
                            </tr>
                        )
                    } else {
                        return null;
                    }
                }))}
                </tbody>
            </table>
        );
    }

    renderBiWeeklyTableList2() {
        return (
            <table className="ui unstackable celled table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>{(this.state.data.map((bill) => {
                    if (bill.paymentperiod === "Bi - Weekly PayDay2") {
                        return (
                            <tr key={bill._id}>
                                <td>{bill.title}</td>
                                <td>${bill.amount}</td>
                                <td>{new Date(bill.duedate).toLocaleDateString()}</td>
                                <td><input type="checkbox" name="paid" value={bill._id} checked={bill.paid} onChange={this.handleChecked} /></td>
                            </tr>
                        )
                    } else {
                        return null;
                    }
                }))}
                </tbody>
            </table>
        );
    }

    renderWeeklyTableList1() {
        return (
            <table className="ui unstackable celled table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>{(this.state.data.map((bill) => {
                    if (bill.paymentperiod === "Weekly PayDay1") {
                        return (
                            <tr key={bill._id}>
                                <td>{bill.title}</td>
                                <td>${bill.amount}</td>
                                <td>{new Date(bill.duedate).toLocaleDateString()}</td>
                                <td><input type="checkbox" name="paid" value={bill._id} checked={bill.paid} onChange={this.handleChecked} /></td>
                            </tr>
                        )
                    } else {
                        return null;
                    }
                }))}
                </tbody>
            </table>
        );
    }

    renderWeeklyTableList2() {
        return (
            <table className="ui unstackable celled table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>{(this.state.data.map((bill) => {
                    if (bill.paymentperiod === "Weekly PayDay2") {
                        return (
                            <tr key={bill._id}>
                                <td>{bill.title}</td>
                                <td>${bill.amount}</td>
                                <td>{new Date(bill.duedate).toLocaleDateString()}</td>
                                <td><input type="checkbox" name="paid" value={bill._id} checked={bill.paid} onChange={this.handleChecked} /></td>
                            </tr>
                        )
                    } else {
                        return null;
                    }
                }))}
                </tbody>
            </table>
        );
    }

    renderWeeklyTableList3() {
        return (
            <table className="ui unstackable celled table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>{(this.state.data.map((bill) => {
                    if (bill.paymentperiod === "Weekly PayDay3") {
                        return (
                            <tr key={bill._id}>
                                <td>{bill.title}</td>
                                <td>${bill.amount}</td>
                                <td>{new Date(bill.duedate).toLocaleDateString()}</td>
                                <td><input type="checkbox" name="paid" value={bill._id} checked={bill.paid} onChange={this.handleChecked} /></td>
                            </tr>
                        )
                    } else {
                        return null;
                    }
                }))}
                </tbody>
            </table>
        );
    }

    renderWeeklyTableList4() {
        return (
            <table className="ui unstackable celled table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Paid</th>
                    </tr>
                </thead>
                <tbody>{(this.state.data.map((bill) => {
                    if (bill.paymentperiod === "Weekly PayDay4") {
                        return (
                            <tr key={bill._id}>
                                <td>{bill.title}</td>
                                <td>${bill.amount}</td>
                                <td>{new Date(bill.duedate).toLocaleDateString()}</td>
                                <td><input type="checkbox" name="paid" value={bill._id} checked={bill.paid} onChange={this.handleChecked} /></td>
                            </tr>
                        )
                    } else {
                        return null;
                    }
                }))}
                </tbody>
            </table>
        );
    }

    renderContent() {
        const { frequencyofpay, loader } = this.state;

        if (loader === "") {
            if (frequencyofpay === 1) {
                return (
                    <div>
                        <div className="ui message">
                            Monthly PayDay
                        </div>

                        {this.renderMonthlyTableList()}
                    </div>
                );
            } else if (frequencyofpay === 2) {
                return (
                    <div>
                        <div className="ui message">
                            Bi - Weekly PayDay 1
                        </div>

                        {this.renderBiWeeklyTableList1()}
                        <div className="ui message">
                            Bi - Weekly PayDay 2
                        </div>

                        {this.renderBiWeeklyTableList2()}
                    </div>
                );
            } else {
                return (
                    <div>
                        <div className="ui message">
                            Weekly PayDay 1
                        </div>

                        {this.renderWeeklyTableList1()}

                        <div className="ui message">
                            Weekly PayDay 2
                        </div>

                        {this.renderWeeklyTableList2()}

                        <div className="ui message">
                            Weekly PayDay 3
                        </div>

                        {this.renderWeeklyTableList3()}

                        <div className="ui message">
                            Weekly PayDay 4
                        </div>

                        {this.renderWeeklyTableList4()}
                    </div>
                );
            }
        }
    }

    render() {
        return (
            <div>
                <div className={this.state.loader}></div>
                {this.renderMessage()}
                {this.renderGrosspay()}
                {this.renderNetpay()}
                {this.renderContent()}
            </div>
        );
    }
}

export default PayList;