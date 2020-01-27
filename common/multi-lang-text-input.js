import React from 'react';
import PropTypes from 'prop-types';
import Input from './text-input';
import Utils from '../../core/common/utils';

const MultiLangTextInput = ({ item, field, inputFields, errors, warns, successes, onChange, appPrefs, wrapperClass}) => {
	
	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (errors != null && errors[field.name] != null && errors[field.name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		errorLabel = <div id={field.name + "-error"} className="control-label has-error" >{errors[field.name]}</div>;
	}
	
	let warnLabel = '';
	let warnFeedBack = '';
	if (warns != null && warns[field.name] != null && warns[field.name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <label id={field.name + "-warn"} className="control-label has-warn" htmlFor={field.name}>{warns[field.name]}</label>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (successes != null && successes[field.name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		successFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		successLabel = <label id={field.name + "-success"} className="control-label has-success" htmlFor={field.name}>{successes[field.name]}</label>;
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
    if (appPrefs != null && appPrefs.appGlobal != null && appPrefs.appGlobal.LANGUAGES != null && appPrefs.appGlobal.LANGUAGES.length > 0){
    	for (let i = 0; i < appPrefs.appGlobal.LANGUAGES.length; i++) {
    		let langLabel = Utils.getMultiLangLabel(appPrefs.appGlobal.LANGUAGES[i], appPrefs.lang);

    		let required = false;
    		if (appPrefs.appGlobal.LANGUAGES[i].defaultLang) {
    			required = true;
    		}
    		if (field.rendered) {
    			let textDefault = "";
    			//if (item != null && item.title != null && item.title.langTexts != null) {
    			//	for (let j = 0; j < item.title.langTexts.length; j++) {
    			//		if (item.title.langTexts[j].lang == appPrefs.appGlobal.LANGUAGES[i].code) {
    			//			textDefault = item.title.langTexts[j].text;
    			//		}
    			//	}
    			//}
    			let textLabel = formLabel.textLabel + " " + langLabel;
    			let textNameLang = textName + "-" + appPrefs.appGlobal.LANGUAGES[i].code;
    			langTextOptions.push(<Input key={i} name={textNameLang} inputType={field.htmlType} label={textLabel} required={required} errors={errors} onChange={onChange(textNameLang)} value={(inputFields != null && inputFields[textNameLang] != null)?inputFields[textNameLang]:textDefault}/>);
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
					<Input name={defaultName} inputType={field.htmlType} label={formLabel.defaultLabel} rendered={field.rendered} required={field.required} errors={errors} onChange={onChange(defaultName)} value={(inputFields != null && inputFields[defaultName] != null)?inputFields[defaultName]:titleDefault}/>
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
	errors: PropTypes.object,
	warns: PropTypes.object,
	successes: PropTypes.object,
	onChange: PropTypes.func,
	appPrefs: PropTypes.object,
	wrapperClass: PropTypes.string,
};

export default MultiLangTextInput;
