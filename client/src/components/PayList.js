import React, { Component } from "react";
import axios from "axios";

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
    }

    componentDidMount() {

        axios.get("http://localhost:5000/api/user/profile", { withCredentials: true })
            .then((res) => {
                this.setState({ grosspay: res.data.grosspay });
                this.setState({ netpay: res.data.netpay });
                this.setState({ frequencyofpay: res.data.frequencyofpay });
            });

        axios.get("http://localhost:5000/api/bills", { withCredentials: true })
            .then((res) => {
                this.setState({ data: res.data });
                this.setState({ loader: "" });
            });
    }

    renderMessage(){
        const { data } = this.state;

        if (data.length === 0){
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

    renderGrosspay(){
        if (this.state.grosspay !== 0){
            return <div className="ui info  message" > Monthly Gross Pay ${this.state.grosspay}</div>
        } else {
            return null;
        }
    }

    renderNetpay(){
        if (this.state.netpay !== 0){
            return <div className="ui info  message" > Monthly Net Pay ${this.state.netpay}</div>
        } else {
            return null;
        }
    }

    renderContent() {
        const { frequencyofpay, loader, data } = this.state;

        if (loader === "") {
            if (frequencyofpay === 1) {
                return (
                    <div>
                        <div className="ui message">
                            Monthly PayDay
                        </div>
                    </div>
                );
            } else if (frequencyofpay === 2) {
                return (
                    <div>
                        <div className="ui message">
                            Bi - Weekly PayDay 1
                        </div>
                        {/* <div className="ui list">
                            {(data.map((data) => {
                                if (data.paymentperiod === "payday1") {
                                    return (
                                        <div key={data._id} className="item">
                                            <div className="header">Title</div>
                                            {data.title}
                                        </div>
                                    );
                                }
                            }))}
                        </div> */}

                        <div className="ui message">
                            Bi - Weekly PayDay 2
                        </div>

                        {/* <div className="ui list">
                            {(data.map((data) => {
                                if (data.paymentperiod === "payday2") {
                                    return (
                                        <div key={data._id} className="item">
                                            <div className="header">Title</div>
                                            {data.title}
                                        </div>
                                    );
                                }
                            }))}
                        </div> */}
                    </div>
                );
            } else {
                return (
                    <div>
                        <div className="ui message">
                            Weekly PayDay 1
                        </div>

                        <div className="ui message">
                            Weekly PayDay 2
                        </div>

                        <div className="ui message">
                            Weekly PayDay 3
                        </div>

                        <div className="ui message">
                            Weekly PayDay 4
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