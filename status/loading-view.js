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
  prefGlobal: PropTypes.object,
  lang: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {lang:state.appPrefs.lang, prefGlobal:state.appPrefs.prefGlobal};
}

export default connect(mapStateToProps)(LoadingView);
