import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../coreView/common/text-input';

const TextInputBuilder = ({item, field, inputFields, onChange, errors, warns, successes }) => {
	
	let defaultInput = "";
	if (field.classModel != "") {
		let codeModel = JSON.parse(field.classModel);
		if (item != null && item[codeModel.field] != null) {
			defaultInput = item[codeModel.field];
		}
	}
	
	return (
		<Input name={field.name} inputType={field.htmlType} label={field.label} rendered={field.rendered} required={field.required} errors={errors} onChange={onChange(field.name)} value={(inputFields != null && inputFields[field.name] != null)?inputFields[field.name]:defaultInput}/>
	);
};

TextInputBuilder.propTypes = {
	item: PropTypes.object,
	field: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	errors: PropTypes.object,
	warns: PropTypes.object,
	successes: PropTypes.object,
	onChange: PropTypes.func
};

export default TextInputBuilder;
