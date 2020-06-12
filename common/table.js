import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ShowEntries from './show-entries';
import OrderBy from './order-by';
import Search from './search';
import SearchBy from './search-by';
import Pagination from './pagination';
import moment from 'moment';

const Table = ({containerState, header, items, itemCount, columns, labelGroup, appPrefs, listStart, listLimit, parent, onListLimitChange, onSearchClick, onSearchChange, 
	onPaginationClick, onOrderBy, onHeader, onOption, orderCriteria, searchCriteria}) => {
		
	
	let tableHeader = "";
	let tableRows = [];

	// Create headers
	if (columns != null && columns.length > 0) {
		let tableHeaders = [];
		//  tableHeaders.push(<th key={0} scope="col">#</th>);

		for (let c = 0; c < columns.length; c++) {
			if (columns[c].optionalParams != null) {
				let opt = JSON.parse(columns[c].optionalParams);
				if (opt.conditionParent != null && opt.conditionParent == "NotNull" && (parent == null || parent == "")) {
					continue;
				}
			}
			if (labelGroup != null && labelGroup != "" ) {
				if (columns[c].group == labelGroup) {
					tableHeaders.push(<th key={columns[c].id} scope="col">{columns[c].value}</th>);
				}
			} else {
				tableHeaders.push(<th key={columns[c].id} scope="col">{columns[c].value}</th>);
			}
		}
		tableHeader = <thead><tr>{tableHeaders}</tr></thead>;
	}
	
	// fill table
	if (items != null && items.length > 0) {
		for (let i = 0; i < items.length; i++) {
			let cells = [];
			//cells.push(<th key={0} scope="row">{i + 1}</th>);
			for (let c = 0; c < columns.length; c++) {
				if (columns[c].optionalParams != null) {
					let opt = JSON.parse(columns[c].optionalParams);
					let value = "";
					if (opt.conditionParent != null && opt.conditionParent == "NotNull" && (parent == null || parent == "")) {
						continue;
					}
					if (opt.field != null) {
						value = items[i][opt.field];
						if (opt.prefix != null) {
							value = opt.prefix + value;
						}
					} else if (opt.fieldML != null) {
						if (items[i][opt.fieldML].langTexts != null && items[i][opt.fieldML].langTexts.length > 0){
							let match = false;
							for(let j = 0; j < items[i][opt.fieldML].langTexts.length; j++) {
								if (items[i][opt.fieldML].langTexts[j].lang == appPrefs.lang) {
									value = items[i][opt.fieldML].langTexts[j].text;
									match = true;
									break;
								}
							}
							if (!match) {
								value = items[i][opt.fieldML].defaultText;
							}
						} else {
					    	value = items[i][opt.fieldML].defaultText;
					    }

					} else if (opt.fieldBool != null) {
						if (items[i][opt.fieldBool] == true) {
							if (opt.labelTrue != null && opt.labelTrue[appPrefs.lang] != null) {
								value = opt.labelTrue[appPrefs.lang];
							} else {
								value = opt.labelTrue.defaultText;
							}
						} else {
							if (opt.labelFalse != null && opt.labelFalse[appPrefs.lang] != null) {
								value = opt.labelFalse[appPrefs.lang];
							} else {
								value = opt.labelFalse.defaultText;
							}
						}
					} else if (opt.fieldIcon != null) {
						value = [];
						if (onOption != null) {
							for(let j = 0; j < opt.fieldIcon.length; j++) {
								value.push(<i key={j} className={opt.fieldIcon[j].classField} title={opt.fieldIcon[j].label.en} onClick={() => onOption(opt.fieldIcon[j].code,items[i])} aria-hidden="true"/>);
							}
						}
					} else if (opt.fieldObj != null){
						if (opt.fieldObj.fieldChild != null && opt.fieldObj.fieldChild.field != null) {
							if (items[i][opt.fieldObj.field] != null) {
								value = items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.field];
							}
						} else if (opt.fieldObj.fieldChild != null && opt.fieldObj.fieldChild.fieldDate != null) {
							if (items[i][opt.fieldObj.field] != null) {
								value = new Intl.DateTimeFormat('en-US',{
				            		year: 'numeric', month: 'numeric', day: 'numeric'
				            	}).format(moment(items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldDate]).toDate());
							}
						} else if (opt.fieldObj.fieldChild != null && opt.fieldObj.fieldChild.fieldBool != null) {
							if (items[i][opt.fieldObj.field] != null) {
								if (items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldBool] == true) {
									value = "Active";
								} else {
									value = "Disabled";
								}
							}
						} else if (opt.fieldObj.fieldChild != null && opt.fieldObj.fieldChild.fieldML != null) {
							if (items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].langTexts != null && items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].langTexts.length > 0){
								let match = false;
								for(let j = 0; j < items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].langTexts.length; j++) {
									if (items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].langTexts[j].lang == appPrefs.lang) {
										value = items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].langTexts[j].text;
										match = true;
										break;
									}
								}
								if (!match) {
									value = items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].defaultText;
								}
							} else {
								value = items[i][opt.fieldObj.field][opt.fieldObj.fieldChild.fieldML].defaultText;
							}
						} else {
							value = items[i][opt.fieldObj.field];
						}
					}
					if (labelGroup != null && labelGroup != "" ) {
						if (columns[c].group == labelGroup) {
							cells.push(
									<td key={columns[c].id}>{value}</td>
							);
						}
					} else {
						cells.push(
								<td key={columns[c].id}>{value}</td>
						);
					}
				} // for inner 
			} // for outer
			tableRows.push(
				<tr key={items[i].id} >{cells}</tr>
			);
		}
	} else {
		tableRows.push(<tr key="1"><td id={appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.name}> {appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.value}</td></tr>);
	}
	let tableBody = <tbody>{tableRows}</tbody>;

	return (
		<div className="col-md-12 col-sm-12 col-xs-12">
			<div className="x_panel">
				<div className="x_title">
					{header}
					<ul className="navbar-right panel_toolbox">
						<li><i className="fa fa-plus" title="Add" onClick={() => onOption("MODIFY")}/></li>
					</ul>
				</div>
				<div className="x_content">
					<div className="row">
						<ShowEntries name={containerState.pageName+"-LISTLIMIT"} appPrefs={appPrefs} listLimit={listLimit} onListLimitChange={onListLimitChange}/>
						<OrderBy containerState={containerState} name={containerState.pageName+"-ORDERBY"} appPrefs={appPrefs} columns={columns} parent={parent} orderCriteria={orderCriteria} onChange={onOrderBy}/>
						<SearchBy containerState={containerState} name={containerState.pageName+"-SEARCHBY"} appPrefs={appPrefs} columns={columns} parent={parent} searchCriteria={searchCriteria} onChange={onSearchClick}/>
						<Search name={containerState.pageName+"-SEARCH"} onChange={onSearchChange} onClick={onSearchClick} />
					</div>
					<table className="table table-striped">
						{tableHeader}
						{tableBody}
					</table>
					<Pagination currentSegment={containerState[containerState.pageName+"_PAGINATION"]} appPrefs={appPrefs} itemCount={itemCount} listStart={listStart} listLimit={listLimit} onClick={onPaginationClick}/>
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

Table.propTypes = {
	containerState: PropTypes.object.isRequired,
	header: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	items: PropTypes.array,
	itemCount: PropTypes.number,
	listStart: PropTypes.number,
	listLimit: PropTypes.number,
	parent: PropTypes.string,
	columns: PropTypes.array,
	labelGroup: PropTypes.string,
	appPrefs: PropTypes.object,
	onListLimitChange: PropTypes.func,
	onSearchChange: PropTypes.func,
	onSearchClick: PropTypes.func,
	onPaginationClick: PropTypes.func,
	onOrderBy: PropTypes.func,
	onHeader: PropTypes.func,
	onOption: PropTypes.func,
	orderCriteria: PropTypes.array,
	searchCriteria: PropTypes.array
};

export default Table;
