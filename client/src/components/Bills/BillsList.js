import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBills } from '../../actions';

class BillsList extends Component {
    componentDidMount() {
        this.props.fetchBills();
    };

    renderBills() {
        return (
            <tbody>{(this.props.bills.map((bill) => {
                return (
                    <tr key = {bill.title}>
                        <td>{bill.title}</td>
                        <td>{bill.amount}</td>
                        <td>{new Date(bill.duedate).toLocaleDateString()}</td>
                        <td title="delete"><a style={{ color: 'red' }} href="/api/delete"><i className="trash alternate outline icon"></i></a></td>
                    </tr>
                )
                }))}
            </tbody>
        );
    }

    render() {
        return (
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th></th>
                    </tr>
                </thead>
                {this.renderBills()}
            </table>
        );
    }
};

function mapStateToProps({ bills }) {
    return { bills };
}

export default connect(mapStateToProps, { fetchBills })(BillsList);
