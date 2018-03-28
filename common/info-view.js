import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default function InfoView({message}) {


    return (
      <div>
        <div> {message} </div>
      </div>
    );
}


InfoView.propTypes = {
  message: PropTypes.string
};
