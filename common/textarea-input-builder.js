import React from 'react';
import PropTypes from 'prop-types';
import TextAreaInput from '../../coreView/common/textarea-input';

const TextAreaInputBuilder = ({item, field, inputFields, onChange, onBlur, containerState, lang}) => {
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
			<TextAreaInput name={fieldName} label={field.label} rendered={field.rendered} required={field.required} errors={errors} successes={successes} rows={field.rows} cols={field.cols}
			warns={warns} onChange={onChange(fieldName)} value={(inputFields != null && inputFields[fieldName] != null)?inputFields[fieldName]:defaultInput} comment={comment}
			onBlur={(onBlur != null)?onBlur(field):null}/>
		);
	
};

TextAreaInputBuilder.propTypes = {
	item: PropTypes.object,
	field: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	containerState: PropTypes.object,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	lang: PropTypes.string
};

export default TextAreaInputBuilder;
