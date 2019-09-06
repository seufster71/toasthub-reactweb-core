import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import utils from '../../core/common/utils';


export default function NavigationView({menus,appPrefs,permissions,activeTab,changeTab,backToTab,headerToolTip}) {

    let items = [];
    let topMenus = menus;

    if (topMenus != null) {
      for (let m = 0; m < topMenus.length; m++) {
        if (permissions != null && !utils.hasPermission(permissions,topMenus[m].permissionCode,"R")) {
          continue;
        }
        if (topMenus[m].values[0].rendered) {
          let children = [];
          if (topMenus[m].children != null) {
            let childList = topMenus[m].children;
            for (let c = 0; c < childList.length; c++) {
              if (permissions != null && !utils.hasPermission(permissions,childList[c].permissionCode,"R")) {
                continue;
              }
              if (childList[c].values[0].rendered) {
                children.push(
                  <IndexLinkContainer key={topMenus[m].code+"-"+childList[c].menuId} to={childList[c].values[0].href}>
                  	<MenuItem >{childList[c].values[0].value}</MenuItem>
                  </IndexLinkContainer>
                );
              }
            }
          }
          if (children.length > 0) {
            items.push(
              <NavDropdown key={topMenus[m].menuId} title={<span><img src="/img/hamburger_green.png" height="20" width="20"/> <span className="navText">{topMenus[m].values[0].value}</span></span>} id={topMenus[m].code} >
                {children}
              </NavDropdown>
            );
          } else {
        	let image = "";
          	if (topMenus[m].values[0].image != null) {
  	            image = <img src={"/img/"+topMenus[m].values[0].image+"_outline.png"} height="20" width="20" />;
  	            if (activeTab === topMenus[m].values[0].href) {
  	              image = <img src={"/img/"+topMenus[m].values[0].image+".png"} height="25" width="25" />;
  	            }
  	        }
            items.push(
              <IndexLinkContainer key={topMenus[m].menuId} to={topMenus[m].values[0].href}>
                 <NavItem>{image}<span className="navText"> {topMenus[m].values[0].value}</span>
                 </NavItem>
              </IndexLinkContainer>
            );
          }
        }
      }
    }
    let headerName = "";
    if (appPrefs != null && appPrefs.headerName != "") {
      headerName = appPrefs.headerName;
    }
    if (headerToolTip == null || headerToolTip == "") {
    	headerToolTip = "Environment undetermined";
    }
    return (
      <Navbar collapseOnSelect fixedTop fluid className="navbar-custom">
        <Navbar.Header className="page-scroll">
          <Navbar.Brand className="page-scroll">
            <a href="#page-top" data-toggle="tooltip" data-placement="bottom" title={headerToolTip} className="desktop-only" >{headerName}</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>{items}</Nav>
      </Navbar>
    );
}


  NavigationView.propTypes = {
    appPrefs: PropTypes.object,
    permissions: PropTypes.object,
    menus: PropTypes.array,
    activeTab: PropTypes.string,
    changeTab: PropTypes.func,
    backToTab: PropTypes.string,
    headerToolTip: PropTypes.string
  };
