import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import Link from '../common/Link';
import PasswordMeter from '../common/PasswordMeter';

export default function Login({view, errorMap, fields, texts, labels, onChangeLogin,
  onChangeRegistration, fieldChangeEvent, onForgotPassword,
  fieldBlurEvent, buttonClick}) {

  let items = [];
  let headers = [];
  let formId = "login-form";
  let loginActive = "";
  let regActive = "";
  let forgotActive = "";
  let loginTexts = texts.LOGIN_FORM;
  let registrationTexts = texts.REGISTRATION_FORM;
  let forgotTexts = texts.FORGOTPASSWORD_FORM;
  if (view === 'login') {
    loginActive = "active";
    // LOGIN_FORM
    // fields
    let loginFields = fields.LOGIN_FORM;
    let loginLabels = labels.LOGIN_FORM;
    for (let i = 0; i < loginFields.length; i++) {
      if (loginFields[i].fieldType === "TXT") {
        items.push(<TextInput
          key={'LOGIN_FORM-'+loginFields[i].name}
          id={'LOGIN_FORM-'+loginFields[i].name}
          name={'LOGIN_FORM-'+loginFields[i].name}
          placeHolder={loginFields[i].label}
          inputType={loginFields[i].htmlType}
          onBlur={fieldBlurEvent}/>);
      }
    }
    // buttons
    for (let l = 0; l < loginLabels.length; l++) {
      if (loginLabels[l].rendered) {
        items.push(<Button
          key={loginLabels[l].name}
          id={loginLabels[l].name}
          name={loginLabels[l].name}
          value={loginLabels[l].value}
          onClick={buttonClick}
          className="form-control"/>);
      }
    }

    // Forgot Password
    items.push(<Link
      key={loginTexts.LOGIN_FORM_FORGOT_PASSWORD.name}
      id={loginTexts.LOGIN_FORM_FORGOT_PASSWORD.name}
      name={loginTexts.LOGIN_FORM_FORGOT_PASSWORD.name}
      label={loginTexts.LOGIN_FORM_FORGOT_PASSWORD.value}
      onClick={onForgotPassword}/>);

    headers.push(<div key={loginTexts.LOGIN_FORM_HEADER.name} className="col-xs-6"><a href="#" className={loginActive} onClick={onChangeLogin} id={loginTexts.LOGIN_FORM_HEADER.name}>{loginTexts.LOGIN_FORM_HEADER.value}</a></div>);
    headers.push(<div key={registrationTexts.REGISTRATION_FORM_HEADER.name} className="col-xs-6"><a href="#" className={regActive} onClick={onChangeRegistration}  id={registrationTexts.REGISTRATION_FORM_HEADER.name}>{registrationTexts.REGISTRATION_FORM_HEADER.value}</a></div>);
  } else if (view === 'forgotPassword') {
    // FORGOT_PASSWORD_FORM
    forgotActive = "active";
    // fields test
    let forgotFields = fields.FORGOTPASSWORD_FORM;
    let forgotLabels = labels.FORGOTPASSWORD_FORM;
    if (forgotFields != null && forgotLabels != null) {
      for (let i = 0; i < forgotFields.length; i++) {
        if (forgotFields[i].fieldType === "TXT") {
          items.push(<TextInput
            key={'FORGOTPASSWORD_FORM-'+forgotFields[i].name}
            id={'FORGOTPASSWORD_FORM-'+forgotFields[i].name}
            name={'FORGOTPASSWORD_FORM-'+forgotFields[i].name}
            placeHolder={forgotFields[i].label}
            inputType={forgotFields[i].htmlType}
            onBlur={fieldBlurEvent}/>);
        }
      }
      // buttons
      for (let l = 0; l < forgotLabels.length; l++) {
        if (forgotLabels[l].rendered) {
          items.push(<Button
            key={forgotLabels[l].name}
            id={forgotLabels[l].name}
            name={forgotLabels[l].name}
            value={forgotLabels[l].value}
            onClick={buttonClick}
            className="form-control"/>);
        }
      }
    }
    headers.push(<div key={loginTexts.LOGIN_FORM_HEADER.name} className="col-xs-6"><a href="#" className={loginActive} onClick={onChangeLogin} id={loginTexts.LOGIN_FORM_HEADER.name}>{loginTexts.LOGIN_FORM_HEADER.value}</a></div>);
    headers.push(<div key={forgotTexts.FORGOTPASSWORD_FORM_HEADER.name} className="col-xs-6"><a href="#" className={forgotActive} onClick={onChangeLogin} id={forgotTexts.FORGOTPASSWORD_FORM_HEADER.name}>{forgotTexts.FORGOTPASSWORD_FORM_HEADER.value}</a></div>);
  } else {
    // REGISTRATION_FORM
    // fields
    regActive = "active";
    formId = "registration-form";
    let registrationFields = fields.REGISTRATION_FORM;

    let registrationLabels = labels.REGISTRATION_FORM;
    for (let f = 0; f < registrationFields.length; f++) {
      if (registrationFields[f].fieldType === "TXT") {
        items.push(<TextInput
          key={'REGISTRATION_FORM-'+registrationFields[f].name}
          id={'REGISTRATION_FORM-'+registrationFields[f].name}
          name={'REGISTRATION_FORM-'+registrationFields[f].name}
          placeHolder={registrationFields[f].label}
          inputType={registrationFields[f].htmlType}
          error={errorMap[registrationFields[f].name]}
          onBlur={fieldBlurEvent}/>);
      }
      if (registrationFields[f].htmlType === "password") {
        if (registrationFields[f].optionalParams == null) {
          let alphaCheckCss = "text-success";
          if (errorMap.REGISTRATION_FORM_ALPHA_CHECK != null && errorMap.REGISTRATION_FORM_ALPHA_CHECK === "ERROR"){
            alphaCheckCss = "text-danger";
          }
          let capitalCheckCss = "text-success";
          if (errorMap.REGISTRATION_FORM_CAPITAL_CHECK != null && errorMap.REGISTRATION_FORM_CAPITAL_CHECK === "ERROR"){
            capitalCheckCss = "text-danger";
          }
          let numberCheckCss = "text-success";
          if (errorMap.REGISTRATION_FORM_NUMBER_CHECK != null && errorMap.REGISTRATION_FORM_NUMBER_CHECK === "ERROR"){
            numberCheckCss = "text-danger";
          }
          let specialCheckCss = "text-success";
          if (errorMap.REGISTRATION_FORM_SPECIAL_CHECK != null && errorMap.REGISTRATION_FORM_SPECIAL_CHECK === "ERROR"){
            specialCheckCss = "text-danger";
          }
          let countCheckCss = "text-success";
          if (errorMap.REGISTRATION_FORM_COUNT_CHECK != null && errorMap.REGISTRATION_FORM_COUNT_CHECK === "ERROR"){
            countCheckCss = "text-danger";
          }
          // show password requirements
          items.push(<PasswordMeter
            key="{registrationFields[f].name}-METER"
            name={registrationFields[f].name}
            alphaCheckCss={alphaCheckCss}
            alphaCheckValue={registrationTexts.REGISTRATION_FORM_ALPHA_CHECK.value}
            capitalCheckCss={capitalCheckCss}
            capitalCheckValue={registrationTexts.REGISTRATION_FORM_CAPITAL_CHECK.value}
            numberCheckCss={numberCheckCss}
            numberCheckValue={registrationTexts.REGISTRATION_FORM_NUMBER_CHECK.value}
            specialCheckCss={specialCheckCss}
            specialCheckValue={registrationTexts.REGISTRATION_FORM_SPECIAL_CHECK.value}
            countCheckCss={countCheckCss}
            countCheckValue={registrationTexts.REGISTRATION_FORM_COUNT_CHECK.value} />);
        } else if (registrationFields[f].optionalParams != null) {
          // show password check match
        }
      }
    }
    // buttons
    for (let g = 0; g < registrationLabels.length; g++) {
      if (registrationLabels[g].rendered) {
        items.push(<Button
          key={registrationLabels[g].name}
          id={registrationLabels[g].name}
          name={registrationLabels[g].name}
          value={registrationLabels[g].value}
          onClick={buttonClick}
          className="form-control"/>);
      }
    }
    headers.push(<div key={loginTexts.LOGIN_FORM_HEADER.name} className="col-xs-6"><a href="#" className={loginActive} onClick={onChangeLogin} id={loginTexts.LOGIN_FORM_HEADER.name}>{loginTexts.LOGIN_FORM_HEADER.value}</a></div>);
    headers.push(<div key={registrationTexts.REGISTRATION_FORM_HEADER.name} className="col-xs-6"><a href="#" className={regActive} onClick={onChangeRegistration}  id={registrationTexts.REGISTRATION_FORM_HEADER.name}>{registrationTexts.REGISTRATION_FORM_HEADER.value}</a></div>);

  }

  return (
    <header>
      <div className="intro-text">
        <div className="row">
          <div id="content_column" className="col-md-6 col-md-offset-3">
            <div className="panel panel-login">
              <div className="panel-heading">
                <div className="row">
                  {headers}
                </div>
              </div>
            </div>
            <div id="login-status" role="alert" />
            <div className="panel-body panel-body-login">
              <div className="row">
                <div className="col-lg-12">
                  <form id={formId} >
                    {items}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

  );
}

Login.propTypes = {
  view: PropTypes.string.isRequired,
  errorMap: PropTypes.object,
	fields: PropTypes.object.isRequired,
  texts: PropTypes.object,
  labels: PropTypes.object,
  onChangeLogin: PropTypes.func,
  onChangeRegistration: PropTypes.func,
  onForgotPassword: PropTypes.func,
  fieldChangeEvent: PropTypes.func,
  fieldBlurEvent: PropTypes.func,
  buttonClick: PropTypes.func
};
