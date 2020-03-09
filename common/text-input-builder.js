import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../coreView/common/text-input';

const TextInputBuilder = ({item, field, inputFields, onChange, onBlur, containerState}) => {
	
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
		<Input name={field.name} inputType={field.htmlType} label={field.label} rendered={field.rendered} required={field.required} errors={errors} successes={successes}
		warns={warns} onChange={onChange(field.name)} value={(inputFields != null && inputFields[field.name] != null)?inputFields[field.name]:defaultInput} comment={comment}
		onBlur={(onBlur != null)?onBlur(field):null}/>
	);
};

TextInputBuilder.propTypes = {
	item: PropTypes.object,
	field: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	containerState: PropTypes.object,
	onChange: PropTypes.func,
	onBlur: PropTypes.func
};

export default TextInputBuilder;