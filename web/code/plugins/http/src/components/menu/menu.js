import React,{Component,PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { Navbar,Nav,NavDropdown,MenuItem,NavItem } from 'react-bootstrap';
import * as itemactions from '../../actions/itemactions';

class Menu extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleClickMyCatalog = this.handleClickMyCatalog.bind(this);
        this.handleClickSetCatalog = this.handleClickSetCatalog.bind(this);
        this.handleClickSalesReport = this.handleClickSalesReport.bind(this);
        this.handleClickYingCatalog = this.handleClickYingCatalog.bind(this);
    }

    handleClickMyCatalog(e){
        e.preventDefault();
        this.context.router.push('/mycatalog');
    }

    handleClickSetCatalog(e){
        e.preventDefault();
        this.context.router.push('/setcatalog');
    }

    handleClickYingCatalog(e){
        e.preventDefault();
        this.context.router.push('/yingcatalog');
    }

    handleClickSalesReport = async (e) =>{
        e.preventDefault();
        await this.props.newSalesSearch();
        this.context.router.push('/salesreport');
    }

    render(){
        const props = this.props;
        const { role, permission, yingCatalog } = JSON.parse(sessionStorage.logindata);
        
        const Inventory = 
        <NavItem href="/inventories" 
            className={`${(
                props.currentLocation !== '/users' &&
                props.currentLocation !== '/user' &&
                props.currentLocation !== '/user/new' &&
                props.currentLocation.indexOf('user') == -1 &&
                props.currentLocation !== '/mycatalog' &&
                props.currentLocation !== '/setcatalog' &&
                props.currentLocation !== '/yingcatalog' &&
                props.currentLocation !== '/savesearch' &&
                props.currentLocation !== '/whatnewnotification' &&
                props.currentLocation !== '/relateditem' &&
                props.currentLocation !== '/relateditem/new' &&
                props.currentLocation.indexOf('productmycatalog') == -1 &&
                props.currentLocation.indexOf('setdetailmycatalog') == -1 &&
                props.currentLocation.indexOf('setdetailsetcatalog') == -1 &&
                props.currentLocation.indexOf('salesreport') == -1 &&
                props.currentLocation.indexOf('salessearchresult') == -1 &&
                props.currentLocation.indexOf('salesproductreletedetail') == -1 &&
                props.currentLocation.indexOf('setsalesdetail') == -1 &&
                props.currentLocation.indexOf('salesproductdetail') == -1
            )?'active':''} ${(permission.userType != 'Sales')?'':'hidden'}`}>
            Inventory Report
        </NavItem>
        
        const UserManagement = role == 'Admin'? 
        <NavItem href="/users" 
            className={`${(
                props.currentLocation == '/users' ||
                props.currentLocation == '/user' ||
                props.currentLocation == '/user/new' ||
                props.currentLocation.indexOf('user') != -1
            )?'active':''}`}>
            User Management
        </NavItem> : '';
        const MyCatalog = (yingCatalog)
        ?<NavDropdown id="catalog" title="Catalog" className={`${(permission.userType != 'Sales')?'':'hidden'}`}>
            <NavItem href="/mycatalog" className={`${(
                props.currentLocation == '/mycatalog' ||
                props.currentLocation.indexOf('productmycatalog') != -1 ||
                props.currentLocation.indexOf('setdetailmycatalog') != -1
            )?'active': ''}`} onClick={this.handleClickMyCatalog}>My Catalog</NavItem>
            <NavItem href="/setatalog" className={`${(
                props.currentLocation == '/setcatalog' ||
                props.currentLocation.indexOf('productmycatalog') != -1 ||
                props.currentLocation.indexOf('setdetailsetcatalog') != -1
            )?'active': ''}`} onClick={this.handleClickSetCatalog}>Set Catalog</NavItem>
            <NavItem href="/yingcatalog" className={`${(
                props.currentLocation == '/yingcatalog' ||
                props.currentLocation.indexOf('productmycatalog') != -1 ||
                props.currentLocation.indexOf('setdetailsetcatalog') != -1
            )?'active': ''}`} onClick={this.handleClickYingCatalog}>Ying Catalog</NavItem>
        </NavDropdown>
        :<NavDropdown id="catalog" title="Catalog" className={`${(permission.userType != 'Sales')?'':'hidden'}`}>
            <NavItem href="/mycatalog" className={`${(
                props.currentLocation == '/mycatalog' ||
                props.currentLocation.indexOf('productmycatalog') != -1 ||
                props.currentLocation.indexOf('setdetailmycatalog') != -1
            )?'active': ''}`} onClick={this.handleClickMyCatalog}>My Catalog</NavItem>
            <NavItem href="/setatalog" className={`${(
                props.currentLocation == '/setcatalog' ||
                props.currentLocation.indexOf('productmycatalog') != -1 ||
                props.currentLocation.indexOf('setdetailsetcatalog') != -1
            )?'active': ''}`} onClick={this.handleClickSetCatalog}>Set Catalog</NavItem>
        </NavDropdown>

        const SaveSearch = <NavItem href="/savesearch" className={`${(props.currentLocation == '/savesearch') ? 'active': ''}`}>Save Searches</NavItem>;

        const SalesReport = <button type="button" className={`${(
            props.currentLocation == '/salesreport' ||
            props.currentLocation == '/salessearchresult' ||
            props.currentLocation.indexOf('salesproductreletedetail') != -1 ||
            props.currentLocation.indexOf('setsalesdetail') != -1 ||
            props.currentLocation == '/salesproductdetail'
        ) 
        ? 'btn btn-primary btn-radius pull-right margin-t5'
        : 'btn pull-right margin-t5 btn-radius'} ${(permission.userType != 'OnHand')?'':'hidden'}`} onClick={this.handleClickSalesReport}>Sales Report</button>

        const RelatedItems = permission.relatedItemOnhand ? <NavItem href="/relateditem" className={`${(
            props.currentLocation == '/relateditem' ||
            props.currentLocation == '/relateditem' ||
            props.currentLocation == '/relateditem/new' ||
            props.currentLocation.indexOf('relateditem') != -1
        )?'active':''}`}>Related Module</NavItem> : '';

        return(
            <Navbar inverse >
                <Navbar.Header>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav className="padding-lf30">
                        {Inventory}
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
                        {RelatedItems}
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
