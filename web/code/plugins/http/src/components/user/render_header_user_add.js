import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class RenderHeaderUserAdd extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        const { submitting } = this.props;
        return(
            <div id="scroller"  className="col-sm-12 bg-hearder bg-header-inventories">
                <div className="col-sm-6 m-width-60 ft-white m-nopadding">
                    <h1>Create New User</h1>
                </div>
                <div className="col-sm-6 m-width-40 m-nopadding text-right maring-t15">
                    <button type="submit" className="btn btn-primary btn-radius" disabled={submitting}>
                        {submitting ? <i/> : <i/>}Save
                    </button>
                    <Link to="/users" className="btn btn-primary btn-radius">Cancel</Link>
                </div>
            </div>
        )
    }
}
module.exports = RenderHeaderUserAdd;
