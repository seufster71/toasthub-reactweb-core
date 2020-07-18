import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../coreView/common/text-input';
import TextBuilder from '../../coreView/common/text-input-builder';
import TextAutocompleteBuilder from '../../coreView/common/text-autocomplete-builder';
import TextAreaBuilder from '../../coreView/common/textarea-input-builder';
import MultiLangTextInput from '../../coreView/common/multi-lang-text-input';
import SelectBuilder from '../../coreView/common/select-input-builder';
import CheckBox from '../../coreView/common/checkBox';
import Switch from '../../coreView/common/switch';
import DateBuilder from '../../coreView/common/date-input-builder';
import SelectMultipleBuilder from '../../coreView/common/select-multiple-builder';
import utils from '../../core/common/utils';
import moment from 'moment';

export default function FormBuilder({containerState, itemState, item, formName, formTitle, formGroup, inputFields, 
	appPrefs, prefForms, onSave, onCancel, inputChange}) {
	
	if (itemState != null && item == null){
		item = itemState.selected;
	}
	if (itemState != null && inputFields == null) {
		inputFields = itemState.inputFields;
	}
	if (itemState != null && prefForms == null) {
		prefForms = itemState.prefForms;
	}
		
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
	let subGroups = [];
	let options = [];
	let defaultOption;
	if (prefForms != null && prefForms[formName] != null) {
    	for (let i = 0; i < prefForms[formName].length; i++) {
    		if (prefForms[formName][i].subGroup != undefined && prefForms[formName][i].subGroup != ""){
    			continue;
    		}
    		let fieldType = prefForms[formName][i].fieldType;
    		switch(fieldType) {
    		case "MGRP":
        		subGroups.push(prefForms[formName][i]);
    			break;
    		case "TXT":
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<TextBuilder item={item} field={prefForms[formName][i]} inputFields={inputFields} containerState={containerState} inputChange={inputChange}/>
    						</div>
    					</div>);
    			break;
    		case "TXTAREA":
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<TextAreaBuilder item={item} field={prefForms[formName][i]} inputFields={inputFields} containerState={containerState} inputChange={inputChange}/>
    						</div>
    					</div>);
    			break;
    		case "MTXT":
    			fieldList.push(
    					<div key={i} className="row">
							<div className="col-sm-4">
								<MultiLangTextInput field={prefForms[formName][i]} item={item} inputFields={inputFields} containerState={containerState} inputChange={inputChange} appPrefs={appPrefs}/>		
							</div>
						</div>);
    			break;
    		case "SLT":
    			options = [];
    			if (prefForms[formName][i].value != "") {
    				let valueObj = JSON.parse(prefForms[formName][i].value);
    				if (valueObj.options != null) {
    					options = valueObj.options;
    				} else if (valueObj.referPref != null) {
    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
    					if (pref != null && pref.value != null && pref.value != "") {
							let value = JSON.parse(pref.value);
							if (value.options != null) {
								options = value.options;
							}
						}
    				}
    			}
				fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<SelectBuilder item={item} field={prefForms[formName][i]} inputFields={inputFields} containerState={containerState} inputChange={inputChange} options={options}/>
    						</div>
    					</div>);
    			break;
    		case "SLTMULTI":
    			options = [];
    			if (prefForms[formName][i].value != "") {
    				let valueObj = JSON.parse(prefForms[formName][i].value);
    				if (valueObj.options != null) {
    					options = valueObj.options;
    				} else if (valueObj.referPref != null) {
    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
    					if (pref != null && pref.value != null && pref.value != "") {
							let value = JSON.parse(pref.value);
							if (value.options != null) {
								options = value.options;
							}
						}
    				} else if (valueObj.optionRef != null) {
    					options = itemState[valueObj.optionRef];
    				}
    			}
    			defaultOption = [];
    			if (inputFields[prefForms[formName][i].name] != null && inputFields[prefForms[formName][i].name] != "") {
    				let optionIds = inputFields[prefForms[formName][i].name];
    				for (let l = 0; l < optionIds.length; l++) {
    					for (let o = 0; o < options.length; o++) {
    						if (optionIds[l] == options[o].value) {
    							defaultOption.push(options[o]);
    						}
    					}
    				}
    			}
    			
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<SelectMultipleBuilder item={item} field={prefForms[formName][i]} inputFields={inputFields} containerState={containerState} inputChange={inputChange} options={options} defaultOption={defaultOption}/>
    						</div>
    					</div>);
    			break;
    		case "BLN":
    			let optionsBLN = [];
    			if (prefForms[formName][i].value != "") {
    				let valueObj = JSON.parse(prefForms[formName][i].value);
    				if (valueObj.options != null) {
    					optionsBLN = valueObj.options;
    				} else if (valueObj.referPref != null) {
    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
						if (pref != null && pref.value != null && pref.value != "") {
							let value = JSON.parse(pref.value);
							if (value.options != null) {
								optionsBLN = value.options;
							}
						}
    				}
    			}
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<Switch item={item} field={prefForms[formName][i]} inputFields={inputFields} containerState={containerState} inputChange={inputChange} options={optionsBLN}/>
    						</div>
    					</div>);
    			break;
    		case "DATE":
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<DateBuilder item={item} field={prefForms[formName][i]} inputFields={inputFields} containerState={containerState} inputChange={inputChange}/>
    						</div>
    					</div>);
    			break;
    		case "ASLT":
    			if (itemState.selectList != null) {
    				for (let l = 0; l < itemState.selectList.length; l++) {
    					let desc = itemState.selectList[l].label;
    					if (itemState.selectList[l] != null && itemState.selectList[l].extra != "") {
    						desc += " - " + itemState.selectList[l].extra;
    					}
    					options.push(<div key={l} onClick={() => inputChange("SELECTCLICK",prefForms[formName][i],itemState.selectList[l])}>{desc}</div>);
    				}
    			}
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<TextAutocompleteBuilder item={item} field={prefForms[formName][i]} inputFields={inputFields} containerState={containerState} inputChange={inputChange} options={options} isSelectListOpen={itemState.isSelectListOpen}/>
    						</div>
    					</div>);
    			break;
    		}
    		
    	}
    	if (subGroups.length > 0) {
    		for (let i = 0; i < subGroups.length; i++) {
    			let groupName = "";
    			let groupType = "";
    			let subGroupLabel = subGroups[i].label;
    			if (subGroups[i].classModel != undefined && subGroups[i].classModel.includes("{")) {
    				let classModel = JSON.parse(subGroups[i].classModel);
    				groupName = classModel.groupName;
    				groupType = classModel.groupType;
    			}
    			if (groupType === "MULTI") {
    				for (let l = 0; l < appPrefs.prefGlobal.LANGUAGES.length; l++) {
    	    			let key = "subGroup-"+appPrefs.prefGlobal.LANGUAGES[l].code;
    	    			let subGroupList = [];
    	    			for (let j = 0; j < prefForms[formName].length; j++) {
    	    				if ( !(prefForms[formName][j].subGroup === groupName) ) {
    	    	    			continue;
    	    	    		}
    	    					
    	    				let fieldType = prefForms[formName][j].fieldType;
    	    				switch(fieldType) {
    	    	    		case "TXT":
    	    					subGroupList.push(
    	            					<div key={j} className="row">
    	            						<div className="col-sm-12">
    	            							<TextBuilder item={item} field={prefForms[formName][j]} inputFields={inputFields} lang={appPrefs.prefGlobal.LANGUAGES[l].code} containerState={containerState} inputChange={inputChange}/>
    	            						</div>
    	            					</div>);
    	            			break;
    	    	    		case "SLT":
    		    				let options = [];
    		        			if (prefForms[formName][j].value != "") {
    		        				let valueObj = JSON.parse(prefForms[formName][j].value);
    		        				options = valueObj.options;
    		        			}
    	        				subGroupList.push(
    	            					<div key={j} className="row">
    	            						<div className="col-sm-12">
    	            							<SelectBuilder item={item} field={prefForms[formName][j]} inputFields={inputFields} lang={appPrefs.prefGlobal.LANGUAGES[l].code} containerState={containerState} inputChange={inputChange} options={options}/>
    	            						</div>
    	            					</div>);
    	        				break;
    	    	    		case "BLN":
    	    	    			let optionsBLN = [];
    	    	    			if (prefForms[formName][j].value != "") {
    	    	    				let valueObj = JSON.parse(prefForms[formName][j].value);
    	    	    				if (valueObj.options != null) {
    	    	    					optionsBLN = valueObj.options;
    	    	    				} else if (valueObj.referPref != null) {
    	    	    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
    	    							if (pref != null && pref.value != null && pref.value != "") {
    	    								let value = JSON.parse(pref.value);
    	    								if (value.options != null) {
    	    									optionsBLN = value.options;
    	    								}
    	    							}
    	    	    				}
    	    	    			}
    	        				subGroupList.push(
    	            					<div key={j} className="row">
    	            						<div className="col-sm-12">
    	            							<Switch item={item} field={prefForms[formName][j]} inputFields={inputFields} lang={appPrefs.prefGlobal.LANGUAGES[l].code} containerState={containerState} inputChange={inputChange} options={optionsBLN}/>
    	            						</div>
    	            					</div>);
    	        				break;
    	    				}
    	    			}
    	    			let label = subGroupLabel+" "+utils.getMultiLangLabel(appPrefs.prefGlobal.LANGUAGES[l],appPrefs.lang);
    	    			if (appPrefs.prefGlobal.LANGUAGES[l].defaultLang) {
    	    				label = label+" *";
    	    			}
    	    			fieldList.push(
    	    	    			<div key={key} className="row">
    	    						<div className="col-sm-4">
    	    			    			<div className="panel panel-default">
    	    			    				<div className="panel-heading"> {label} </div>
    	    			    				<div className="panel-body">
    	    									{subGroupList}
    	    								</div>
    	    							</div>
    	    						</div>
    	    					</div>);
    				}
    			} else {
    				for (let j = 0; j < prefForms[formName].length; j++) {
        				if ( !(prefForms[formName][j].group === groupName) ) {
        	    			continue;
        	    		}
        				let fieldType = prefForms[formName][j].fieldType;
        				switch(fieldType) {
	    	    		case "TXT":
        					subGroupList.push(
                					<div key={j} className="row">
                						<div className="col-sm-12">
                							<TextBuilder item={item} field={prefForms[formName][j]} inputFields={inputFields} lang={appPrefs.prefGlobal.LANGUAGES[l].code} containerState={containerState} inputChange={inputChange}/>
                						</div>
                					</div>);
        					break;
	    	    		case "SLT":
    	    				let options = [];
    	        			if (prefForms[formName][j].value != "") {
    	        				let valueObj = JSON.parse(prefForms[formName][j].value);
    	        				options = valueObj.options;
    	        			}
            				subGroupList.push(
                					<div key={j} className="row">
                						<div className="col-sm-12">
                							<SelectBuilder item={item} field={prefForms[formName][j]} inputFields={inputFields} lang={appPrefs.prefGlobal.LANGUAGES[l].code} containerState={containerState} inputChange={inputChange} options={options}/>
                						</div>
                					</div>);
            				break;
	    	    		case "BLN":
	    	    			let optionsBLN = [];
	    	    			if (prefForms[formName][j].value != "") {
	    	    				let valueObj = JSON.parse(prefForms[formName][j].value);
	    	    				if (valueObj.options != null) {
	    	    					optionsBLN = valueObj.options;
	    	    				} else if (valueObj.referPref != null) {
	    	    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
	    							if (pref != null && pref.value != null && pref.value != "") {
	    								let value = JSON.parse(pref.value);
	    								if (value.options != null) {
	    									optionsBLN = value.options;
	    								}
	    							}
	    	    				}
	    	    			}
            				subGroupList.push(
                					<div key={j} className="row">
                						<div className="col-sm-12">
                							<Switch item={item} field={prefForms[formName][j]} inputFields={inputFields} lang={appPrefs.prefGlobal.LANGUAGES[l].code} containerState={containerState} inputChange={inputChange} options={optionsBLN}/>
                						</div>
                					</div>);
            				break;
    	        		}
        			}
    				fieldList.push(
    		    			<div key={key} className="row">
    							<div className="col-sm-4">
    				    			<div className="panel panel-default">
    				    				<div className="panel-heading"> {subGroupLabel} </div>
    				    				<div className="panel-body">
    										{subGroupList}
    									</div>
    								</div>
    							</div>
    						</div>);
    			}
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
				<div className="col-sm-4">
		  			<button type="button" className="btn btn-primary" onClick={() => onSave()}>Save</button>
		  			<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => onCancel()}>Cancel</button>
		  		</div>
	  		</div>
	  	</div>
	);
}

FormBuilder.propTypes = {
	containerState: PropTypes.object.isRequired,
	itemState: PropTypes.object,
	item: PropTypes.object,
	formName: PropTypes.string.isRequired,
	formTitle: PropTypes.string,
	formGroup: PropTypes.string.isRequired,
	inputFields: PropTypes.object,
	appPrefs: PropTypes.object.isRequired,
	prefForms: PropTypes.object,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	inputChange: PropTypes.func.isRequired
};

