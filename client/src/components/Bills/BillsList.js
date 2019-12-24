import React, { Component } from 'reactn';
import { Link } from 'react-router-dom';
import axios from 'axios';

import URI from '../../utils/network'

class BillsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loader: "ui active centered inline loader",
            selected: [],
            success: ""
        }

        this.handleCheckChildeElement = this.handleCheckChildeElement.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e) {
        e.preventDefault();

        this.setState({ loader: "ui active centered inline loader" });

        this.setState({ selected: [] });

        let url = `${URI.URI}/api/delete`;

        let data = this.state.selected;

        axios.post(url, { data }, { withCredentials: true })
            .then((res) => {
                this.setGlobal({ data: res.data.bills });
                this.setState({ success: res.data.success });
                this.setState({ loader: "" });
            }).catch((e) => console.log(e));
    }

    renderDeleteBtn() {
        if (this.state.selected.length > 0) {
            return (
                <form className="ui form">
                    <button className="ui basic red button" onClick={this.handleDelete}>Delete Selected Bills</button>
                </form>
            );
        } else {
            return null;
        }
    }

    handleCheckChildeElement = (event) => {

        var data = this.global.data;

        data.forEach(data => {
            if (data._id === event.target.value) {
                data.isChecked = event.target.checked

                if (event.target.checked === true) {

                    this.setState({ selected: [...this.state.selected, data] });

                } else {

                    let remove = this.state.selected.map(function (item) { return item._id; }).indexOf(event.target.value);
                    this.setState({
                        selected: this.state.selected.filter((_, i) => i !== remove)
                    });

                }
            }
        });
        this.setGlobal({ data });
    }

    componentDidMount() {
        let url = `${URI.URI}/api/bills`;

        axios.get(url, { withCredentials: true })
            .then((res) => {
                let data = res.data;
                this.setState({ loader: "" });
                this.setGlobal({ data: data });
                this.setGlobal({ frequencyofpay: res.data.frequencyofpay })
            });
    }

    renderBills() {

        const { loader } = this.state;
        const { data } = this.global;

        if (loader === "" && data.length === 0) {
            return <div className="ui info message"><i className="info circle icon"></i> No bills have been added select the New button to get started.</div>;
        } else if (loader === "" && data.length !== 0) {
            return (
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Recurring</th>
                            <th>Transaction Type</th>
                            <th>Payment Period</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>{(this.global.data.map((bill) => {
                        return (
                            <tr key={bill._id}>
                                <td>{bill.title}</td>
                                <td>${bill.amount}</td>
                                <td>{new Date(bill.duedate).toLocaleDateString()}</td>
                                <td>{bill.isRecurring.toString()}</td>
                                <td>{bill.transactiontype}</td>
                                <td>{bill.paymentperiod}</td>
                                <td title="delete">
                                    <i className="trash icon"></i> <input type="checkbox" value={bill._id} onChange={this.handleCheckChildeElement} />
                                </td>
                                <td>
                                    <Link to={"/edit/bill/" + bill._id} >
                                        <i className="edit icon"></i>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }))}
                    </tbody>
                </table>
            );
        }

    }

    renderMessage() {
        if (this.state.success !== "") {
            return (
                <div className="ui success message">
                    <i className="check circle icon"></i> {this.state.success}
                </div>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <Link to="/new/bill" className="circular ui green basic right floated button" style={{ marginBottom: '2em' }}>
                    <i className="plus icon"></i> New
                </Link>
                <h3>Manage Bills</h3>
                {this.renderMessage()}
                {this.renderDeleteBtn()}
                <div className={this.state.loader}></div>
                {this.renderBills()}
            </div>
        );
    }
};

export default BillsList;
