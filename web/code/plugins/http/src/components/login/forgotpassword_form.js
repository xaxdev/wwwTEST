import React,{ Component } from 'react';
import { reduxForm } from 'redux-form';
import validateforgot from '../../utils/validateforgot';
import { Link } from 'react-router';

class Forgotform extends Component {

  render() {
    const { fields: {
      email
    },handleSubmit,invalid,clearforgotpassword,forgotstatus } = this.props;
    return (
      <form onSubmit={handleSubmit} className="form-signin">
      <div className="login">
      <div className="logo"></div>
        <h2 className="fc-fff">Forgot Password</h2>
          <div className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}` }>
            <input type="text" className="form-control" {...email} placeholder="Email"/>
          </div>
            <div className="text-help">
              { email.touched ? email.error : ''}
            </div>          
          <div className={`${forgotstatus == true ? 'text-success' : 'text-danger'}` }>{ (this.props.msg != '') ? this.props.msg : '' }</div>
          <div className="margin-t50">
            <div className="col-md-6 col-xs-6">
            <button type="submit" className="btn btn-primary col-md-12 col-xs-12" disabled={invalid}>Send</button>
            </div>
            <div className="col-md-6 col-xs-6">
            <a className="btn btn-primary col-md-12 col-xs-12" onClick={clearforgotpassword}>Back</a>
            </div>
          </div>
          </div>
        </form>
      );
    }
  }

  module.exports = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'Forgotform',
    fields: ['email'],
    validate:validateforgot
  },null)(Forgotform);
