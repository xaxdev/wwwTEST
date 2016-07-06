import React from 'react';
import { Link } from 'react-router';
import { Navbar,Nav,NavDropdown,MenuItem,NavItem } from 'react-bootstrap';

const Menu =  () => {
  const { role } = JSON.parse(sessionStorage.logindata);
  const UserManagement = role == 'Admin'? <NavItem href="/users">User Management</NavItem> : '';
  return(
<Navbar inverse>
    <Navbar.Header>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav className="padding-lf30">
        <NavItem href="/inventories" className="active">Inventory Report</NavItem>
        {/*<NavItem href="#">My Catalog</NavItem>*/}
        {/*<NavDropdown  title="Download" id="basic-nav-dropdown">
          <MenuItem >Download</MenuItem>
          <MenuItem >Feedback</MenuItem>
          <MenuItem >Help</MenuItem>
        </NavDropdown>*/}
        {UserManagement}

      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

module.exports = Menu
