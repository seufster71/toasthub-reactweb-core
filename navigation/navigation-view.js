import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";


export default function NavigationView({menus,appPrefs,activeTab,changeTab,backToTab}) {

    let items = [];
    let topMenus = menus;

    if (topMenus != null) {
      for (let m = 0; m < topMenus.length; m++) {
        if (topMenus[m].values[0].rendered) {
          let children = [];
          if (topMenus[m].children != null) {
            let childList = topMenus[m].children;
            for (let c = 0; c < childList.length; c++) {
              if (childList[c].values[0].rendered) {
                children.push(
                  <LinkContainer key={topMenus[m].code+"-"+childList[c].menuId} to={childList[c].values[0].href}>
                   <MenuItem >{childList[c].values[0].value}</MenuItem>
                  </LinkContainer>
                );
              }
            }
          }
          if (children.length > 0) {
            items.push(
              <NavDropdown key={topMenus[m].menuId} title={<span><i className="fa fa-bars" /> <span className="navText">{topMenus[m].values[0].value}</span></span>} id={topMenus[m].code} >
                {children}
              </NavDropdown>
            );
          } else {
            items.push(
              <LinkContainer key={topMenus[m].menuId} to={topMenus[m].values[0].href}>
                 <NavItem><i className="fa fa-bars" /><span className="navText"> {topMenus[m].values[0].value}</span>
                 </NavItem>
              </LinkContainer>
            );
          }
        }
      }
    }
    let headerName = "Toasthub";
    if (appPrefs != null && appPrefs.headerName != "") {
      headerName = appPrefs.headerName;
    }
    return (
      <Navbar inverse collapseOnSelect fixedTop className="navbar-custom">
        <Navbar.Header className="page-scroll">
          <Navbar.Brand className="page-scroll">
            <a href="#page-top" className="desktop-only">{headerName}</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar>
          <Nav pullRight>{items}</Nav>
        </Navbar>
      </Navbar>
    );
}


  NavigationView.propTypes = {
    appPrefs: PropTypes.object,
    menus: PropTypes.array,
    activeTab: PropTypes.string,
    changeTab: PropTypes.func,
    backToTab: PropTypes.string
  };
