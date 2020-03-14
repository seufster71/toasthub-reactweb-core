import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectMultipleInput = ({containerState, name, label, defaultOption, value, rendered, required, onChange, onBlur, options, wrapperClass, inline}) => {

	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	if (inline != null && inline == "true") {
		inline = true;
	} else {
		inline = false;
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (containerState != null && containerState.errors != null && containerState.errors[name] != null && containerState.errors[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		errorLabel = <div id={name + "-error"} className="control-label has-error" >{containerState.errors[name]}</div>;
	}
	
	let warnLabel = '';
	let warnFeedBack = '';
	if (containerState != null && containerState.warns != null && containerState.warns[name] != null && containerState.warns[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <label id={name + "-warn"} className="control-label has-warn" htmlFor={name}>{containerState.warns[name]}</label>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (containerState != null && containerState.successes != null && containerState.successes[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		successFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		successLabel = <label id={name + "-success"} className="control-label has-success" htmlFor={name}>{containerState.successes[name]}</label>;
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
		if (inline) {
			return (
				<div className={wrapperClass}>
					<div className="row">
						<div className="col-md-3">
							{label}{req}
						</div>
						<div className="col-md-9">
							<Select id="multiSelect" defaultValue={defaultOption} isMulti onChange={onChange} options={options}/>
						</div>
					</div>
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
						<Select id="multiSelect" defaultValue={defaultOption} isMulti onChange={onChange} options={options}/>
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

SelectMultipleInput.propTypes = {
	containerState: PropTypes.object,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	defaultOption: PropTypes.oneOfType([PropTypes.string,PropTypes.array]),
	value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
	rendered: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	required: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.object),
	wrapperClass: PropTypes.string,
	inline: PropTypes.string
};

export default SelectMultipleInput;
