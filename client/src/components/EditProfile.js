import React, { Component } from 'reactn';
import axios from 'axios';

class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            grosspay: "",
            netpay: "",
            frequencyofpay: "",
            id: "",
            showConfirm: false,
            newuser: false,
            error: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.renderMessage = this.renderMessage.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    renderMessage() {
        if (this.state.error !== "") {
            return <div className="ui red message">{this.state.error}</div>
        } else {
            return null;
        }
    }

    handleUpdate(e) {
        e.preventDefault();

        const { grosspay, netpay, frequencyofpay, newuser, id } = this.state;

        let url = 'http://localhost:5000/api/update/user';

        let regexp = /^\d+(\.\d{1,2})?$/;

        if (grosspay === "" || regexp.test(grosspay) === false) {
            this.setState({ error: "Please provide a valid pross amount." });
        } else if (netpay === "" || regexp.test(netpay) === false) {
            this.setState({ error: "Please provide a valid net amount." });
        } else {
            axios.post(url, { grosspay, netpay, frequencyofpay, newuser, id }, { withCredentials: true })
                .then((res) => {
                    window.location = "/dashboard";
                }).catch((e) => console.log(e));
        }
    }

    handleConfirm(e){
        if(e.target.name === "deleteProfile"){
            this.setState({ showConfirm: true });
        }

        if(e.target.name === "cancelDelete"){
            this.setState({ showConfirm: false });
        }
    }

    handleDelete(e) {
        e.preventDefault();

        let url = "http://localhost:5000/api/delete/user";

        const { id } = this.state;

        axios.post(url, { id }, { withCredentials: true })
            .then((res) => {
                window.location = "/";
            }).catch((e) => console.log(e));
    }

    componentDidMount() {
        let url = "http://localhost:5000/api/user/profile";
        axios.get(url, { withCredentials: true })
            .then((res) => {
                this.setState({ username: res.data.username });
                this.setState({ grosspay: res.data.grosspay });
                this.setState({ netpay: res.data.netpay });
                this.setState({ frequencyofpay: res.data.frequencyofpay });
                this.setState({ id: res.data._id});
            }).catch((error) => console.log(error));
    }

    renderConfirm(){
        if (this.state.showConfirm){
            return (
                <div className="ui message">
                    <p>
                        We are sorry to see you go, but thank you for trying us out! Please be aware that by removing your profile
                        all of your associated data will be permanently removed.
                    </p>
                    <button className="ui red button" onClick={this.handleDelete}>Confirm Delete</button>
                    <button className="ui button" name="cancelDelete" onClick={this.handleConfirm}>Cancel</button>
                </div>
            );
        } else {
            return null;
        }
    }

    renderExistingOption(){
        if (this.state.frequencyofpay === 1) {
            return <option value="1">Monthly</option>
        } else if (this.state.frequencyofpay === 2) {
            return <option value="2">Bi - Weekly</option>
        } else {
            return <option value="4">Weekly</option>
        }      
    }

    renderContent() {
        return (
            <div>
                {this.renderMessage()}
                <form className="ui form">
                    <div className="field">
                        <label>Display Name</label>
                        {this.state.username}
                    </div>

                    <div className="field">
                        <label>Gross Per Month</label>
                        <input type="text" name="grosspay" value={this.state.grosspay} onChange={this.handleChange} />
                    </div>

                    <div className="field">
                        <label>Net Per Month</label>
                        <input type="text" name="netpay" value={this.state.netpay} onChange={this.handleChange} />
                    </div>

                    <div className="field">
                        <label>Frequency of Pay</label>
                        <select name="frequencyofpay" onChange={this.handleChange}>
                            {this.renderExistingOption()}
                            <option value="2">Bi - Weekly</option>
                            <option value="4">Weekly</option>
                            <option value="1">Monthly</option>
                        </select>
                    </div>

                    <input type="hidden" name="newuser" value={this.state.newuser} onChange={this.handleChange} />

                    <button className="ui basic blue button" onClick={this.handleUpdate} type="submit">Update</button>
                </form>

                <div style={{ marginTop: '1em' }}>
                    <button className="ui basic orange button" name="deleteProfile" onClick={this.handleConfirm}>Remove Profile</button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h3>Edit Profile</h3>
                {this.renderContent()}
                {this.renderConfirm()}
            </div>
        )
    }
}

export default EditProfile;