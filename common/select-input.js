import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

const SelectInput = ({name, label, defaultOption, value, errors, warns, successes, rendered, required, inputChange, onBlur, options, loadOptions, wrapperClass, isAsync, isDisabled}) => {

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
	
/*	let selectOptions = [];
	for (let i = 0; i < options.length; i++) {
		let label = "";
		if (options[i].label == null && options[i].defaultText != null) {
			label = options[i].defaultText;
		} else if (options[i].label != null) {
			label = options[i].label;
		}
		selectOptions.push(<option key={i} value={options[i].value}>{label}</option>);
	}*/
	
	if (typeof loadOptions === "object") {
		
	}
	
	if (rendered) {
		if (isDisabled) {
			return (
				<div className={wrapperClass}>
					<label htmlFor={name}>{label}{req}</label>
					<div>{value}</div>
				</div>
			);
		} else if(isAsync) {
			return (
				<div className={wrapperClass}>
					<label htmlFor={name}>{label}{req}</label>
					<AsyncSelect cacheOptions name={name} defaultValue={value} onSelectResetsInput={false} onBlurResetsInput={false} onInputChange={(val) => inputChange("INPUT",name,val)} onChange={(val) => inputChange("SELECT",name,val)} loadOptions={(inputValue,callback) => loadOptions(inputValue,callback,name)} />
					{errorFeedBack}
					{errorLabel}
					{warnFeedBack}
					{warnLabel}
					{successFeedBack}
					{successLabel}
				</div>
			);
		} else {
			return (
				<div className={wrapperClass}>
					<label htmlFor={name}>{label}{req}</label>
					<Select name={name} defaultValue={value} onChange={(val) => inputChange("SELECT",name,val)} options={options} />
					{errorFeedBack}
					{errorLabel}
					{warnFeedBack}
					{warnLabel}
					{successFeedBack}
					{successLabel}
				</div>
			);
		}
	} else {
		return (<div></div>);
	}
};

SelectInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	defaultOption: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
	errors: PropTypes.object,
	warns: PropTypes.object,
	successes: PropTypes.object,
	rendered: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	required: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	loadOptions: PropTypes.func,
	inputChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.object),
	wrapperClass: PropTypes.string,
	isAsync: PropTypes.bool,
	isDisabled: PropTypes.bool
};

export default SelectInput;
