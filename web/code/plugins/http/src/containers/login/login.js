import React,{ Component, PropTypes } from 'react';
import Loginform from '../../components/login/login_form';
import * as loginAction from '../../actions/loginaction';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const token = sessionStorage.token;
    if(token){
        this.context.router.push('/inventories');
    }
  }
  handleSubmit(data) {
    // console.log(data);
    this.props.login(data)
      .then(() => {
        // console.log(this.props.logindata.loginstatus);
          if(this.props.logindata.loginstatus == true){
            this.context.router.push('/inventories');
          }
      });
  }
  render() {
    return (
      <div className="wrapper body-login">
      <Loginform onSubmit={this.handleSubmit} msg={this.props.logindata.msg}/>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object,
  invalid: PropTypes.bool
};

function mapStateToProps(state) {
  return { logindata: state.login };
}

module.exports = connect(mapStateToProps, loginAction)(Login)
