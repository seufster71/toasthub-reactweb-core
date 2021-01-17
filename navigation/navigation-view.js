import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import utils from '../../core/common/utils';


export default function NavigationView({menus,appPrefs,permissions,activeTab,changeTab,backToTab,headerToolTip,user,profileMenu}) {

    let items = [];
    let topMenus = menus;

    if (topMenus != null) {
      items = buildMenu(items,topMenus,permissions,user,activeTab);
    }
    // user profile
    if (user != null) {
    	if (profileMenu != null) {
    		items = buildMenu(items,profileMenu,permissions,user,activeTab);
    	} else {
		    items.push(
		        <NavDropdown key="UP" title={<span><i className="fa fa-bars fa-1" aria-hidden="true"></i> <span className="navText">{user.username}</span></span>} id="UP" >
		        	<IndexLinkContainer key="UP-1" to="/member-profile">
		        		<MenuItem >Profile</MenuItem>
		        	</IndexLinkContainer>
		        	<IndexLinkContainer key="UP-2" to="/member-logout">
	        			<MenuItem >Logout</MenuItem>
	        			</IndexLinkContainer>
		        </NavDropdown>
		    );
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

const buildMenu = (items,menus,permissions,user,activeTab) => {
	for (let m = 0; m < menus.length; m++) {
        if (permissions != null && !utils.hasPermission(permissions,menus[m].permissionCode,"R")) {
          continue;
        }
        if (menus[m].values[0].rendered) {
          let children = [];
          if (menus[m].children != null) {
            let childList = menus[m].children;
            for (let c = 0; c < childList.length; c++) {
              if (permissions != null && !utils.hasPermission(permissions,childList[c].permissionCode,"R")) {
                continue;
              }
              if (childList[c].values[0].rendered) {
                children.push(
                  <IndexLinkContainer key={menus[m].code+"-"+childList[c].menuId} to={childList[c].values[0].href}>
                  	<MenuItem >{childList[c].values[0].value}</MenuItem>
                  </IndexLinkContainer>
                );
              }
            }
          }
          if (children.length > 0) {
        	  let value = "";
            	if (menus[m].optionalParams != null && menus[m].optionalParams != "") {
            		let optionalParams = JSON.parse(menus[m].optionalParams);
            		if (optionalParams.override != null && optionalParams.override === "value"){
            			if (optionalParams.object === "user" && optionalParams.field != null && user != null){
            				value = user[optionalParams.field];
            			}
            		} 
            	} else {
            		value = menus[m].values[0].value;
            	}
            items.push(
              <NavDropdown key={menus[m].menuId} title={<span><i className="fa fa-bars fa-1" aria-hidden="true"></i> <span className="navText">{value}</span></span>} id={menus[m].code} >
                {children}
              </NavDropdown>
            );
          } else {
        	let image = "";
          	if (menus[m].values[0].image != null) {
          		if (menus[m].values[0].image.startsWith("fa")) {
	  	            image = <i className={menus[m].values[0].image} aria-hidden="true"/>;
          		} else {
	  	            image = <img src={"/img/"+menus[m].values[0].image+"_outline.png"} height="20" width="20" />;
	  	            if (activeTab === menus[m].values[0].href) {
	  	              image = <img src={"/img/"+menus[m].values[0].image+".png"} height="25" width="25" />;
	  	            }
          		}
  	        }
          	let value = "";
          	if (menus[m].optionalParams != null && menus[m].optionalParams != "") {
          		let optionalParams = JSON.parse(menus[m].optionalParams);
          		if (optionalParams.override != null && optionalParams.override === "value"){
          			if (optionalParams.object === "user" && optionalParams.field != null && user != null){
          				value = user[optionalParams.field];
          			}
          		} 
          	} else {
          		value = menus[m].values[0].value;
          	}
            items.push(
              <IndexLinkContainer key={menus[m].menuId} to={menus[m].values[0].href}>
                 <NavItem>{image}<span className="navText"> {value}</span>
                 </NavItem>
              </IndexLinkContainer>
            );
          }
        }
      }
	return items;
}
        
        
  NavigationView.propTypes = {
    appPrefs: PropTypes.object,
    permissions: PropTypes.object,
    menus: PropTypes.array,
    activeTab: PropTypes.string,
    changeTab: PropTypes.func,
    backToTab: PropTypes.string,
    headerToolTip: PropTypes.string,
    user: PropTypes.object,
    profileMenu: PropTypes.array
  };
