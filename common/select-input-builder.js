import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../coreView/common/select-input';

const SelectInputBuilder = ({item, field, inputFields, options, onChange, errors, warns, successes }) => {
	
	let defaultInput = "";
	if (field.classModel != "") {
		let codeModel = JSON.parse(field.classModel);
		if (item != null && item[codeModel.field] != null) {
			defaultInput = item[codeModel.field];
		}
	}
	
	let selectOptions = [];
    if (options != null) {
    	selectOptions = options;
    } else {
    	let o = JSON.parse(field.value);
    	selectOptions = o.options
    }
	
	return (
		<Select name={field.name} label={field.label} required={field.required} errors={errors} options={selectOptions} onChange={onChange(field.name)} value={(inputFields != null && inputFields[field.name] != null)?inputFields[field.name]:defaultInput}/>
	);
};

SelectInputBuilder.propTypes = {
	item: PropTypes.object,
	field: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	options: PropTypes.array,
	errors: PropTypes.object,
	warns: PropTypes.object,
	successes: PropTypes.object,
	onChange: PropTypes.func
};

export default SelectInputBuilder;
