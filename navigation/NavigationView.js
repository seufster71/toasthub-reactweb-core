import React from "react";
import PropTypes from "prop-types";
import NavbarHeader from "./NavbarHeader.js";
import NavbarMenu from "./NavbarMenu.js";
//hectors note: trying something headerName
// import { Navbar } from "react-bootstrap";

export default function Navigation(props) {
  return (
    // <Navbar
    //   collapseOnSelect
    //   id="mainNav"
    //   className="navbar-custom navbar-fixed-top affix"
    // >
    //   <NavbarHeader headerName={props.appPrefs.headerName} />
    //   <NavbarMenu
    //     menus={props.menus}
    //     menuName={props.menuName}
    //     navClick={props.navClick}
    //   />
    // </Navbar>

    <nav
      id="mainNav"
      className="navbar navbar-Public navbar-custom navbar-fixed-top affix"
    >
      <div className="container">
        <NavbarHeader headerName={props.appPrefs.headerName} />

        <NavbarMenu
          menus={props.menus}
          menuName={props.menuName}
          navClick={props.navClick}
        />
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  appPrefs: PropTypes.object.isRequired,
  menus: PropTypes.object.isRequired,
  menuName: PropTypes.string.isRequired,
  navClick: PropTypes.func.isRequired
};
