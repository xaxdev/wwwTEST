import React,{Component,PropTypes} from 'react';
import { reduxForm, reset } from 'redux-form';
import { Link } from 'react-router';
import { Navbar,Nav,NavDropdown,MenuItem,NavItem } from 'react-bootstrap';
import ResetFormSalesReport from '../../utils/resertFormSalesReport';
import * as itemactions from '../../actions/itemactions';

class Menu extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClickMyCatalog = this.handleClickMyCatalog.bind(this);
        this.handleClickSetCatalog = this.handleClickSetCatalog.bind(this);
        this.handleClickSalesReport = this.handleClickSalesReport.bind(this);
    }

    handleClickMyCatalog(e){
        e.preventDefault();
        this.context.router.push('/mycatalog');
    }

    handleClickSetCatalog(e){
        e.preventDefault();
        this.context.router.push('/setcatalog');
    }

    handleClickSalesReport = async (e) =>{
        e.preventDefault();
        await this.props.newSalesSearch();
        this.context.router.push('/salesreport');
    }

    render(){
        const props = this.props;
        const url = window.location.href;
        const countLastPath = url.split('/').length - 1;
        const lastPath = url.split('/')[countLastPath];
        const { role, permission } = JSON.parse(sessionStorage.logindata);
        const UserManagement = role == 'Admin'? <NavItem href="/users" className={`${(props.currentLocation == '/users' ||
                                                                                    props.currentLocation == '/user' ||
                                                                                    props.currentLocation == '/user/new' ||
                                                                                    props.currentLocation.indexOf('user') != -1
                                                                                )?'active':''}`}>User Management</NavItem> : '';
        const MyCatalog = <NavDropdown id="catalog" title="Catalog" className={`${(permission.userType != 'Sales')?'':'hidden'}`}>
                            <NavItem href="/mycatalog" className={`${(props.currentLocation == '/mycatalog' ||
                                                                    props.currentLocation.indexOf('productmycatalog') != -1 ||
                                                                    props.currentLocation.indexOf('setdetailmycatalog') != -1
                                                                    )?'active': ''}`}
                                                        onClick={this.handleClickMyCatalog}>My Catalog</NavItem>
                            <NavItem href="/setatalog" className={`${(props.currentLocation == '/setcatalog' ||
                                                                    props.currentLocation.indexOf('productmycatalog') != -1 ||
                                                                    props.currentLocation.indexOf('setdetailsetcatalog') != -1
                                                                )?'active': ''}`}
                                                        onClick={this.handleClickSetCatalog}>Set Catalog</NavItem>
                          </NavDropdown>;

        const SaveSearch = <NavItem href="/savesearch" className={`${(props.currentLocation == '/savesearch')
                                                                    ? 'active': ''}`}>Save Searches</NavItem>;

        const SalesReport = <button type="button" className={`${(props.currentLocation == '/salesreport' ||
                                                                 props.currentLocation == '/salessearchresult' ||
                                                                 props.currentLocation.indexOf('salesproductreletedetail') ||
                                                                 props.currentLocation.indexOf('setsalesdetail') ||
                                                                 props.currentLocation == '/salesproductdetail')
                                                                 ? 'btn btn-primary btn-radius pull-right margin-t5'
                                                                 : 'btn pull-right margin-t5 btn-radius'} ${(permission.userType != 'OnHand')?'':'hidden'}`}
                                onClick={this.handleClickSalesReport}>Sales Report</button>

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
                                                              props.currentLocation.indexOf('productmycatalog') == -1 &&
                                                              props.currentLocation.indexOf('setdetailmycatalog') == -1 &&
                                                              props.currentLocation.indexOf('setdetailsetcatalog') == -1 &&
                                                              props.currentLocation.indexOf('salesreport') == -1 &&
                                                              props.currentLocation.indexOf('salessearchresult') == -1 &&
                                                              props.currentLocation.indexOf('salesproductreletedetail') == -1 &&
                                                              props.currentLocation.indexOf('setsalesdetail') == -1 &&
                                                              props.currentLocation.indexOf('salesproductdetail') == -1
                                                          )?'active':''} ${(permission.userType != 'Sales')?'':'hidden'}`}>Inventory Report</NavItem>
                  {/*<NavItem href="#">My Catalog</NavItem>*/}
                  {/*<NavDropdown  title="Download" id="basic-nav-dropdown">
                    <MenuItem >Download</MenuItem>
                    <MenuItem >Feedback</MenuItem>
                    <MenuItem >Help</MenuItem>
                  </NavDropdown>*/}
                  {MyCatalog}
                  {UserManagement}
                  {SaveSearch}
                  {SalesReport}
                </Nav>
              </Navbar.Collapse>
          </Navbar>
        );
    }
}

Menu.contextTypes = {
	router: PropTypes.object
}

module.exports = reduxForm({
    form: 'Menu',
    fields: [],
},null,itemactions)(Menu)
