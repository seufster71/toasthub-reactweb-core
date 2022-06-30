import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../coreView/common/select-input';

const SelectInputBuilder = ({itemState, field, options, loadOptions, inputChange, lang, isAsync }) => {
	
	let fieldName = field.name;
	if (lang != null) {
		fieldName = field.name+"-"+lang;
	}
	
	let isDisabled = false;
	
	let defaultOption = {};

	let defaultInput = "";
	if (field.classModel != "") {
		let codeModel = JSON.parse(field.classModel);
		if (itemState.selected != null && itemState.selected[codeModel.field] != null) {
			defaultInput = itemState.selected[codeModel.field];
		}
		if (codeModel.allowModify == false && itemState.view == "MODIFY" && itemState.selected != null && itemState.selected[codeModel.displayField] != null) {
			isDisabled = true;
			defaultOption = itemState.selected[codeModel.displayField];
		}
		
	}
	
	let selectOptions = [];
    if (options != null) {
    	selectOptions = options;
    } else {
		if (field.value != "") {
    		let o = JSON.parse(field.value);
    		selectOptions = o.options
    	}
    }
    
    
    for (let i = 0; i < selectOptions.length; i++) {
    	if (selectOptions[i].value == defaultInput) {
			defaultOption = selectOptions[i];
			break;
		}
    }
	return (
		<Select isAsync={isAsync} name={fieldName} label={field.label} required={field.required} errors={itemState.errors} successes={itemState.successes} warns={itemState.warns} 
		options={selectOptions} loadOptions={loadOptions} inputChange={inputChange} value={defaultOption} isDisabled={isDisabled}/>
	);
};

SelectInputBuilder.propTypes = {
	itemState: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,
	options: PropTypes.array,
	inputChange: PropTypes.func.isRequired,
	loadOptions: PropTypes.func,
	lang: PropTypes.string,
	isAsync: PropTypes.bool
};

export default SelectInputBuilder;
