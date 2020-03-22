import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ShowEntries from './show-entries';
import OrderBy from './order-by';
import SearchBy from './search-by';
import Search from './search';
import Pagination from './pagination';

const List = ({containerState, header, listRows, itemCount, appPrefs, listStart, listLimit, parent,
	onListLimitChange, onSearchClick, onSearchChange, onPaginationClick, onFilterClick, onHeader, onOrderBy, striped,
	orderCriteria, searchCriteria, columns}) => {

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
          		<ShowEntries name={containerState.pageName+"-LISTLIMIT"} appPrefs={appPrefs} listLimit={listLimit} onListLimitChange={onListLimitChange}/>
          		<OrderBy containerState={containerState} name={containerState.pageName+"-ORDERBY"} appPrefs={appPrefs} columns={columns} parent={parent} orderCriteria={orderCriteria} onChange={onOrderBy}/>
				<SearchBy containerState={containerState} name={containerState.pageName+"-SEARCHBY"} appPrefs={appPrefs} columns={columns} parent={parent} searchCriteria={searchCriteria} onChange={onSearchClick}/>
          		<Search name={containerState.pageName+"-SEARCH"} onChange={onSearchChange} onClick={onSearchClick} />
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
  header: PropTypes.string,
  listRows: PropTypes.array,
  itemCount: PropTypes.number,
  listStart: PropTypes.number,
  listLimit: PropTypes.number,
  appPrefs: PropTypes.object,
  parent: PropTypes.object,
  onListLimitChange: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSearchClick: PropTypes.func,
  onPaginationClick: PropTypes.func,
  onFilterClick: PropTypes.func,
  onHeader: PropTypes.func,
  onOrderBy: PropTypes.func,
  striped: PropTypes.bool,
  orderCriteria: PropTypes.array,
  searchCriteria: PropTypes.array,
  columns: PropTypes.array
};

export default List;
