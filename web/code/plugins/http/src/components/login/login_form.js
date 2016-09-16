import React,{ Component } from 'react';
import { reduxForm } from 'redux-form';
import validateLogin from '../../utils/validatelogin';
import { Link } from 'react-router';

class Loginform extends Component {

  render() {
    const { fields: {
      username,password
    },handleSubmit,invalid } = this.props;
    return (
      <form onSubmit={handleSubmit}>
      <div className="margin-t50 text-center">
        <img src="/images/logo-mouawad.png" />
      </div>
      <div className="login form-signin">
          <div className={`form-group ${username.touched && username.invalid ? 'has-danger' : ''}` }>
            <input type="text" className="login-height form-control" {...username} placeholder="Username"/>
            <div className="text-help">
              { username.touched ? username.error : ''}
            </div>
          </div>
          <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}` }>
            <input type="password" className="login-height form-control" {...password} placeholder="Password"/>
            <div className="text-help">
              { password.touched ? password.error : ''}
            </div>
          </div>
            <div className={`${this.props.msg != '' ? 'text-danger' : ''}` }>{ (this.props.msg != '') ? this.props.msg : '' }</div>
          <button type="submit" className="btn btn-lg btn-login btn-block" disabled={invalid}>
          {this.props.loading ? 'Loading...' : 'LOGIN'}</button>
          <div className="maring-t30 text-center forgot"><Link to="/forgotpassword">Forgot Password</Link></div>
        </div>
        </form>

      );
    }
  }

  module.exports = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'Loginform',
    fields: ['username','password'],
    validate:validateLogin
  },null)(Loginform);
