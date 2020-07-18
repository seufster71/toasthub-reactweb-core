import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../coreView/common/text-input';

const TextAutocompleteBuilder = ({item, field, inputFields, inputChange, onBlur, containerState, lang, options, isSelectListOpen}) => {
	
	let value = "";
	if (inputFields != null && inputFields[field.name] != null) {
		value = inputFields[field.name].label;
	} else if (field.classModel != "") {
		let codeModel = JSON.parse(field.classModel);
		if (item != null && item[codeModel.field] != null) {
			value = item[codeModel.field];
		}
	}
	
	let commentLabel = '';
	if (field.validation != "") {
		let validation = JSON.parse(field.validation);
		if (validation.comment != null) {
			commentLabel = validation.comment;
		}
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (containerState != null && containerState.errors != null && containerState.errors[name] != null && containerState.errors[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		errorLabel = <div id={name + "-error"} className="control-label has-error" >{errors[name]}</div>;
	}
		
	let warnLabel = '';
	let warnFeedBack = '';
	if (containerState != null && containerState.warns != null && containerState.warns[name] != null && containerState.warns[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <label id={name + "-warn"} className="control-label has-warn" htmlFor={name}>{warns[name]}</label>;
	}
	
	let successLabel = '';
	let successFeedBack = '';
	if (containerState != null && containerState.successes != null && containerState.successes[name] != null && containerState.successes[name] != "") {
		wrapperClass += " " + 'has-success has-feedback';
		//successFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		successLabel = <label id={name + "-success"} className="control-label has-success" htmlFor={name}>{successes[name]}</label>;
	}
	
	let wrapperClass = "form-group toasthub-autocomplete";
	if (wrapperClass == null) {
		wrapperClass = 'form-group toasthub-autocomplete';
	}
	
	let inputType = "text"
	if (field.htmlType == null || field.htmlType.length == 0){
		inputType = field.htmlType;
	}
	
	let req = "";
	if ((typeof field.required === "boolean" && field.required) || (typeof field.required === "string" && field.required == "true")){
		req = " *";
	}
	
	let rendered = true;
	if (field.rendered == null || field.rendered.length == 0){
		rendered = field.rendered;
	} else if (typeof field.rendered === "string"){
		if (rendered == "true") {
			rendered = true;
		} else {
			rendered = false;
		}
	}
	let placeHolder = "";
	let min = "";
	let max = "";
	let autocompleteId = "autocomplete-"+field.name;
	
	if (rendered) {
		return (
			<div className={wrapperClass} >
				<label htmlFor={field.name}>{field.label}{req}</label>
				<input type={inputType} id={field.name} name={field.name} min={min} max={max} className="form-control" autoCapitalize="off" onChange={(e) => inputChange("SELECT",field,'',e)} placeholder={placeHolder} value={value || ""}/>
				{isSelectListOpen &&
					<div id={autocompleteId} className="toasthub-autocomplete-items">
						{options}
					</div>
				}
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

TextAutocompleteBuilder.propTypes = {
	item: PropTypes.object,
	field: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	containerState: PropTypes.object,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	lang: PropTypes.string,
	isSelectListOpen: PropTypes.bool
};

export default TextAutocompleteBuilder;
