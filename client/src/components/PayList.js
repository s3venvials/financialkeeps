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
            loader: "ui active centered inline loader",
            currency: "USD",
            monthstartamount: 0,
            biweeklystartamount: 0,
            weeklystartamount: 0,
            endmonthlypayday: 0,
            endbiweeklypayday1: 0,
            endbiweeklypayday2: 0,
            endweeklypayday1: 0,
            endweeklypayday2: 0,
            endweeklypayday3: 0,
            endweeklypayday4: 0
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
                this.setState({ monthstartamount: res.data.netpay });
                this.setState({ biweeklystartamount: Math.round(res.data.netpay / 2) });
                this.setState({ weeklystartamount: Math.round(res.data.netpay / 4) });
            });

        axios.get(`${URI.URI}/api/bills`, { withCredentials: true })
            .then((res) => {
                this.setState({ data: res.data });
                this.setState({ loader: "" });

                let endmonthlypayday = 0;
                let endbiweeklypayday1 = 0;
                let endbiweeklypayday2 = 0;
                let endweeklypayday1 = 0;
                let endweeklypayday2 = 0;
                let endweeklypayday3 = 0;
                let endweeklypayday4 = 0;

                if (res.data.length > 0) {
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].paymentperiod === "Monthly PayDay1") {
                            endmonthlypayday += (parseFloat(res.data[i].amount) * 100 / 100);
                        } else if (res.data[i].paymentperiod === "Bi - Weekly PayDay1") {
                            endbiweeklypayday1 += (parseFloat(res.data[i].amount) * 100 / 100);
                        } else if (res.data[i].paymentperiod === "Bi - Weekly PayDay2") {
                            endbiweeklypayday2 += (parseFloat(res.data[i].amount) * 100 / 100);
                        } else if (res.data[i].paymentperiod === "Weekly PayDay1") {
                            endweeklypayday1 += (parseFloat(res.data[i].amount) * 100 / 100);
                        } else if (res.data[i].paymentperiod === "Weekly PayDay2") {
                            endweeklypayday2 += (parseFloat(res.data[i].amount) * 100 / 100);
                        } else if (res.data[i].paymentperiod === "Weekly PayDay3") {
                            endweeklypayday3 += (parseFloat(res.data[i].amount) * 100 / 100);
                        } else if (res.data[i].paymentperiod === "Weekly PayDay4") {
                            endweeklypayday4 += (parseFloat(res.data[i].amount) * 100 / 100);
                        }
                    }

                    let options = { style: 'currency', currency: this.state.currency };

                    let monthAmount = new Intl.NumberFormat('en-US', options).format(this.state.monthstartamount - endmonthlypayday);

                    let endbiweeklypayday1amount = new Intl.NumberFormat('en-US', options).format(this.state.biweeklystartamount - endbiweeklypayday1);
                    let endbiweeklypayday2amount = new Intl.NumberFormat('en-US', options).format(this.state.biweeklystartamount - endbiweeklypayday2);

                    let endweeklypayday1amount = new Intl.NumberFormat('en-US', options).format(this.state.weeklystartamount - endweeklypayday1);
                    let endweeklypayday2amount = new Intl.NumberFormat('en-US', options).format(this.state.weeklystartamount - endweeklypayday2);
                    let endweeklypayday3amount = new Intl.NumberFormat('en-US', options).format(this.state.weeklystartamount - endweeklypayday3);
                    let endweeklypayday4amount = new Intl.NumberFormat('en-US', options).format(this.state.weeklystartamount - endweeklypayday4);

                    this.setState({ endmonthlypayday: monthAmount });

                    this.setState({ endbiweeklypayday1: endbiweeklypayday1amount });
                    this.setState({ endbiweeklypayday2: endbiweeklypayday2amount });

                    this.setState({ endweeklypayday1: endweeklypayday1amount });
                    this.setState({ endweeklypayday2: endweeklypayday2amount });
                    this.setState({ endweeklypayday3: endweeklypayday3amount });
                    this.setState({ endweeklypayday4: endweeklypayday4amount });
                }
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

                        Start Amount: ${this.state.monthstartamount}

                        {this.renderMonthlyTableList()}

                        <div style={{ margin: "0.5em" }}>
                            End Amount: {this.state.endmonthlypayday}
                        </div>

                    </div>
                );
            } else if (frequencyofpay === 2) {
                return (
                    <div>
                        <div className="ui message">
                            Bi - Weekly PayDay 1
                        </div>

                        Start Amount: ${this.state.biweeklystartamount}

                        {this.renderBiWeeklyTableList1()}

                        End Amount: {this.state.endbiweeklypayday1}

                        <div className="ui message">
                            Bi - Weekly PayDay 2
                        </div>

                        Start Amount: ${this.state.biweeklystartamount}

                        {this.renderBiWeeklyTableList2()}

                        <div style={{ margin: "0.5em" }}>
                            End Amount: {this.state.endbiweeklypayday2}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <div className="ui message">
                            Weekly PayDay 1
                        </div>

                        Start Amount: ${this.state.weeklystartamount}

                        {this.renderWeeklyTableList1()}

                        End Amount: {this.state.endweeklypayday1}

                        <div className="ui message">
                            Weekly PayDay 2
                        </div>

                        Start Amount: ${this.state.weeklystartamount}

                        {this.renderWeeklyTableList2()}

                        End Amount: {this.state.endweeklypayday2}

                        <div className="ui message">
                            Weekly PayDay 3
                        </div>

                        Start Amount: ${this.state.weeklystartamount}

                        {this.renderWeeklyTableList3()}

                        End Amount: {this.state.endweeklypayday3}

                        <div className="ui message">
                            Weekly PayDay 4
                        </div>

                        Start Amount: ${this.state.weeklystartamount}

                        {this.renderWeeklyTableList4()}

                        <div style={{ margin: "0.5em" }}>
                            End Amount: {this.state.endweeklypayday4}
                        </div>
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