import React,{ Component, PropTypes } from 'react';
import Resetpasswordform from '../../components/login/resetpassword_form';
import * as loginaction from '../../actions/loginaction';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Resetpassword extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const token = this.props.params.token;
    if(token){
        this.props.validatetokenreset(token);
    }
  }
  handleSubmit(data) {
    this.props.sendreset(data);

    setTimeout(()=>{
      if(this.props.logindata.loginstatus == true){
        this.context.router.push('/inventories');
      }
    }, 100);

  }
  render() {
    return (
      <div className="wrapper body-login">
      <Resetpasswordform onSubmit={this.handleSubmit} resetmsg={this.props.logindata.msg}/>
      </div>
    );
  }
}

Resetpassword.contextTypes = {
  router: PropTypes.object,
  invalid: PropTypes.bool
};

function mapStateToProps(state) {
  return { logindata: state.login };
}

module.exports = connect(mapStateToProps,loginaction)(Resetpassword)
