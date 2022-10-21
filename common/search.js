import React from 'react';
import PropTypes from 'prop-types';


const Search = ({id, label, onChange, onClick, onBlur, placeHolder, value, error, buttonClassName}) => {
	let wrapperClass = 'form-group';
	if (buttonClassName == null) {
		buttonClassName = "input-group-addon";
	}
	if (placeHolder == null){
		placeHolder = "Search"
	}
	return (
		<div className="col-xs-12 col-md-3">
        	<div className="input-group">
        		<input className="form-control" type="text" id={id+"-SEARCH"} name={id+"-SEARCH"} placeholder={placeHolder} aria-label="Search" onKeyPress={(e) => onChange(id+"-SEARCH",e)} onChange={(e) => onChange(id+"-SEARCH",e)}/>
        		<span key={id} id={id+"-SEARCH-BUTTON"} name={id+"-SEARCH-BUTTON"} value={value} onClick={() => onClick(id+"-SEARCH")} className={buttonClassName}><i className="fa-solid fa-search thub-1" aria-hidden="true"></i></span>
        	</div>
        </div>
	);
};

Search.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	onBlur: PropTypes.func,
	placeHolder: PropTypes.string,
	value: PropTypes.string,
	error: PropTypes.string,
	buttonClassName: PropTypes.string
};

export default Search;
