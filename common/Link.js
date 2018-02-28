import React, {Component} from 'react';
import PropTypes from 'prop-types';

const Link = ({name, label, onClick, linkClass}) => {
  let linkClassImpl = "";
  if (linkClass != null) {
    linkClassImpl = linkClass;
  }

  return (
    <div className="form-group">
      <div className="col-lg-12">
        <div className="text-center">
          <a className={linkClassImpl} onClick={onClick} >{label}</a>
        </div>
      </div>
    </div>
  );
};

Link.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  linkClass: PropTypes.string
};

export default Link;
