import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({name, label, onChange}) => {
  let wrapperClass = 'form-group text-center';

  return (
    <div className={wrapperClass}>
      <input type="checkbox" id={name} name={name} onChange={onChange}/>
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default CheckBox;
