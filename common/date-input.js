import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const DateInput = ({item, field, inputFields, errors, warns, successes, onChange, wrapperClass }) => {
	
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
		wrapperClass += ' ' + 'has-error has-feedback';
		successFeedBack = <span className='glyphicon glyphicon-remove form-control-feedback'/>;
		successLabel = <label id={field.name + "-success"} className="control-label has-success" htmlFor={field.name}>{successes[field.name]}</label>;
	}
		
	let req = '';
	if ((typeof field.required === 'boolean' && field.required) || (typeof field.required === 'string' && field.required == 'true')){
		req = ' *';
	}
	
	let rendered = true;
	if (field.rendered != null && field.rendered.length != 0){
		if ((typeof field.rendered === "string" && field.rendered == "false")){
			rendered = false;
		} else {
			rendered = field.rendered;
		}
	}
	
	let selected = null;
	if (inputFields != null && inputFields[field.name] != null && inputFields[field.name] != "") {
		selected = moment(inputFields[field.name]).toDate();
	} else {
		selected = moment().toDate();
	}
	
	if (rendered) {
		return (
			<div className={wrapperClass}>
				<label htmlFor={field.name}>{field.label}{req}</label>
				<div>
					<DatePicker className="form-control" selected={selected} dateFormat="MM-dd-yyyy" onChange={onChange(field.name)} />
				</div>
				{errorFeedBack}
				{errorLabel}
				{warnFeedBack}
				{warnLabel}
				{successFeedBack}
				{successLabel}
			</div>
		);
	} else {
		return (<div></div>);
	}
};

DateInput.propTypes = {
	item: PropTypes.object,
	field: PropTypes.object.isRequired,
	inputFields: PropTypes.object.isRequired,
	errors: PropTypes.object,
	warns: PropTypes.object,
	successes: PropTypes.object,
	onChange: PropTypes.func,
	wrapperClass: PropTypes.string,
};

export default DateInput;