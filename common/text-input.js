import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({name, label, placeHolder, value, errors, warns, successes, inputType, min, max, rendered, required, inputChange, onBlur, wrapperClass, comment}) => {
	
	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	
	if (inputType == null || inputType.length == 0){
		inputType = "text";
	}
	
	let commentLabel = '';
	if (comment != null && comment != "") {
		commentLabel = comment;
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (errors != null && errors[name] != null && errors[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		errorLabel = <div id={name + "-error"} className="control-label has-error" >{errors[name]}</div>;
	}
	
	let warnLabel = '';
	let warnFeedBack = '';
	if (warns != null && warns[name] != null && warns[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <label id={name + "-warn"} className="control-label has-warn" htmlFor={name}>{warns[name]}</label>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (successes != null && successes[name] != null && successes[name] != "") {
		wrapperClass += " " + 'has-success has-feedback';
		//successFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		successLabel = <label id={name + "-success"} className="control-label has-success" htmlFor={name}>{successes[name]}</label>;
	}
	
	let req = "";
	if ((typeof required === "boolean" && required) || (typeof required === "string" && required == "true")){
		req = " *";
	}
	
	if (rendered == null || rendered.length == 0){
		rendered = true;
	} else if (typeof rendered === "string"){
		if (rendered == "true") {
			rendered = true;
		} else {
			rendered = false;
		}
	}
	if (rendered) {
		return (
			<div className={wrapperClass}>
				<label htmlFor={name}>{label}{req}</label>
				<input type={inputType} id={name} name={name} min={min} max={max} className="form-control" autoComplete="new-password" autoCapitalize="off" onChange={inputChange} onBlur={onBlur}  placeholder={placeHolder} value={value}/>
				{commentLabel}
				{errorFeedBack}
				{errorLabel}
				{warnFeedBack}
				{warnLabel}
				{successFeedBack}
				{successLabel}
			</div>
		);
	} else {
		return (<div></div>);
	}
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
	rendered: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	required: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	inputChange: PropTypes.func,
	onBlur: PropTypes.func,
	wrapperClass: PropTypes.string,
	comment: PropTypes.string
};

export default TextInput;
