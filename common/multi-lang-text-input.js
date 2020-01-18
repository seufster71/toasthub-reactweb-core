import React from 'react';
import PropTypes from 'prop-types';
import Input from './text-input';
import Utils from '../../core/common/utils';

const MultiLangTextInput = ({formField, inputFields, item, errors, warns, successes, onChange, appPrefs, wrapperClass}) => {
	
	if (wrapperClass == null) {
		wrapperClass = 'form-group';
	}
	
	let errorLabel = '';
	let errorFeedBack = '';
	if (errors != null && errors[name] != null && errors[name] != "") {
		wrapperClass += " " + 'has-error has-feedback';
		errorFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		errorLabel = <div id={name + "-error"} className="control-label has-error" >{errors[name]}</div>;
	}
	
	let warnLabel = '';
	let warnFeedBack = '';
	if (warns != null && warns[name] != null && warns[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		warnFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		warnLabel = <label id={name + "-warn"} className="control-label has-warn" htmlFor={name}>{warns[name]}</label>;
	}
			
	let successLabel = '';
	let successFeedBack = '';
	if (successes != null && successes[name] > 0) {
		wrapperClass += " " + 'has-error has-feedback';
		successFeedBack = <span className="glyphicon glyphicon-remove form-control-feedback"/>;
		successLabel = <label id={name + "-success"} className="control-label has-success" htmlFor={name}>{successes[name]}</label>;
	}
	
	if (formField.classModel != "") {
		let titleModel = JSON.parse(formField.classModel);
		if (item != null && item[titleModel.field] != null) {
			titleDefault = item[titleModel.field];
		}
	}
	
	let defaultName = formField.name + '-DEFAULT';
	let fieldDefault = "";
	
	let textName = formField.name + '-TEXT';
	
	let formLabel = JSON.parse(formField.label);

	let langTextOptions=[];
    if (appPrefs != null && appPrefs.appGlobal != null && appPrefs.appGlobal.LANGUAGES != null && appPrefs.appGlobal.LANGUAGES.length > 0){
    	for (let i = 0; i < appPrefs.appGlobal.LANGUAGES.length; i++) {
    		let langLabel = Utils.getMultiLangLabel(appPrefs.appGlobal.LANGUAGES[i], appPrefs.lang);

    		let required = false;
    		if (appPrefs.appGlobal.LANGUAGES[i].defaultLang) {
    			required = true;
    		}
    		if (formField.rendered) {
    			let textDefault = "";
    			let textLabel = formLabel.textLabel + " " + langLabel;
    			let textNameLang = textName + "-" + appPrefs.appGlobal.LANGUAGES[i].code;
    			langTextOptions.push(<Input key={i} name={textNameLang} inputType={formField.htmlType} label={textLabel} required={required} errors={errors} onChange={onChange(textNameLang)} value={(inputFields != null && inputFields[textNameLang] != null)?inputFields[textNameLang]:textDefault}/>);
    		}
    	}
    }
    
	
	return (
		<div className="panel panel-default">
			<div className="panel-heading"> {formLabel.label} </div>
			<div className="panel-body">
				<Input name={defaultName} inputType={formField.htmlType} label={formLabel.defaultLabel} rendered={formField.rendered} required={formField.required} errors={errors} onChange={onChange(defaultName)} value={(inputFields != null && inputFields[defaultName] != null)?inputFields[defaultName]:fieldDefault}/>
				{langTextOptions}
			</div>
		</div>
	);
};

MultiLangTextInput.propTypes = {
	formField: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	item: PropTypes.object,
	errors: PropTypes.object,
	warns: PropTypes.object,
	onChange: PropTypes.func,
	appPrefs: PropTypes.object,
	wrapperClass: PropTypes.string,
};

export default MultiLangTextInput;
