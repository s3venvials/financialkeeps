import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGrossPay, editGrossPay } from '../../actions';

class GrossPayEdit extends Component {
    state = { formValue: "" }

    componentDidMount() {
        this.props.fetchGrossPay();
    };

    render() {
        return (
            <div>
                <div className="ui attached message">
                    <div className="header">
                        <h3>Edit Gross Pay</h3>
                        <form className="ui form">
                            <div className="field">
                                <input type="text" name="amount" placeholder={this.props.grossPay[0].amount} />
                            </div>
                            <button className="ui basic blue button" onClick={() => editGrossPay()}>
                                Update
                            </button>
                            <a href="/dashboard" className="ui button">Cancel</a>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ grossPay }) {
    return { grossPay };
}

export default connect(mapStateToProps, { fetchGrossPay, editGrossPay })(GrossPayEdit);