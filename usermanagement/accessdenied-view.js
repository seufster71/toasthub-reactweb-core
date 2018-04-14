import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default function AccessDeniedView({currentState, fields, texts, labels}) {


    return (
      <div>
        <div> AccessDenied Page </div>
      </div>
    );
}


AccessDeniedView.propTypes = {
  currentState: PropTypes.object,
	fields: PropTypes.object,
  texts: PropTypes.object,
  labels: PropTypes.object
};
