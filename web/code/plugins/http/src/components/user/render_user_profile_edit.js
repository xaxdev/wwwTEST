import React, { Component, PropTypes } from 'react';

class RenderUserProfileEdit extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { props,state, onClickSubmitGenPass } = this.props;
        const { fields: { id,firstName,lastName,username,email,password } } = props;
        return(
            <div>
                <div className="col-sm-12">
                    <h2>User Profile</h2>
                </div>
                <div className="form-group hidden" >
                    <label>Id</label>
                    <input type="text" className="form-control" {...id}/>
                </div>
                <div className="col-sm-6 form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-4 control-label">First Name</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" {...firstName} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-4 control-label">Last Name</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" {...lastName} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-4 control-label">Email</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" {...email} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-4 control-label">User Name</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" {...username} disabled="disabled"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-4 control-label">Password</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" value={state.genPass} ref="password" {...password}/>
                            <div className="gen-passord">
                                <input type="button" className="btn btn-primary pull-xs-right btn-radius" value="Generate" onClick={onClickSubmitGenPass}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = RenderUserProfileEdit;
