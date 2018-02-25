import React, {Component} from 'react';
import PropTypes from 'prop-types';

const Button = ({name, value, onClick, className}) => {
  let wrapperClass = 'form-group';
  if (className == null) {
    className = "form-control btn";
  }

  return (
    <div className={wrapperClass}>
        <input type="submit" name={name} id={name} className={className} value={value} onClick={onClick}/>
    </div>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
