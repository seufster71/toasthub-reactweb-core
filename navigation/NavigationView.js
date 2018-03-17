import React from "react";
import PropTypes from "prop-types";
import NavbarHeader from "./NavbarHeader.js";
import NavbarMenu from "./NavbarMenu.js";
//hectors note: making the menu work when collapsed
import { Navbar, Nav, NavItem } from "react-bootstrap";

export default function Navigation(props) {
  return (
    // <nav
    //   id="mainNav"
    //   className="navbar navbar-Public navbar-custom navbar-fixed-top affix"
    // >
    //   <div className="container">
    //     <NavbarHeader headerName={props.appPrefs.headerName} />
    //     <NavbarMenu
    //       menus={props.menus}
    //       menuName={props.menuName}
    //       navClick={props.navClick}
    //     />
    //   </div>
    // </nav>

    <Navbar
      inverse
      collapseOnSelect
      className="navbar navbar-Public navbar-custom navbar-fixed-top affix"
    >
      <NavbarHeader headerName={props.appPrefs.headerName} />
      <NavbarMenu
        menus={props.menus}
        menuName={props.menuName}
        navClick={props.navClick}
      />
    </Navbar>
  );
}

Navigation.propTypes = {
  appPrefs: PropTypes.object.isRequired,
  menus: PropTypes.object.isRequired,
  menuName: PropTypes.string.isRequired,
  navClick: PropTypes.func.isRequired
};
