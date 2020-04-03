import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../coreView/common/text-input';

export default function FormBuilder({containerState, item, formName, formTitle, inputFields, appPrefs, prefForms, onSave, onCancel, inputChange}) {
	
	let formTitleDefault = "Form Title";
	if (formTitle == null || formTitle != null && formTitle == ""){
		formTitle = formTitleDefault;
	}
	
	let fieldList = [];
	if (prefForms != null && prefForms[formName] != null) {
    	for (let i = 0; i < prefForms[formName].length; i++) {
    		if(prefForms[formName].htmlType == "text"){
    			fieldList.push(<div key={i} className="row"><TextBuilder item={item} field={prefForms[formName][i]} inputFields={inputFields} containerState={containerState} onChange={inputChange}/></div>);
    		} else if (prefForms[formName].htmlType == "select") {
    			
    		}
    	}
    }
	
	return (
		<div className="col-lg-12">
			<h4 className="modal-title">{formTitle}</h4>
			{fieldList}
			<div className="row">
		  		<button type="button" className="btn btn-primary" onClick={onSave()}>Save</button>
		  		<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onCancel()}>Cancel</button>
	  		</div>
	  	</div>
	);
}

FormBuilder.propTypes = {
	containerState: PropTypes.object.isRequired,
	item: PropTypes.object,
	formName: PropTypes.string.isRequired,
	inputFields: PropTypes.object.isRequired,
	appPrefs: PropTypes.object.isRequired,
	prefForms: PropTypes.object.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	inputChange: PropTypes.func.isRequired
};

