import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ShowEntries = ({name, appPrefs, onPageLimitChange}) => {
  let options = [];
  if(appPrefs.appOptions.GLOBAL_PAGE != null && appPrefs.appOptions.GLOBAL_PAGE.GLOBAL_PAGE_PAGELIMIT_SELECT != null) {
    let pageLimitSelect = appPrefs.appOptions.GLOBAL_PAGE.GLOBAL_PAGE_PAGELIMIT_SELECT.value;
    if (pageLimitSelect != "") {
      let items = JSON.parse(pageLimitSelect);
      for (let i = 0; i < items.length; i++) {
        options.push(<option key={i} value={items[i].k}>{items[i].v}</option>);
      }
    }
  }


  return (
      <div className="col-sm-6">
        <div className="dataTables_length" id="datatable_length">
          <label>Show <select name={name} aria-controls="datatable" className="form-control input-sm" onChange={onPageLimitChange(name)} >
              {options}
            </select> entries </label>
        </div>
      </div>
  );
};

ShowEntries.propTypes = {
  name: PropTypes.string.isRequired,
  appPrefs: PropTypes.object.isRequired,
  onPageLimitChange: PropTypes.func
};

export default ShowEntries;
