import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ShowEntries from './show-entries';
import Search from './search';
import Pagination from './pagination';

const List = ({containerState, header, listRows, itemCount, appPrefs, listStart, listLimit,
	onListLimitChange, onSearchClick, onSearchChange, onPaginationClick, onFilterClick, onHeader, striped}) => {

	let classListGroup = "list-group list-unstyled";	
	if (striped == true) {
		classListGroup = "list-group list-unstyled list-group-striped";
	}
	 
	return (
		<div className="col-md-12 col-sm-12 col-xs-12">
        	<div className="x_panel">
        		<div className="x_title">
        			{header}
        			<ul className="navbar-right panel_toolbox">
        				<li><i className="fa fa-plus" title="Add" onClick={onHeader()}/></li>
        			</ul>
          </div>
          <div className="x_content">
          	<div className="row">
          		<ShowEntries name={containerState.pageName+"_PAGELIMIT"} appPrefs={appPrefs} listLimit={listLimit} onListLimitChange={onListLimitChange}/>
          		<Search name={containerState.pageName+"_SEARCH"} onChange={onSearchChange} onClick={onSearchClick} />
          	</div>
          		<br/>
            <ul className={classListGroup}>
              {listRows}
            </ul>
            <Pagination currentSegment={containerState[containerState.pageName+"_PAGINATION"]} appPrefs={appPrefs} itemCount={itemCount} listStart={listStart} listLimit={listLimit} onClick={onPaginationClick}/>
          </div>
        </div>
      </div>
	);
};

List.propTypes = {
  containerState: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  listRows: PropTypes.array.isRequired,
  itemCount: PropTypes.number.isRequired,
  listStart: PropTypes.number.isRequired,
  listLimit: PropTypes.number.isRequired,
  appPrefs: PropTypes.object,
  onListLimitChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSearchClick: PropTypes.func,
  onPaginationClick: PropTypes.func,
  onFilterClick: PropTypes.func,
  onHeader: PropTypes.func,
  striped: PropTypes.bool
};

export default List;
