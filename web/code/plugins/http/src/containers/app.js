import React,{ Component } from 'react';
import Header from '../components/header/header';
import Menu from '../components/menu/menu';
import { connect } from 'react-redux';
import * as loginAction from '../actions/loginaction';

class App extends Component {

  render() {

    const {loginstatus,logindata} = this.props;
    let currentLocation = this.props.location.pathname;
    
    return (
      <div>
        {loginstatus ? <Header {...logindata}/> : ''}
        {loginstatus ? <Menu {...logindata} currentLocation={currentLocation}/> : ''}
        <div className="container margin-b4">
        {this.props.children}
        </div>

        <footer className="footer navbar-grau">
          <div className="container">
            <p className="text-muted">Copyright © 2016 Mouawad. All Rights Reserved.  Design And Develop by ITORAMA</p>
          </div>
        </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
        logindata: state.login.logindata,
        loginstatus: state.login.loginstatus
        };
}

module.exports = connect(mapStateToProps, loginAction)(App)
