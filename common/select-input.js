import React, {Component} from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({name, label, defaultOption, value, errors, warns, successes, rendered, required, onChange, onBlur, options, wrapperClass}) => {

	if (wrapperClass == null) {
		wrapperClass = 'form-group';
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
	if (warns != null && warns[name] != null && warns[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <label id={name + "-warn"} className="control-label has-warn" htmlFor={name}>{warns[name]}</label>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (successes != null && successes[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		successFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
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
	
	for (let i = 0; i < options.length; i++) {
		if (options[i].text == null && options[i].defaultText != null) {
			options[i].text = options[i].defaultText;
		} else if (options[i].text == null) {
			options[i].text = "";
		}
	}
	
	if (rendered) {
		return (
			<div className={wrapperClass}>
				<label htmlFor={name}>{label}{req}</label>
				<select name={name} value={value} className="form-control" onChange={onChange}>
					{options.map((option) => {
						return <option key={option.value} value={option.value}>{option.text}</option>;
						})
					}
				</select>
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

SelectInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	defaultOption: PropTypes.string,
	value: PropTypes.string,
	errors: PropTypes.object,
	warns: PropTypes.object,
	successes: PropTypes.object,
	rendered: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	required: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.object),
	wrapperClass: PropTypes.string
};

export default SelectInput;
