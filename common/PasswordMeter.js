import React from 'react';
import PropTypes from 'prop-types';

const PasswordMeter = ({name, alphaCheckCss, alphaCheckValue,
  capitalCheckCss, capitalCheckValue, numberCheckCss, numberCheckValue, specialCheckCss, specialCheckValue,
  countCheckCss, countCheckValue }) => {
  let wrapperCss = 'form-group';
  let wrapperId = name.concat('-PASSWORD_CHART_WRAP');
  let alphaCheckTxt = '';
  if (alphaCheckValue != null ) {
    alphaCheckTxt = <div className={alphaCheckCss} >{alphaCheckValue} </div>;
  }
  let capitalCheckTxt = '';
  if (capitalCheckValue != null) {
    capitalCheckTxt = <div className={capitalCheckCss} >{capitalCheckValue} </div>;
  }
  let numberCheckTxt = '';
  if (numberCheckValue != null) {
    numberCheckTxt = <div className={numberCheckCss} >{numberCheckValue} </div>;
  }
  let specialCheckTxt = '';
  if (specialCheckValue != null) {
    specialCheckTxt = <div className={specialCheckCss} >{specialCheckValue} </div>;
  }
  let countCheckTxt = '';
  if (countCheckValue != null) {
    countCheckTxt = <div className={countCheckCss} >{countCheckValue} </div>;
  }

  return (
    <div id={wrapperId} >
      <div className="row">
        {alphaCheckTxt}
        {capitalCheckTxt}
        {numberCheckTxt}
        {specialCheckTxt}
        {countCheckTxt}
      </div>
    </div>
  );
};

PasswordMeter.propTypes = {
  name: PropTypes.string.isRequired,
  alphaCheckCss: PropTypes.string,
  alphaCheckValue: PropTypes.string,
  capitalCheckCss: PropTypes.string,
  capitalCheckValue: PropTypes.string,
  numberCheckCss: PropTypes.string,
  numberCheckValue: PropTypes.string,
  specialCheckCss: PropTypes.string,
  specialCheckValue: PropTypes.string,
  countCheckCss: PropTypes.string,
  countCheckValue: PropTypes.string
};

export default PasswordMeter;
