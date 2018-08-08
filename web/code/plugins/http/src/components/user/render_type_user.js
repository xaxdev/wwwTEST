import React, { Component, PropTypes } from 'react';

class RenderTypeUser extends Component {
    constructor(props) {
        super(props);

    }
    render(){
        const { props, onClickChangedUserType } = this.props;
        const { fields: { userType } } = props;
        return(
            <div className="form-group">
                <label className="col-sm-2 control-label">Type</label>
                <div className="col-sm-4">
                    <label>
                        <input type="radio" {...userType} value="OnHand"
                            checked={userType.value === 'OnHand'} onClick={onClickChangedUserType}/> On Hand Module
                    </label>
                </div>
                <div className="col-sm-4">
                    <label>
                        <input type="radio" {...userType} value="Sales"
                            checked={userType.value === 'Sales'} onClick={onClickChangedUserType}/> Sales Module
                    </label>
                </div>
                <div className="col-sm-2">
                    <label>
                        <input type="radio" {...userType} value="All"
                            checked={userType.value === 'All'} onClick={onClickChangedUserType}/> Both Module
                    </label>
                </div>
            </div>
        )
    }
}
module.exports = RenderTypeUser;
