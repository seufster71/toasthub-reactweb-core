import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ShowEntries from './show-entries';
import Search from './search';
import Pagination from './pagination';

const List = ({containerState, header, items, itemCount, columns, appPrefs, pageStart, pageLimit,
  onPageLimitChange, onSearchClick, onSearchChange, onPaginationClick, onFilterClick}) => {
  let listRows = [];
  let children = true;

  if (columns != null && columns.length > 0) {
    let headerCell = [];
      if (children == true){
        headerCell.push(<div key={0} scope="col"/>);
      }
    for (let c = 0; c < columns.length; c++) {
      let sortOption = <i className="fa fa-unsorted" onClick={onFilterClick(columns[c].name)} />;
      if (containerState != null && containerState.orderCriteria != null) {
        let orderCriteria = containerState.orderCriteria;
        for(let o = 0; o < orderCriteria.length; o++) {
          if (orderCriteria[o].orderColumn == columns[c].name) {
            if (orderCriteria.orderDir == "DESC") {
              sortOption = <i className="fa fa-sort-alpha-desc" onClick={onFilterClick(columns[c].name)} />;
            } else {
              sortOption = <i className="fa fa-sort-alpha-asc" onClick={onFilterClick(columns[c].name)} />;
            }
          }
        }
      }

      headerCell.push(<div key={columns[c].id} scope="col">{columns[c].value} {sortOption}</div>);
    }
    listRows.push(<li>{headerCell}</li>);
  }
  if (items != null && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      let cells = [];
      cells.push(<div key={0} scope="row"><i className="fa fa-chevron-right" onClick={onFilterClick(items[i].name)} /></div>);
      for (let c = 0; c < columns.length; c++) {
        if (columns[c].optionalParams != null) {
          let opt = JSON.parse(columns[c].optionalParams);
          let value = "";
          if (opt.field != null) {
            value = items[i][opt.field];
          } else if (opt.fieldML != null) {
            value = items[i][opt.fieldML].defaultText;
          } else if (opt.fieldBool != null) {
            if (items[i][opt.fieldBool] == true) {
              value = "Active";
            }
          }
          cells.push(<div key={columns[c].id}>{value}</div>);
        } else {
          cells.push(<div key={columns[c].id}/>);
        }
      }
      listRows.push(<li key={items[i].id} >{cells}</li>);
    }
  } else {
    listRows.push(<li key="1"><div id={appPrefs.appTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.name}> {appPrefs.appTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.value}</div></li>);
  }


  return (
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div className="x_panel">
          <div className="x_title">
            {header.value}
            <ul className="navbar-right panel_toolbox">
              <li><a className="collapse-link"><i className="fa fa-filter"/></a>
              </li>
              <li><a className="collapse-link"><i className="fa fa-wrench"/></a>
              </li>
            </ul>
          </div>
          <div className="x_content">
            <div className="row">
              <ShowEntries name={containerState.pageName+"_PAGELIMIT"} appPrefs={appPrefs} onPageLimitChange={onPageLimitChange}/>
              <Search name={containerState.pageName+"_SEARCH"} onChange={onSearchChange} onClick={onSearchClick} />
            </div>
            <ul className="list-table table-striped">
              {listRows}
            </ul>
            <Pagination currentSegment={containerState[containerState.pageName+"_PAGINATION"]} appPrefs={appPrefs} itemCount={itemCount} pageStart={pageStart} pageLimit={pageLimit} onClick={onPaginationClick}/>
          </div>
        </div>
        <div id="filterModal" className="modal fade" role="dialog" aria-labelledby="basicModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"/></button>
                <h4 className="modal-title">Modal title</h4>
              </div>
              <div className="modal-body">
                <h3>Modal Body <i className="fa fa-cog fa-spin fa-3x fa-fw"/></h3>
              </div>
              <div className="modal-footer">
                <h3>Footer</h3>
              </div>
            </div>
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
