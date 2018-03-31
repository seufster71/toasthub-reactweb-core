import React from "react";
import PropTypes from "prop-types";
import NavbarHeader from "./navbar-header.js";
import NavbarMenu from "./navbar-menu.js";
import { Navbar, Nav, NavItem } from "react-bootstrap";

export default function NavigationView(props) {
  //className="navbar navbar-Public navbar-custom navbar-fixed-top affix"
  return (
    <Navbar inverse collapseOnSelect fixedTop >
      <NavbarHeader headerName={props.appPrefs.headerName} />
      <NavbarMenu menus={props.menus} menuName={props.menuName} navClick={props.navClick} />
    </Navbar>
  );
}

NavigationView.propTypes = {
  appPrefs: PropTypes.object.isRequired,
  menus: PropTypes.object.isRequired,
  menuName: PropTypes.string.isRequired,
  navClick: PropTypes.func.isRequired
};
