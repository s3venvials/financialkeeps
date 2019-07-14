import React, { Component } from 'react';

class BillsList extends Component {

    render() {
        return (
            <div>

                <h4>Bills List </h4>

                <div className="ui list">
                    <div className="item">
                        1
                    </div>
                    <div className="item">
                        2
                    </div>
                    <div className="item">
                        3
                    </div>
                </div>

                <button class="ui basic button">
                    <i class="clipboard list icon"></i>
                    Manage
                </button>
            </div>
        )
    }
}

export default BillsList;