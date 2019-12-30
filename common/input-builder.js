import React from 'react';
import PropTypes from 'prop-types';

const InputBuilder = ({inputItem, errors, warns, successes, onChange, onBlur}) => {
	let wrapperClass = 'form-group';
	let errorLabel = '';
	let errorFeedBack = '';
	if (inputType == null || inputType.length == 0){
		inputType = "text";
	}
	if (errors != null && errors[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		errorLabel = <div id={name + "-error"} className="control-label has-error" >{errors[name]}</div>;
	}
	
	let warnLabel = '';
	let warnFeedBack = '';
	if (inputType == null || inputType.length == 0){
		inputType = "text";
	}
	if (warns != null && warns[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <label id={name + "-warn"} className="control-label has-warn" htmlFor={name}>{warns[name]}</label>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (inputType == null || inputType.length == 0){
		inputType = "text";
	}
	if (successes != null && successes[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		successFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		successLabel = <label id={name + "-success"} className="control-label has-success" htmlFor={name}>{successes[name]}</label>;
	}
	
	let req = "";
	if ((typeof required === "boolean" && required) || (typeof required === "string" && required == "true")){
		req = " *";
	}
	return (
			<div className={wrapperClass}>
				<label htmlFor={name}>{label}{req}</label>
				<input type={inputType} id={name} name={name} min={min} max={max} className="form-control" autoCapitalize="off" onChange={onChange} onBlur={onBlur}  placeholder={placeHolder} value={value}/>
				{errorFeedBack}
				{errorLabel}
				{warnFeedBack}
				{warnLabel}
				{successFeedBack}
				{successLabel}
			</div>
	);
};

TextInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeHolder: PropTypes.string,
	value: PropTypes.string,
	errors: PropTypes.object,
	warns: PropTypes.object,
	successes: PropTypes.object,
	inputType: PropTypes.string,
	min: PropTypes.string,
	max: PropTypes.string,
	required: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
};

export default TextInput;
