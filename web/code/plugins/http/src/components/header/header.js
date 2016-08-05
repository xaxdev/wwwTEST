import React,{Component,PropTypes} from 'react';
import { Link } from 'react-router';
import * as loginAction from '../../actions/loginaction';
import { connect } from 'react-redux';

class Header extends Component {

  constructor(props, context) {
		super(props, context);
		this.handleLogoutButton = this.handleLogoutButton.bind(this);
	}

	handleLogoutButton() {
		this.props.logout();
		this.context.router.push('/');
	}

  render(){
      const { firstName,lastName, } = this.props;
      return (

          <div className="navbar-static-top navbar-grau">
              <div className="container">
                  <div className="padding-lf30 col-md-12">
                      <div className="col-md-6 nopadding">
                        <div className="logo-detail"></div>
                      </div>
                      <div className="navbar-right top-bar col-md-6">
                         <a href="#">{firstName}  {lastName}</a><span className="top-line">|</span>
                          <span className="marginbtnlogout" onClick={this.handleLogoutButton}>Logout</span>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
	return {
		member: state.login
	}
}

Header.contextTypes = {
	router: PropTypes.object
}

module.exports = connect(mapStateToProps, loginAction)(Header);
