import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({name, label, placeHolder, value, errors, inputType, min, max, required, onChange, onBlur}) => {
  let wrapperClass = 'form-group';
  let errorLabel = '';
  let errorFeedBack = '';
  if (inputType == null || inputType.length == 0){
    inputType = "text";
  }
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error has-feedback';
    errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
    errorLabel = <label id={name + "-error"} className="control-label has-error" htmlFor={name}>{errors[name]}</label>;
  }
    let req = "";
	if (required == "true"){
		req = " *";
	}
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}{req}</label>
      <input type={inputType} id={name} name={name} min={min} max={max} className="form-control" autoCapitalize="off" onChange={onChange} onBlur={onBlur}  placeholder={placeHolder} value={value}/>
      {errorFeedBack}
      {errorLabel}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  inputType: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  required: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default TextInput;
