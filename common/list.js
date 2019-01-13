import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ShowEntries from './show-entries';
import Search from './search';
import Pagination from './pagination';

const List = ({containerState, header, items, itemCount, columns, appPrefs, pageStart, pageLimit,
  onPageLimitChange, onSearchClick, onSearchChange, onPaginationClick, onFilterClick}) => {

  return (
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div className="x_panel">
          <div className="x_title">
            {header}
            <ul className="navbar-right panel_toolbox">
              <li><a className="collapse-link"><i className="fa fa-filter" onClick={onFilterClick()}/></a>
              </li>
              <li><a className="collapse-link"><i className="fa fa-plus"/></a>
              </li>
            </ul>
          </div>
          <div className="x_content">
            <ul className="list-group list-unstyled list-group-striped">
              {items}
            </ul>
            <Pagination currentSegment={containerState[containerState.pageName+"_PAGINATION"]} appPrefs={appPrefs} itemCount={itemCount} pageStart={pageStart} pageLimit={pageLimit} onClick={onPaginationClick}/>
          </div>
        </div>
      </div>
  );
};

List.propTypes = {
  containerState: PropTypes.object,
  header: PropTypes.object,
  items: PropTypes.array,
  itemCount: PropTypes.number,
  pageStart: PropTypes.number,
  pageLimit: PropTypes.number,
  columns: PropTypes.array,
  appPrefs: PropTypes.object,
  onPageLimitChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSearchClick: PropTypes.func,
  onPaginationClick: PropTypes.func,
  onFilterClick: PropTypes.func
};

export default List;
