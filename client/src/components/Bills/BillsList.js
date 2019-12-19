import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBills } from '../../actions';
import { Link } from 'react-router-dom';

class BillsList extends Component {
    componentDidMount() {
        this.props.fetchBills();
    };

    renderBills() {
        if (this.props.bills.length === 0) {
            return <p>No bills have been added</p>
        } else if (this.props.bills[0].loaded === false) {
            return <div className="ui active centered inline loader"></div>
        } else {
            return (
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>{(this.props.bills.map((bill) => {
                        return (
                            <tr key={bill.title}>
                                <td>{bill.title}</td>
                                <td>{bill.amount}</td>
                                <td>{new Date(bill.duedate).toLocaleDateString()}</td>
                                <td title="delete">
                                    <a style={{ color: 'red' }} href="/api/delete_bills">
                                        <i className="trash alternate outline icon"></i>
                                    </a>
                                </td>
                                <td><i className="edit icon"></i></td>
                            </tr>
                        )
                    }))}
                    </tbody>
                </table>
            );
        }
    }

    render() {
        return (
            <div>
                <Link to="/bills/new" className="circular ui green basic right floated button" style={{ marginBottom: '2em' }}>
                    <i className="plus icon"></i> New
                </Link>
                <h3>Bills List</h3>

                {this.renderBills()}

            </div>
        );
    }
};

function mapStateToProps({ bills }) {
    return { bills };
}

export default connect(mapStateToProps, { fetchBills })(BillsList);
