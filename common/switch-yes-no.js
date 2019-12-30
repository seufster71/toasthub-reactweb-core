import React from 'react';
import PropTypes from 'prop-types';

const SwitchYesNo = ({name, indicatorValue, fieldName, label, onClick}) => {
	let wrapperClass = 'form-group text-center';

  
	if (indicatorValue == true) {
		return (
			<div className="form-group">
	        	<label htmlFor={fieldName} >{label}</label>
    			<div className="input-group">
    				<div id={name} className="btn-group">
    					<a key="1" className="btn ai-btn-radio btn-sm active" data-toggle={fieldName} data-title="Y" onClick={onClick(fieldName,'Y')}>YES</a>
    					<a key="2" className="btn ai-btn-radio btn-sm notActive" data-toggle={fieldName} data-title="N" onClick={onClick(fieldName,'N')}>NO</a>
    				</div>
    				<input type="hidden" name={fieldName} id={fieldName}/>
    			</div>
	    	</div>
		);
	} else {
		return (
			<div className="form-group">
	        	<label htmlFor={fieldName} >{label}</label>
    			<div className="input-group">
    				<div id={name} className="btn-group">
    					<a key="1" className="btn ai-btn-radio btn-sm notActive" data-toggle={fieldName} data-title="Y" onClick={onClick(fieldName,'Y')}>YES</a>
						<a key="2" className="btn ai-btn-radio btn-sm active" data-toggle={fieldName} data-title="N" onClick={onClick(fieldName,'N')}>NO</a>
					</div>
	    			<input type="hidden" name={fieldName} id={fieldName}/>
	    		</div>
	    	</div>
		);
	}
};

SwitchYesNo.propTypes = {
	name: PropTypes.string,
	indicatorValue: PropTypes.bool,
	fieldName: PropTypes.string,
	label: PropTypes.string,
	onClick: PropTypes.func,
};

export default SwitchYesNo;
