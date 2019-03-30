import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SelectInput = ({name, label, value, options, inputType, min, max, required, selected, placeHolder, errors, onChange, onBlur}) => {
	let wrapperClass = 'form-group';
	let errorLabel = '';
	let errorFeedBack = '';
	if (errors != null && errors[name] != null) {
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
			<div>
				<DatePicker className="form-control" selected={selected} dateFormat="MM-dd-yyyy" onChange={onChange} />
			</div>
			{errorFeedBack}
			{errorLabel}
		</div>
	);
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  inputType: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  required: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.string,PropTypes.date]),
  placeHolder: PropTypes.string,
  errors: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default SelectInput;