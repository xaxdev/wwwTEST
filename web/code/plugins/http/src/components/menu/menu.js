import React,{Component,PropTypes} from 'react';
import { Link } from 'react-router';
import { Navbar,Nav,NavDropdown,MenuItem,NavItem } from 'react-bootstrap';

class Menu extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClickMyCatalog = this.handleClickMyCatalog.bind(this);
        this.handleClickSetCatalog = this.handleClickSetCatalog.bind(this);
    }

    handleClickMyCatalog(e){
        e.preventDefault();
        this.context.router.push('/mycatalog');
    }

    handleClickSetCatalog(e){
        e.preventDefault();
        this.context.router.push('/setcatalog');
    }

    render(){
        const props = this.props;
        const url = window.location.href;
        const countLastPath = url.split('/').length - 1;
        const lastPath = url.split('/')[countLastPath];
        const { role } = JSON.parse(sessionStorage.logindata);
        const UserManagement = role == 'Admin'? <NavItem href="/users" className={`${(props.currentLocation == '/users' ||
                                                                                    props.currentLocation == '/user' ||
                                                                                    props.currentLocation == '/user/new' ||
                                                                                    props.currentLocation.indexOf('user') != -1
                                                                                )?'active':''}`}>User Management</NavItem> : '';
        const MyCatalog = <NavDropdown id="catalog" title="Catalog">
                            <NavItem href="/mycatalog" className={`${(props.currentLocation == '/mycatalog' ||
                                                                    props.currentLocation.indexOf('productmycatalog') != -1
                                                                    )?'active': ''}`}
                                                        onClick={this.handleClickMyCatalog}>My Catalog</NavItem>
                            <NavItem href="/setatalog" className={`${(props.currentLocation == '/setcatalog' ||
                                                                    props.currentLocation.indexOf('productmycatalog') != -1
                                                                )?'active': ''}`}
                                                        onClick={this.handleClickSetCatalog}>Set Catalog</NavItem>
                          </NavDropdown>;
        // const MyCatalog = <NavItem href="/mycatalog" className={`${(props.currentLocation == '/mycatalog' ||
        //                                                             props.currentLocation.indexOf('productmycatalog') != -1
        //                                                         )?'active': ''}`}>My Catalog</NavItem>;
        const SaveSearch = <NavItem href="/savesearch" className={`${(props.currentLocation == '/savesearch')
                                                                    ? 'active': ''}`}>Save Searches</NavItem>;

        return(
          <Navbar inverse >
              <Navbar.Header>
                  <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav className="padding-lf30">
                  <NavItem href="/inventories" className={`${(props.currentLocation !== '/users' &&
                                                              props.currentLocation !== '/user' &&
                                                              props.currentLocation !== '/user/new' &&
                                                              props.currentLocation.indexOf('user') == -1 &&
                                                              props.currentLocation !== '/mycatalog' &&
                                                              props.currentLocation !== '/setcatalog' &&
                                                              props.currentLocation !== '/savesearch' &&
                                                              props.currentLocation !== '/whatnewnotification' &&
                                                              props.currentLocation.indexOf('productmycatalog') == -1
                                                           )?'active':''}`}>Inventory Report</NavItem>
                  {/*<NavItem href="#">My Catalog</NavItem>*/}
                  {/*<NavDropdown  title="Download" id="basic-nav-dropdown">
                    <MenuItem >Download</MenuItem>
                    <MenuItem >Feedback</MenuItem>
                    <MenuItem >Help</MenuItem>
                  </NavDropdown>*/}
                  {MyCatalog}
                  {UserManagement}
                  {SaveSearch}
                </Nav>
              </Navbar.Collapse>
          </Navbar>
        );
    }
}

Menu.contextTypes = {
	router: PropTypes.object
}

module.exports = Menu
