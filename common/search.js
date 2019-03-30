import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextInput from './text-input';
import Button from './button';


const Search = ({name, label, onChange, onClick, onBlur, placeHolder, value, error, buttonClassName}) => {
  let wrapperClass = 'form-group';
  if (buttonClassName == null) {
    buttonClassName = "form-control btn toasthub-btn-primary";
  }
  return (
    <div className="col-sm-6">
        <form id={name+'_form'}>
          <div className="col-xs-4">
            <TextInput id={name+'_input'} name={name+'_input'} placeHolder={placeHolder} onChange={onChange(name+'_input')} onBlur={onBlur}/>
          </div>
          <div className="col-xs-2">
            <Button key={name} id={name} name={name} value={value} onClick={onClick({name})} className={buttonClassName} />
          </div>
        </form>
    </div>
  );
};

Search.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  buttonClassName: PropTypes.string
};

export default Search;
