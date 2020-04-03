import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as statusActions from '../../core/status/status-actions';
import {bindActionCreators} from 'redux';

import {connect} from 'react-redux';


class StatusView extends Component {
    constructor(props) {
    	super(props);
    	this.clearStatus = this.clearStatus.bind(this);
    }

    componentDidUpdate() {
    	window.scrollTo(0,0);
    }

    clearStatus() {
    	this.props.actions.clearStatus();
    }
    render() {
    	let items = [];
    	if (this.props.error != null ) {
    		for (let i = 0; i < this.props.error.length; i++) {
    			items.push(<div key={'error'+i} className="alert alert-danger" role="alert">
    				<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
    				<span className="sr-only">Error:</span>
    				{this.props.error[i].message}
    				</div>);
    		}
    	} else {
    		if (this.props.info != null) {
    			for (let i = 0; i < this.props.info.length; i++) {
    				items.push(<div key={'info-'+i} id={'info-'+i} className="alert alert-success" role="alert">
    				{this.props.info[i].message}</div>);
    			}
    		}
    		if (this.props.warn != null) {
    			for (let i = 0; i < this.props.warn.length; i++) {
    				items.push(<div key={'warn-'+i} id={'warn-'+i} className="alert alert-warning" role="alert">
    				{this.props.warn[i].message}</div>);
    			}
    		}
    		if (this.props.warn != null || this.props.info != null) {
    			setTimeout(() => {this.clearStatus();},5000);
    		}
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
  return {lang:state.appPrefs.lang, prefGlobal:state.appPrefs.prefGlobal, error:state.status.error, info:state.status.info, warn:state.status.warn};
}

function mapDispatchToProps(dispatch) {
  return { actions:bindActionCreators(statusActions,dispatch) };
}

export default connect(mapStateToProps,mapDispatchToProps)(StatusView);
