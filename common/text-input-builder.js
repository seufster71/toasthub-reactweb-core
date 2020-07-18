import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../coreView/common/text-input';

const TextInputBuilder = ({item, field, inputFields, inputChange, onBlur, containerState, lang}) => {
	let fieldName = field.name;
	if (lang != null){
		fieldName = field.name+"-"+lang;
	}
	let defaultInput = "";
	if (field.classModel != "") {
		let codeModel = JSON.parse(field.classModel);
		if (item != null && item[codeModel.field] != null) {
			defaultInput = item[codeModel.field];
		}
	}
	
	let comment = "";
	if (field.validation != "") {
		let validation = JSON.parse(field.validation);
		if (validation.comment != null) {
			comment = validation.comment;
		}
	}
	let errors = null;
	if (containerState != null && containerState.errors != null){
		errors = containerState.errors;
	}
	
	let warns = null;
	if (containerState != null && containerState.warns != null){
		warns = containerState.warns;
	}
	
	let successes = null;
	if (containerState != null && containerState.successes != null){
		successes = containerState.successes;
	}
	
	return (
			<Input name={fieldName} inputType={field.htmlType} label={field.label} rendered={field.rendered} required={field.required} errors={errors} successes={successes}
			warns={warns} inputChange={(e) => inputChange("TEXT",fieldName,'',e)} value={(inputFields != null && inputFields[fieldName] != null)?inputFields[fieldName]:defaultInput} comment={comment}
			onBlur={(onBlur != null)?() => onBlur(field):null}/>
		);
	
};

TextInputBuilder.propTypes = {
	item: PropTypes.object,
	field: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	containerState: PropTypes.object,
	inputChange: PropTypes.func,
	onBlur: PropTypes.func,
	lang: PropTypes.string
};

export default TextInputBuilder;
