import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';


class StatusView extends Component {
    constructor(props) {
      super(props);
    }

    componentDidUpdate() {
      window.scrollTo(0,0);
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
      }
      return (
        <div> {items} </div>
      );

    }

}

StatusView.propTypes = {
  appGlobal: PropTypes.object,
  error: PropTypes.array,
  info: PropTypes.array,
  warn: PropTypes.array,
  lang: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {lang:state.appPrefs.lang, appGlobal:state.appPrefs.appGlobal, error:state.status.error, info:state.status.info, warn:state.status.warn};
}


export default connect(mapStateToProps)(StatusView);
