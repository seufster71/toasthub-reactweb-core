import React from 'react';
import PropTypes from 'prop-types';
import Input from './text-input';
import Utils from '../../core/common/utils';

const MultiLangTextInput = ({ item, field, inputFields, containerState, onChange, appPrefs, wrapperClass}) => {
	
	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	
	let errors = null;
	if (containerState != null && containerState.errors != null) {
		errors = containerState.errors;
	}
	
	let warns = null;
	if (containerState != null && containerState.warns != null) {
		warns = containerState.warns;
	}
			
	let successes = null;
	if (containerState != null && containerState.successes != null) {
		successes = containerState.successes;
	}
	
	let titleDefault = "";
	if (field.classModel != "") {
		let titleModel = JSON.parse(field.classModel);
		if (item != null && item[titleModel.field] != null) {
			titleDefault = item[titleModel.field].defaultText;
		}
	}
	
	let defaultName = field.name + '-DEFAULT';

	let textName = field.name + '-TEXT';
	
	let formLabel = JSON.parse(field.label);

	let langTextOptions=[];
    if (appPrefs != null && appPrefs.prefGlobal != null && appPrefs.prefGlobal.LANGUAGES != null && appPrefs.prefGlobal.LANGUAGES.length > 0){
    	for (let i = 0; i < appPrefs.prefGlobal.LANGUAGES.length; i++) {
    		let langLabel = Utils.getMultiLangLabel(appPrefs.prefGlobal.LANGUAGES[i], appPrefs.lang);

    		let required = false;
    		if (appPrefs.prefGlobal.LANGUAGES[i].defaultLang) {
    			required = true;
    		}
    		if (field.rendered) {
    			let textDefault = "";
    			//if (item != null && item.title != null && item.title.langTexts != null) {
    			//	for (let j = 0; j < item.title.langTexts.length; j++) {
    			//		if (item.title.langTexts[j].lang == appPrefs.prefGlobal.LANGUAGES[i].code) {
    			//			textDefault = item.title.langTexts[j].text;
    			//		}
    			//	}
    			//}
    			let textLabel = formLabel.textLabel + " " + langLabel;
    			let textNameLang = textName + "-" + appPrefs.prefGlobal.LANGUAGES[i].code;
    			langTextOptions.push(<Input key={i} name={textNameLang} inputType={field.htmlType} label={textLabel} required={required} errors={errors} warns={warns} successes={successes} onChange={onChange(textNameLang)} value={(inputFields != null && inputFields[textNameLang] != null)?inputFields[textNameLang]:textDefault}/>);
    		}
    	}
    }
    
	let rendered = true;
	if (field.rendered != null && field.rendered.length != 0){
		if ((typeof field.rendered === "string" && field.rendered == "false")){
			rendered = false;
		} else {
			rendered = field.rendered;
		}
	}
		
	if (rendered) {
		return (
			<div className="panel panel-default">
				<div className="panel-heading"> {formLabel.label} </div>
				<div className="panel-body">
					<Input name={defaultName} inputType={field.htmlType} label={formLabel.defaultLabel} rendered={field.rendered} required={field.required} errors={errors} warns={warns} successes={successes} onChange={onChange(defaultName)} value={(inputFields != null && inputFields[defaultName] != null)?inputFields[defaultName]:titleDefault}/>
					{langTextOptions}
				</div>
			</div>
		);
	} else {
		return (<div></div>);
	}
};

MultiLangTextInput.propTypes = {
	item: PropTypes.object,
	field: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	containerState: PropTypes.object,
	onChange: PropTypes.func,
	appPrefs: PropTypes.object,
	wrapperClass: PropTypes.string,
};

export default MultiLangTextInput;
