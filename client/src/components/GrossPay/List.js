import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGrossPay } from '../../actions';
import { Link } from 'react-router-dom';

class GrossPayList extends Component {
    componentDidMount() {
        this.props.fetchGrossPay();
    };

    renderGrossPay() {
        return (
            <div>
                ${this.props.grossPay.map((gross) => { return gross.amount })}
            </div>
        )
    }

    renderAction() {
        if (this.props.grossPay.length === 0) {
            return (
                <div>
                    <Link to="/grosspay/new" className="circular ui green basic right floated button" style={{ marginBottom: '2em' }}>
                        <i className="plus icon"></i> New
                    </Link>

                    <p>Add your monthly gross pay here!</p>
                </div>
            )
        } else if (this.props.grossPay[0].loaded === false) {
            return <div className="ui active centered inline loader"></div>
        } else if (this.props.grossPay.length !== 0) {
            return (
                <Link to="/grosspay/edit" className="circular ui blue basic right floated button" style={{ marginBottom: '2em' }}>
                    <i className="edit icon"></i> Edit
                    </Link>
            )
        }
    }

    render() {
        return (
            <div>
                <h3>Gross Pay Per Month</h3>
                {this.renderAction()}
                {this.renderGrossPay()}
            </div>
        );
    }
};

function mapStateToProps({ grossPay }) {
    return { grossPay };
}

export default connect(mapStateToProps, { fetchGrossPay })(GrossPayList);
