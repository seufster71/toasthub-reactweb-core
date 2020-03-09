import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({item, field, inputFields, errors, warns, successes, onChange, wrapperClass }) => {
	
	if (wrapperClass == null) {
		wrapperClass = 'form-group text-center';
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (errors != null && errors[field.name] != null && errors[field.name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		errorLabel = <div id={field.name + "-error"} className="control-label has-error" >{errors[field.name]}</div>;
	}
	
	let warnLabel = '';
	let warnFeedBack = '';
	if (warns != null && warns[field.name] != null && warns[field.name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <label id={field.name + "-warn"} className="control-label has-warn" htmlFor={field.name}>{warns[field.name]}</label>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (successes != null && successes[field.name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		successFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		successLabel = <label id={field.name + "-success"} className="control-label has-success" htmlFor={field.name}>{successes[field.name]}</label>;
	}
		
	// get options	
	let defaultOptions = [{"value":true,"label":"Yes"},{"value":false,"label":"No","defaultInd":true}];
	let options = [];
	if (field.value != null) {
		let fieldOptions = JSON.parse(field.value);
		options = fieldOptions.options;
	} else {
		options = defaultOptions;
	}
	
	let activeDefault;
	if (field.classModel != "") {
		let activeModel = JSON.parse(field.classModel);
		if (item != null && item[activeModel.field] != null) {
			activeDefault = item[activeModel.field];
		}
	}
	
	let value;
	if (inputFields != null && inputFields[field.name] != null) {
		value = inputFields[field.name];
	} else {
		value = activeDefault;
	}
	
	if (value == null) {
		for (let i = 0; i < options.length; i++) {
			if (options[i].defaultInd == true) {
				value = options[i].value;
			}
		}
		value = false;
	}
	
	// convert options to switches
	let switchOptions = [];
	for (let i = 0; i < options.length; i++) {
		let c = "btn btn-radio btn-sm notActive";
		if (value == options[i].value) {
			c = "btn btn-radio btn-sm active";
		}
		switchOptions.push(<a key={i} className={c} data-toggle={field.name} data-title={options[i].label} onClick={onChange(field.name,options[i].value)}>{options[i].label}</a>);
	}

	let req = "";
	if ((typeof field.required === "boolean" && field.required) || (typeof field.required === "string" && field.required == "true")){
		req = " *";
	}
	
	let rendered = true;
	if (field.rendered != null && field.rendered.length != 0){
		if ((typeof field.rendered === "string" && field.rendered == "false")){
			rendered = false;
		} else {
			rendered = field.rendered;
		}
	}
	
	let fieldName = field.name + "-SWITCH";
	if (rendered) {
		return (
			<div className="form-group">
	        	<label htmlFor={fieldName} >{field.label}{req}</label>
				<div className="input-group">
					<div id={fieldName} className="btn-group">
						{switchOptions}
					</div>
					<input type="hidden" name={field.name} id={field.name}/>
					{errorFeedBack}
					{errorLabel}
					{warnFeedBack}
					{warnLabel}
					{successFeedBack}
					{successLabel}
				</div>
	    	</div>
		);
	} else {
		return (<div></div>);
	}
};

Switch.propTypes = {
	item: PropTypes.object,
	field: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	errors: PropTypes.object,
	warns: PropTypes.object,
	successes: PropTypes.object,
	onChange: PropTypes.func,
	wrapperClass: PropTypes.string,
};

export default Switch;
