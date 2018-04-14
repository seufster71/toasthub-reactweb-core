import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class LoadingView extends Component {
    constructor(props) {
      super(props);
    }

    componentDidUpdate() {
      window.scrollTo(0,0);
    }

    render() {

      return (
        <div> Loading.... </div>
      );

    }

}

LoadingView.propTypes = {
  appGlobal: PropTypes.object,
  lang: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {lang:state.appPrefs.lang, appGlobal:state.appPrefs.appGlobal};
}

export default connect(mapStateToProps)(LoadingView);
