import React from 'react';
import PropTypes from 'prop-types';

export default function NavbarHeader(props) {
  return (
    <div className="navbar-header page-scroll">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span> Menu <i className="fa fa-bars"/>
      </button>
      <a className="navbar-brand page-scroll" href="#page-top">{props.headerName}</a>
    </div>
  );
}

NavbarHeader.propTypes = {
  headerName: PropTypes.string.isRequired
};
