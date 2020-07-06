import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as statusActions from '../../core/status/status-actions';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';


class StatusView extends Component {
    constructor(props) {
    	super(props);
    }

    componentDidUpdate() {
    	window.scrollTo(0,0);
    }

    clearStatus = () => {
    	this.props.actions.clearStatus();
    }
    render() {
    	let items = [];
    	if (this.props.status.error != null ) {
    		for (let i = 0; i < this.props.status.error.length; i++) {
    			items.push(<div key={'error'+i} className="alert alert-danger" role="alert">
    				<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
    				<span className="sr-only">Error:</span>
    				{this.props.status.error[i].message}
    				</div>);
    		}
    	}
    	if (this.props.status.info != null) {
			for (let i = 0; i < this.props.status.info.length; i++) {
				items.push(<div key={'info-'+i} id={'info-'+i} className="alert alert-success" role="alert">
				{this.props.status.info[i].message}</div>);
			}
		}
		if (this.props.status.warn != null) {
			for (let i = 0; i < this.props.status.warn.length; i++) {
				items.push(<div key={'warn-'+i} id={'warn-'+i} className="alert alert-warning" role="alert">
				{this.props.status.warn[i].message}</div>);
			}
		}
		if (this.props.status.error != null || this.props.status.info != null || this.props.status.warn != null) {
			setTimeout(() => {this.clearStatus()},5000);
		}
    	
    	return (
    			<div className="toastHub-status"> {items} </div>
    	);

    }

}

StatusView.propTypes = {
  prefGlobal: PropTypes.object,
  error: PropTypes.array,
  info: PropTypes.array,
  warn: PropTypes.array,
  lang: PropTypes.string,
  actions: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {lang:state.appPrefs.lang, prefGlobal:state.appPrefs.prefGlobal, status:state.status};
}

function mapDispatchToProps(dispatch) {
  return { actions:bindActionCreators(statusActions,dispatch) };
}

export default connect(mapStateToProps,mapDispatchToProps)(StatusView);
