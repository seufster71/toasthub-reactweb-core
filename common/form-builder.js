import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../coreView/common/text-input';
import TextBuilder from '../../coreView/common/text-input-builder';
import MultiLangTextInput from '../../coreView/common/multi-lang-text-input';
import SelectBuilder from '../../coreView/common/select-input-builder';
import CheckBox from '../../coreView/common/checkBox';
import Switch from '../../coreView/common/switch';
import moment from 'moment';

export default function FormBuilder({containerState, item, formName, formTitle, formGroup, inputFields, appPrefs, prefForms, onSave, onCancel, onChange}) {
	
	let formTitleDefault = "Form Title";
	if (formTitle == null || formTitle != null && formTitle == ""){
		formTitle = formTitleDefault;
	}
	
	let created = "";
    if (item != null && item.created != null) {
    	created = new Intl.DateTimeFormat('en-US',{
    		year: 'numeric', month: 'numeric', day: 'numeric',
    		hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York'
    	}).format(moment(item.created).toDate());
    	created = <div>Created: {created}</div>;
    }
    
    let modified = "";
    if (item != null && item.modified != null) {
    	modified = new Intl.DateTimeFormat('en-US',{
    		year: 'numeric', month: 'numeric', day: 'numeric',
    		hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York'
    	}).format(moment(item.modified).toDate());
    	modified = <div>Last Modified: {modified}</div>
    }
	
	let fieldList = [];
	if (prefForms != null && prefForms[formName] != null) {
    	for (let i = 0; i < prefForms[formName].length; i++) {
    		if ( !(prefForms[formName][i].group === formGroup) ) {
    			continue;
    		}
    		let fieldType = prefForms[formName][i].fieldType;
    		if (fieldType === "TXT"){
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<TextBuilder item={item} field={prefForms[formName][i]} inputFields={inputFields} containerState={containerState} onChange={onChange}/>
    						</div>
    					</div>);
    		} else if (fieldType == "MTXT") {
    			fieldList.push(
    					<div key={i} className="row">
							<div className="col-sm-4">
								<MultiLangTextInput field={prefForms[formName][i]} item={item} inputFields={inputFields} containerState={containerState} onChange={onChange} appPrefs={appPrefs}/>		
							</div>
						</div>);
    		} else if (fieldType == "SLT") {
    			let options = [];
    			if (prefForms[formName][i].value != "") {
    				let valueObj = JSON.parse(prefForms[formName][i].value);
    				options = valueObj.options;
    			}
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<SelectBuilder item={item} field={prefForms[formName][i]} inputFields={inputFields} containerState={containerState} onChange={onChange} options={options}/>
    						</div>
    					</div>);
    		} else if (fieldType == "BLN") {
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-md-4">
    							<Switch item={item} field={prefForms[formName][i]} inputFields={inputFields} containerState={containerState} onChange={onChange}/>
    						</div>
    					</div>);
    		}
    	}
    }
	
	return (
		<div className="col-lg-12">
			<h4 className="modal-title">{formTitle}</h4>
			{created}
			{modified}
			{fieldList}
			<div className="row">
				<div className="col-md-4">
		  			<button type="button" className="btn btn-primary" onClick={onSave()}>Save</button>
		  			<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onCancel()}>Cancel</button>
		  		</div>
	  		</div>
	  	</div>
	);
}

FormBuilder.propTypes = {
	containerState: PropTypes.object.isRequired,
	item: PropTypes.object,
	formName: PropTypes.string.isRequired,
	formTitle: PropTypes.string,
	formGroup: PropTypes.string.isRequired,
	inputFields: PropTypes.object.isRequired,
	appPrefs: PropTypes.object.isRequired,
	prefForms: PropTypes.object.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
};

