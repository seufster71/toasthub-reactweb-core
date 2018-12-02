import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({name, label, onChange, onBlur, placeHolder, value, error, inputType}) => {
  let wrapperClass = 'form-group';
  let errorLabel = '';
  let errorFeedBack = '';
  if (inputType == null || inputType.length == 0){
    inputType = "text";
  }
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error has-feedback';
    errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
    errorLabel = <label id={name + "-error"} className="control-label has-error" htmlFor={name}>{error}</label>;
  }

  return (
    <div className={wrapperClass}>
      <input type={inputType} id={name} name={name} className="form-control" autoCapitalize="off" onChange={onChange} onBlur={onBlur}  placeholder={placeHolder}/>
      {errorFeedBack}
      {errorLabel}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  inputType: PropTypes.string
};

export default TextInput;
