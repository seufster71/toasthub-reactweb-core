import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../coreView/common/select-input';

const SelectInputBuilder = ({item, field, inputFields, options, onChange, containerState, lang }) => {
	
	let fieldName = field.name;
	if (lang != null) {
		fieldName = field.name+"-"+lang;
	}
	
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
		<Select name={fieldName} label={field.label} required={field.required} errors={errors} successes={successes} warns={warns} 
		options={selectOptions} onChange={onChange(fieldName)} value={(inputFields != null && inputFields[fieldName] != null)?inputFields[fieldName]:defaultInput}/>
	);
};

SelectInputBuilder.propTypes = {
	item: PropTypes.object,
	field: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	options: PropTypes.array,
	containerState: PropTypes.object,
	onChange: PropTypes.func,
	lang: PropTypes.string
};

export default SelectInputBuilder;
