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
            id: ""
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
                this.setState({ id: res.data._id });
            })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e){
        e.preventDefault();

        const { title, amount, duedate, id } = this.state;
        let url = "http://localhost:5000/edit/bill/update";

        axios.post(url, { title, amount, duedate, id })
            .then((res) => {
                window.location = "/dashboard";
            }).catch((e) => console.log(e));
    }

    render() {
        return (
            <div>
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
                                <input type="text" name="title" value={this.state.duedate} onChange={this.handleChange} />
                            </div>
                            <input type="hidden" name="id" value={this.state.id} />

                            <button className="ui basic blue button" type="submit" onClick={this.handleSubmit} >Update</button>
                            <Link className="ui basic button" to="/dashboard">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default BillsEdit;