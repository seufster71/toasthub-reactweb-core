import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({name, value, options, fieldName, label, onClick}) => {
	let wrapperClass = 'form-group text-center';
	let defaultOptions = [{"value":true,"label":"Yes"},{"value":false,"label":"No","defaultInd":true}];
  
	if (options == null) {
		options = defaultOptions
	}
	
	if (value == null) {
		for (let i = 0; i < options.length; i++) {
			if (options[i].defaultInd == true) {
				value = options[i].value;
			}
		}
		value = false;
	}
	
	let switchOptions = [];
	
	for (let i = 0; i < options.length; i++) {
		let c = "btn ai-btn-radio btn-sm notActive";
		if (value == options[i].value) {
			c = "btn ai-btn-radio btn-sm active";
		}
		switchOptions.push(<a key={i} className={c} data-toggle={fieldName} data-title={options[i].label} onClick={onClick(fieldName,options[i].value)}>{options[i].label}</a>);
	}

	return (
		<div className="form-group">
        	<label htmlFor={fieldName} >{label}</label>
			<div className="input-group">
				<div id={name} className="btn-group">
					{switchOptions}
				</div>
				<input type="hidden" name={fieldName} id={fieldName}/>
			</div>
    	</div>
	);

};

Switch.propTypes = {
	name: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string,PropTypes.bool]),
	options: PropTypes.array,
	fieldName: PropTypes.string,
	label: PropTypes.string,
	onClick: PropTypes.func,
};

export default Switch;
