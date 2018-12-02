import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextInput from './text-input';
import Button from './button';


const Pagination = ({currentSegment, appPrefs, itemCount, pageStart, pageLimit, onClick, buttonClassName}) => {
  let wrapperClass = 'form-group';
  if (buttonClassName == null) {
    buttonClassName = "form-control btn";
  }
  if (itemCount < pageLimit) {
    pageLimit = itemCount;
  }
  let showEntries = appPrefs.appTexts.GLOBAL_PAGE.GLOBAL_PAGE_PAGING_SHOW_ENTRIES.value;
  showEntries = showEntries.replace('{pageStart}',pageStart + 1);
  showEntries = showEntries.replace('{pageLimit}',pageLimit);
  showEntries = showEntries.replace('{itemCount}',itemCount);

  let clickThrough = [];
  let segments = itemCount/pageLimit;
  if (currentSegment == null) {
    currentSegment = 1;
  }
  // previous
  clickThrough.push(<li key="GLOBAL_PAGE_PAGING_PREV" className="paginate_button previous disabled" id="datatable_previous"><a href="#" aria-controls="datatable" onClick={onClick("prev")} tabIndex="0">{appPrefs.appTexts.GLOBAL_PAGE.GLOBAL_PAGE_PAGING_PREV.value}</a></li>);
  // numbers
  let segmentClass = "paginate_button active";
  for (let c = 1; c <= segments; c++) {
    if (currentSegment == c) {
      segmentClass = "paginate_button active";
    } else {
      segmentClass = "paginate_button";
    }
    clickThrough.push(<li key={c} className={segmentClass} onClick={onClick(c)}><span >{c}</span></li>);
  }
  // next
  if (segments > 7) {
    clickThrough.push(<li key="GLOBAL_PAGE_PAGING_NEXT" className="paginate_button next" id="datatable_next"><a href="#" aria-controls="datatable" onClick={onClick("next")} tabIndex="0">{appPrefs.appTexts.GLOBAL_PAGE.GLOBAL_PAGE_PAGING_NEXT.value}</a></li>);
  }

  if (segments <= 1){
      return (
        <div className="row">
          <div className="col-sm-5">
            <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">{showEntries}</div>
          </div>
        </div>
      );
  } else {
    return (
      <div className="row">
        <div className="col-sm-5">
          <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">{showEntries}</div>
        </div>
        <div className="col-sm-7">
          <div className="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
            <ul className="pagination">
              {clickThrough}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

Pagination.propTypes = {
currentSegment: PropTypes.number,
appPrefs: PropTypes.object,
itemCount: PropTypes.number,
pageStart: PropTypes.number,
pageLimit: PropTypes.number,
onClick: PropTypes.func,
buttonClassName: PropTypes.string
};

export default Pagination;
