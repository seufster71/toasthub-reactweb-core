import React from 'react';
import PropTypes from 'prop-types';
import * as actions from '../../core/status/status-actions';
import { useSelector, useDispatch } from 'react-redux';


export default function  StatusView() {
 	const itemState = useSelector((state) => state.pmproduct);
 	const dispatch = useDispatch();
 	
    const clearStatus = () => {
    	dispatch(actions.clearStatus());
    }

	let items = [];
	if (itemState.error != null ) {
		for (let i = 0; i < itemState.error.length; i++) {
			items.push(<div key={'error'+i} className="alert alert-danger" role="alert">
				<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
				<span className="sr-only">Error:</span>
				{itemState.error[i].message}
				</div>);
		}
	}
	if (itemState.info != null) {
		for (let i = 0; i < itemState.info.length; i++) {
			items.push(<div key={'info-'+i} id={'info-'+i} className="alert alert-success" role="alert">
			{itemState.info[i].message}</div>);
		}
	}
	if (itemState.warn != null) {
		for (let i = 0; i < itemState.warn.length; i++) {
			items.push(<div key={'warn-'+i} id={'warn-'+i} className="alert alert-warning" role="alert">
			{itemState.warn[i].message}</div>);
		}
	}
	if (itemState.error != null || itemState.info != null || itemState.warn != null) {
		setTimeout(() => {this.clearStatus()},5000);
	}
    	
	return (
			<div className="toastHub-status"> {items} </div>
	);

}

StatusView.propTypes = {
  prefGlobal: PropTypes.object,
  error: PropTypes.array,
  info: PropTypes.array,
  warn: PropTypes.array,
  lang: PropTypes.string,
  actions: PropTypes.object
};

