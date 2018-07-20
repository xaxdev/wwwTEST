import React, { Component, PropTypes } from 'react';

class RenderUserProfileAdd extends Component {
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
                    <div className={`form-group ${firstName.touched && firstName.invalid ? 'has-danger' : ''}` }>
                        <label className="col-sm-4 control-label">First Name</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" {...firstName}/>
                            <div className="text-help">
                                { firstName.touched ? firstName.error : ''}
                            </div>
                        </div>
                    </div>
                    <div className={`form-group ${lastName.touched && lastName.invalid ? 'has-danger' : ''}` }>
                        <label className="col-sm-4 control-label">Last Name</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" {...lastName}/>
                            <div className="text-help">
                                { lastName.touched ? lastName.error : ''}
                            </div>
                        </div>
                    </div>
                    <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}` }>
                        <label className="col-sm-4 control-label">Email</label>
                        <div className="col-sm-7">
                            <input type="email" className="form-control" {...email}/>
                            <div className="text-help">
                                { email.touched ? email.error : ''}
                            </div>
                        </div>
                    </div>
                    <div className={`form-group ${username.touched && username.invalid ? 'has-danger' : ''}` }>
                        <label className="col-sm-4 control-label">User Name</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" {...username}/>
                            <div className="text-help">
                                { username.touched ? username.error : ''}
                            </div>
                        </div>
                    </div>
                    <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}` }>
                        <label className="col-sm-4 control-label">Password</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" value={state.genPass} ref="password" {...password}/>
                            <div className="text-help">
                                { password.touched ? password.error : ''}
                            </div>
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
module.exports = RenderUserProfileAdd;
