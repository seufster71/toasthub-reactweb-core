import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';


class StatusContainer extends Component {
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
          items.push(<div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"/>
            <span className="sr-only">Error:</span>
            {this.props.error[i].message}
            </div>);
        }
      } else if (this.props.info != null) {
        items.push(<div>Got info</div>);
      } else if (this.props.warn != null) {
        items.push(<div>Got warn</div>);
      }
      return (
        <div> {items} </div>
      );

    }

}

StatusContainer.propTypes = {
  appGlobal: PropTypes.object,
  error: PropTypes.array,
  info: PropTypes.array,
  warn: PropTypes.array,
  lang: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {lang:state.appPrefs.lang, appGlobal:state.appPrefs.appGlobal, error:state.status.error, info:state.status.info, warn:state.status.warn};
}


export default connect(mapStateToProps)(StatusContainer);
