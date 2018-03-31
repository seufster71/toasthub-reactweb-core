import React from "react";
import PropTypes from "prop-types";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

export default function NavbarMenu(props) {
  let menuItems = [];
  var menuRight = props.menus[props.menuName];
  for (let i in menuRight) {
    let children = "";
    if (menuRight[i].children != null) {
      children = addSubMenu(menuRight[i].children);
    }
    menuItems.push(
      <LinkContainer key={menuRight[i].menuId} to={menuRight[i].values[0].href}>
         <NavItem>
          {menuRight[i].values[0].value}
         </NavItem>
        </LinkContainer>
    );
  }

  return (
    <Navbar.Collapse>
      <Nav pullRight>{menuItems}</Nav>
    </Navbar.Collapse>
  );
}

function addSubMenu(child) {}

NavbarMenu.propTypes = {
  menuName: PropTypes.string.isRequired,
  menus: PropTypes.object.isRequired,
  navClick: PropTypes.func.isRequired
};
