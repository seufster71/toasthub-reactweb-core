import React from "react";
import PropTypes from "prop-types";
import { Navbar } from "react-bootstrap";

export default function NavbarHeader(props) {
  return (
    <Navbar.Header className="page-scroll">
      <Navbar.Brand className="page-scroll">
        <a href="#page-top" className="desktop-only">{props.headerName}</a>
      </Navbar.Brand>
      <Navbar.Toggle>
        <span className="sr-only">Toggle navigation</span> Menu{" "}
        <i className="fa fa-bars" />
      </Navbar.Toggle>
    </Navbar.Header>
  );
}

NavbarHeader.propTypes = {
  headerName: PropTypes.string.isRequired
};
