import React,{Component,PropTypes} from 'react';
import { Link } from 'react-router';
import * as loginAction from '../../actions/loginaction';
import { connect } from 'react-redux';
import { Navbar,Nav,NavDropdown,MenuItem,NavItem } from 'react-bootstrap';

class Header extends Component {

  constructor(props, context) {
		super(props, context);
		this.handleLogoutButton = this.handleLogoutButton.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleWhatnewNotification = this.handleWhatnewNotification.bind(this);

	}

  handleNameClick(e){
    e.preventDefault();

    const { changePasswordStatus } = this.props;

    if(changePasswordStatus){
      this.props.setChangePasswordStatus(false);

    }else{
      this.props.setChangePasswordStatus(true);

    }
  }

  handleChangePassword(e){
    e.preventDefault();
    this.context.router.push('/changepassword');
  }

  handleWhatnewNotification(e){
    e.preventDefault();
    this.context.router.push('/whatnewnotification');
  }

	handleLogoutButton() {
		this.props.logout();
		this.context.router.push('/');
	}

  render(){
      const { firstName,lastName,changePasswordStatus } = this.props;
      // console.log('changePasswordStatus-->',changePasswordStatus);
      let userName = firstName+ ' ' +lastName;
      return (
        <div className="navbar-static-top navbar-grau">
          <div className="container">
            <div className="padding-lf30 col-md-12">
              <div className="col-md-6 nopadding">
                <div className="logo-detail"></div>
              </div>
              <div className="navbar-right top-bar col-md-6">
                <img src="/images/notify.jpg" className="notify" onClick={this.handleWhatnewNotification}/>
                <Navbar inverse className="collapse in" >
                  <Navbar.Header>
                    <Navbar.Toggle />
                  </Navbar.Header>
                  <Navbar.Collapse>
                    <Nav>
                      <NavDropdown id="username" href="/inventories" title={userName}>
                        <MenuItem onClick={this.handleChangePassword}>Change Password</MenuItem>
                      </NavDropdown>
                      <NavItem onClick={this.handleLogoutButton} className="margin-l5"><span className="top-line">|</span> Logout</NavItem>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
              </div>
            </div>
          </div>
        </div>
        );
    }
}

function mapStateToProps(state) {
	return {
		member: state.login,
    changePasswordStatus: state.login.changePasswordStatus
	}
}

Header.contextTypes = {
	router: PropTypes.object
}

module.exports = connect(mapStateToProps, loginAction)(Header);
