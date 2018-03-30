import React from "react";
import PropTypes from "prop-types";
//hectors note: making the menu work when collapsed
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarMenu(props) {
  let menuItems = [];
  var menuRight = props.menus[props.menuName];
  for (var i in menuRight) {
    let children = "";
    if (menuRight[i].children != null) {
      //  menuItems.push(<ul className="sub"/>);
      children = addSubMenu(menuRight[i].children);
    }
    menuItems.push(
       <li key={menuRight[i].menuId}>
         <Link
           className="page-scroll"
           to={menuRight[i].values[0].href}
         >
         {menuRight[i].values[0].value}
         </Link>

        </li>

    //  <NavItem
    //    key={menuRight[i].menuId}
  //      componentClass={Link}
  //      to={{pathname:menuRight[i].values[0].href}}
  //      href={menuRight[i].values[0].href}
  //      className="page-scroll"
  //    >
  //    {menuRight[i].values[0].value}
  //    </NavItem>
    );
  }

  return (
     <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
       <ul className="nav navbar-nav navbar-right">{menuItems}</ul>
     </div>
    //<Navbar.Collapse>
  //    <Nav pullRight>{menuItems}</Nav>
  //  </Navbar.Collapse>
  );
}

function addSubMenu(child) {}

NavbarMenu.propTypes = {
  menuName: PropTypes.string.isRequired,
  menus: PropTypes.object.isRequired,
  navClick: PropTypes.func.isRequired
};
