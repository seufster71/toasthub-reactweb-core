import React from "react";
import PropTypes from "prop-types";
//hectors note: trying something
import { Navbar } from "react-bootstrap";

export default function NavbarHeader(props) {
  return (
    // <div className="navbar-header page-scroll">
    //   <button
    //     type="button"
    //     className="navbar-toggle"
    //     data-toggle="collapse"
    //     data-target="#bs-example-navbar-collapse-1"
    //   >
    // <span className="sr-only">Toggle navigation</span> Menu{" "}
    // <i className="fa fa-bars" />
    //   </button>
    //   <a className="navbar-brand page-scroll" href="#page-top">
    //     {props.headerName}
    //   </a>
    // </div>

    <Navbar.Header className="navbar-header page-scroll">
      <Navbar.Brand className="navbar-brand page-scroll">
        <a href="#page-top">{props.headerName}</a>
      </Navbar.Brand>
      <Navbar.Toggle className="navbar-toggle">
        <span className="sr-only">Toggle navigation</span> Menu{" "}
        <i className="fa fa-bars" />
      </Navbar.Toggle>
    </Navbar.Header>
  );
}

NavbarHeader.propTypes = {
  headerName: PropTypes.string.isRequired
};
