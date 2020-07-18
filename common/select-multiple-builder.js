import React from 'react';
import PropTypes from 'prop-types';
import SelectMultiple from './select-multiple-input';

const SelectInputBuilder = ({item, field, inputFields, options, inputChange, containerState, lang, defaultOption }) => {
	
	let fieldName = field.name;
	if (lang != null) {
		fieldName = field.name+"-"+lang;
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
			<SelectMultiple containerState={containerState} name={fieldName} label={field.label} options={options} 
				inputChange={inputChange} defaultOption={defaultOption}/>
	);
};

SelectInputBuilder.propTypes = {
	item: PropTypes.object,
	field: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	options: PropTypes.array,
	defaultOption: PropTypes.array,
	containerState: PropTypes.object,
	inputChange: PropTypes.func,
	lang: PropTypes.string
};

export default SelectInputBuilder;
