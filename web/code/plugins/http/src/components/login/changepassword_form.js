import React,{ Component } from 'react';
import { reduxForm,reset } from 'redux-form';
import validateLogin from '../../utils/validatelogin';
import { Link } from 'react-router';

class ChangePasswordForm extends Component {

  render() {

    const { fields: {
      username,password
    },handleSubmit,invalid,resetmsg } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-signin">
      <div className="login">
      <div className="logo"></div>
         <h2 className="fc-fff">Reset Password</h2>
          <div className={`form-group ${username.touched && username.invalid ? 'has-danger' : ''}` }>
            <label>Username</label>
            <input type="text" className="form-control" {...username} disabled placeholder="Username"/>
            <div className="text-help">
              { username.touched ? username.error : ''}
            </div>
          </div>
          <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}` }>
            <label>Password</label>
            <input type="password" className="form-control" {...password} placeholder="Password"/>
            <div className="text-help">
              { password.touched ? password.error : ''}
            </div>
          </div>
          <div className="margin-t50">
          <div className={`${resetmsg != '' ? 'text-success' : ''}` }>{ (resetmsg != '') ? resetmsg : '' }</div>
          <button type="submit" className="btn btn-lg btn-primary btn-block" disabled={invalid}>Reset</button>
          <Link to="/" className="btn btn-lg btn-primary btn-block">Cancel</Link>
          </div>
          </div>
        </form>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      initialValues: state.login.logindata,
      resetdata: state.login.logindata
    };
  }

  module.exports = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'Loginform',
    fields: ['username','password'],
    validate:validateLogin
  },mapStateToProps)(ChangePasswordForm);
