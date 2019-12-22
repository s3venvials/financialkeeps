import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import formFields from './formFields';
import axios from 'axios';

class BillsForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: "",
            amount: "",
            duedate: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e){
        e.preventDefault();

        const { title, amount, duedate } = this.state;

        let url = 'http://localhost:5000/api/new/bill';

        axios.post(url, { title, amount, duedate }, { withCredentials: true })
            .then((res) => {
                window.location = "/dashboard";
            }).catch((e) => console.log(e));
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
                        onChange = {this.handleChange}
                    />
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <form className="ui form attached fluid segment">
                    {this.renderFields()}
                    <Link to="/dashboard" className="ui red basic button">Cancel</Link>
                    <button className="ui teal basic button" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default BillsForm;