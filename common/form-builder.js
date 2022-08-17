import React from 'react';
import PropTypes from 'prop-types';
import TextBuilder from '../../coreView/common/text-input-builder';
import TextAreaBuilder from '../../coreView/common/textarea-input-builder';
import MultiLangTextInput from '../../coreView/common/multi-lang-text-input';
import SelectBuilder from '../../coreView/common/select-input-builder';
import Switch from '../../coreView/common/switch';
import DateBuilder from '../../coreView/common/date-input-builder';
import SelectMultipleBuilder from '../../coreView/common/select-multiple-builder';
import utils from '../../core/common/utils';
import moment from 'moment';

export default function FormBuilder({itemState, formName, formTitle, formGroup, appPrefs, onSave, onCancel, inputChange, onClick, loadOptions}) {
	
		
	let formTitleDefault = "Form Title";
	if (formTitle == null || formTitle != null && formTitle == ""){
		formTitle = formTitleDefault;
	}
	
	let created = "";
    if (itemState.selected != null && itemState.selected.created != null) {
    	created = new Intl.DateTimeFormat('en-US',{
    		year: 'numeric', month: 'numeric', day: 'numeric',
    		hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York'
    	}).format(moment(itemState.selected.created).toDate());
    	created = <div>Created: {created}</div>;
    }
    
    let modified = "";
    if (itemState.selected != null && itemState.selected.modified != null) {
    	modified = new Intl.DateTimeFormat('en-US',{
    		year: 'numeric', month: 'numeric', day: 'numeric',
    		hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York'
    	}).format(moment(itemState.selected.modified).toDate());
    	modified = <div>Last Modified: {modified}</div>
    }
	
	let fieldList = [];
	let subGroups = [];
	let options = [];
	if (itemState.prefForms != null && itemState.prefForms[formName] != null) {
    	for (let i = 0; i < itemState.prefForms[formName].length; i++) {
    		if (itemState.prefForms[formName][i].subGroup != undefined && itemState.prefForms[formName][i].subGroup != ""){
    			continue;
    		}
    		let fieldType = itemState.prefForms[formName][i].fieldType;
    		switch(fieldType) {
    		case "MGRP":
        		subGroups.push(itemState.prefForms[formName][i]);
    			break;
    		case "TXT":
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<TextBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange}/>
    						</div>
    					</div>);
    			break;
    		case "TXTAREA":
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<TextAreaBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange}/>
    						</div>
    					</div>);
    			break;
    		case "MTXT":
    			fieldList.push(
    					<div key={i} className="row">
							<div className="col-sm-4">
								<MultiLangTextInput field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange} appPrefs={appPrefs}/>		
							</div>
						</div>);
    			break;
    		case "INT":
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<TextBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange}/>
    						</div>
    					</div>);
    			break;
    		case "SLT":
    			options = [];
    			if (itemState.prefForms[formName][i].value != "") {
    				let valueObj = JSON.parse(itemState.prefForms[formName][i].value);
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
    				} else if (valueObj.referPrefGlobal != null) {
    					let prefs = appPrefs.prefGlobal[valueObj.referPrefGlobal];
    					if (prefs != null && valueObj.referPrefGlobal === "LANGUAGES") {
							for (let j = 0; j < prefs.length; j++) {
								let option = {};
								option.value = prefs[j].code;
								for (let k = 0; k < prefs[j].title.langTexts.length; k++) {
									if (prefs[j].title.langTexts[k].lang === appPrefs.lang) {
										option.label = prefs[j].title.langTexts[k].text;
									}
								}
								options.push(option);
							}
						}
    				}
    			}
				fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<SelectBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange} options={options}/>
    						</div>
    					</div>);
    			break;
    		case "SLTMULTI":
    			options = [];
    			if (itemState.prefForms[formName][i].value != "") {
    				let valueObj = JSON.parse(itemState.prefForms[formName][i].value);
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
    			let defaultOption = [];
    			if (itemState.inputFields[itemState.prefForms[formName][i].name] != null && itemState.inputFields[itemState.prefForms[formName][i].name] != "") {
    				let optionIds = itemState.inputFields[itemState.prefForms[formName][i].name];
    				for (let l = 0; l < optionIds.length; l++) {
    					for (let o = 0; o < options.length; o++) {
    						if (optionIds[l].value == options[o].value) {
    							defaultOption.push(options[o]);
    						}
    					}
    				}
    			}
    			
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<SelectMultipleBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange} options={options} defaultOption={defaultOption}/>
    						</div>
    					</div>);
    			break;
    		case "BTN":
    			let defaultCode = "TEST";
    			if (itemState.prefForms[formName][i].classModel != null) {
					let valueObj = JSON.parse(itemState.prefForms[formName][i].classModel);
					if (valueObj.code != null && valueObj.type == "function") {
    					defaultCode = valueObj.code;
    				}
				}
    			fieldList.push(
					<div key={i} className="row">
						<div className="col-sm-4">
							<button type="button" className="btn btn-primary" onClick={() => onClick(defaultCode)}>{itemState.prefForms[formName][i].label}</button>
						</div>
					</div>);
    			break;
    		case "BLN":
    			let optionsBLN = [];
    			if (itemState.prefForms[formName][i].value != "") {
    				let valueObj = JSON.parse(itemState.prefForms[formName][i].value);
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
    							<Switch field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange} options={optionsBLN}/>
    						</div>
    					</div>);
    			break;
    		case "DATE":
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<DateBuilder field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange}/>
    						</div>
    					</div>);
    			break;
    		case "ASLT":
    			fieldList.push(
    					<div key={i} className="row">
    						<div className="col-sm-4">
    							<SelectBuilder isAsync={true} field={itemState.prefForms[formName][i]} itemState={itemState} inputChange={inputChange} loadOptions={loadOptions} />
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
    	    			for (let j = 0; j < itemState.prefForms[formName].length; j++) {
    	    				if ( !(itemState.prefForms[formName][j].subGroup === groupName) ) {
    	    	    			continue;
    	    	    		}
    	    					
    	    				let fieldType = itemState.prefForms[formName][j].fieldType;
    	    				switch(fieldType) {
    	    	    		case "TXT":
    	    					subGroupList.push(
    	            					<div key={j} className="row">
    	            						<div className="col-sm-12">
    	            							<TextBuilder field={itemState.prefForms[formName][j]} lang={appPrefs.prefGlobal.LANGUAGES[l].code} itemState={itemState} inputChange={inputChange}/>
    	            						</div>
    	            					</div>);
    	            			break;
    	    	    		case "SLT":
    		    				let options = [];
    		        			if (itemState.prefForms[formName][j].value != "") {
    		        				let valueObj = JSON.parse(itemState.prefForms[formName][j].value);
    		        				options = valueObj.options;
    		        			}
    	        				subGroupList.push(
    	            					<div key={j} className="row">
    	            						<div className="col-sm-12">
    	            							<SelectBuilder field={itemState.prefForms[formName][j]} lang={appPrefs.prefGlobal.LANGUAGES[l].code} itemState={itemState} inputChange={inputChange} options={options}/>
    	            						</div>
    	            					</div>);
    	        				break;
    	    	    		case "BLN":
    	    	    			let optionsBLN = [];
    	    	    			if (itemState.prefForms[formName][j].value != "") {
    	    	    				let valueObj = JSON.parse(itemState.prefForms[formName][j].value);
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
    	            							<Switch field={itemState.prefForms[formName][j]} lang={appPrefs.prefGlobal.LANGUAGES[l].code} itemState={itemState} inputChange={inputChange} options={optionsBLN}/>
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
    				for (let j = 0; j < itemState.prefForms[formName].length; j++) {
        				if ( !(itemState.prefForms[formName][j].group === groupName) ) {
        	    			continue;
        	    		}
        				let fieldType = itemState.prefForms[formName][j].fieldType;
        				switch(fieldType) {
	    	    		case "TXT":
        					subGroupList.push(
                					<div key={j} className="row">
                						<div className="col-sm-12">
                							<TextBuilder field={prefForms[formName][j]} lang={appPrefs.prefGlobal.LANGUAGES[l].code} itemState={itemState} inputChange={inputChange}/>
                						</div>
                					</div>);
        					break;
	    	    		case "SLT":
    	    				let options = [];
    	        			if (itemState.prefForms[formName][j].value != "") {
    	        				let valueObj = JSON.parse(itemState.prefForms[formName][j].value);
    	        				options = valueObj.options;
    	        			}
            				subGroupList.push(
                					<div key={j} className="row">
                						<div className="col-sm-12">
                							<SelectBuilder field={itemState.prefForms[formName][j]} lang={appPrefs.prefGlobal.LANGUAGES[l].code} itemState={itemState} inputChange={inputChange} options={options}/>
                						</div>
                					</div>);
            				break;
	    	    		case "BLN":
	    	    			let optionsBLN = [];
	    	    			if (itemState.prefForms[formName][j].value != "") {
	    	    				let valueObj = JSON.parse(itemState.prefForms[formName][j].value);
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
                							<Switch field={itemState.prefForms[formName][j]} lang={appPrefs.prefGlobal.LANGUAGES[l].code} itemState={itemState} inputChange={inputChange} options={optionsBLN}/>
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
		<div className="container">
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
		</div>
	);
}

FormBuilder.propTypes = {
	itemState: PropTypes.object.isRequired,
	formName: PropTypes.string.isRequired,
	formTitle: PropTypes.string,
	formGroup: PropTypes.string.isRequired,
	appPrefs: PropTypes.object.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	inputChange: PropTypes.func.isRequired,
	onClick: PropTypes.func,
	loadOptions: PropTypes.func
};

