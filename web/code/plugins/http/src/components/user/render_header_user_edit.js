import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class RenderHeaderUserEdit extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        const { submitting } = this.props;
        return(
            <div id="scroller" className="col-sm-12 bg-hearder bg-header-inventories">
                <div className="col-xs-6 m-width-60 ft-white m-nopadding">
                    <h1>User Details</h1>
                </div>
                <div className="col-sm-6 m-width-40 m-nopadding text-right maring-t15">
                    <Link to="/users" className="btn btn-primary btn-radius">Back to User List</Link>
                    <button type="submit" className="btn btn-primary btn-radius" disabled={submitting}>Update User</button>
                </div>
            </div>
        )
    }
}
module.exports = RenderHeaderUserEdit;
