import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ShowEntries from './show-entries';
import Search from './search';
import Pagination from './pagination';
import moment from 'moment';

const Table = ({containerState, header, items, itemCount, columns, appPrefs, listStart, listLimit, parent,
	onListLimitChange, onSearchClick, onSearchChange, onPaginationClick, onColumnSort, onHeader, onOption1, onOption2, onOption3, onOption4, onOption5, onOption6}) => {
		
	let parentName = "";
	if (parent != null) {
		parentName = parent;
	}
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
			let sortOption = "";
			if (columns[c].value != "") {
				sortOption = <i className="fa fa-unsorted" onClick={onColumnSort(columns[c].name)} />;
				if (containerState != null && containerState.orderCriteria != null) {
					let orderCriteria = containerState.orderCriteria;
					for(let o = 0; o < orderCriteria.length; o++) {
						if (orderCriteria[o].orderColumn == columns[c].name) {
							if (orderCriteria.orderDir == "DESC") {
								sortOption = <i className="fa fa-sort-alpha-desc" onClick={onColumnSort(columns[c].name)} />;
							} else {
								sortOption = <i className="fa fa-sort-alpha-asc" onClick={onColumnSort(columns[c].name)} />;
							}
						}
					}
				}
			}
			tableHeaders.push(<th key={columns[c].id} scope="col">{columns[c].value} {sortOption}</th>);
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
							value = "Active";
						} else {
							value = "Disabled";
						}
					} else if (opt.fieldIcon != null) {
						value = [];
						for(let j = 0; j < opt.fieldIcon.length; j++) {
							if (opt.fieldIcon[j].icon == "option1" && onOption1 != null) {
								value.push(<i key={j} className={opt.fieldIcon[j].classField} title={opt.fieldIcon[j].label.en} onClick={onOption1(items[i])} aria-hidden="true"/>);
							}
							if (opt.fieldIcon[j].icon == "option2" && onOption2 != null) {
								value.push(<i key={j} className={opt.fieldIcon[j].classField} title={opt.fieldIcon[j].label.en} onClick={onOption2(items[i])} aria-hidden="true"/>);
							}
							if (opt.fieldIcon[j].icon == "option3" && onOption3 != null) {
								value.push(<i key={j} className={opt.fieldIcon[j].classField} title={opt.fieldIcon[j].label.en} onClick={onOption3(items[i])} aria-hidden="true"/>);
							}
							if (opt.fieldIcon[j].icon == "option4" && onOption4 != null) {
								value.push(<i key={j} className={opt.fieldIcon[j].classField} title={opt.fieldIcon[j].label.en} onClick={onOption4(items[i])} aria-hidden="true"/>);
							}
							if (opt.fieldIcon[j].icon == "option5" && onOption5 != null) {
								value.push(<i key={j} className={opt.fieldIcon[j].classField} title={opt.fieldIcon[j].label.en} onClick={onOption5(items[i])} aria-hidden="true"/>);
							}
							if (opt.fieldIcon[j].icon == "option6" && onOption6 != null) {
								value.push(<i key={j} className={opt.fieldIcon[j].classField} title={opt.fieldIcon[j].label.en} onClick={onOption6(items[i])} aria-hidden="true"/>);
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
					cells.push(
							<td key={columns[c].id}>{value}</td>
					);
				} else {
					cells.push(
						<td key={columns[c].id}/>
					);
				}
			}
			tableRows.push(
				<tr key={items[i].id} >{cells}</tr>
			);
		}
	} else {
		tableRows.push(<tr key="1"><td id={appPrefs.appTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.name}> {appPrefs.appTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.value}</td></tr>);
	}
	let tableBody = <tbody>{tableRows}</tbody>;

	return (
		<div className="col-md-12 col-sm-12 col-xs-12">
			<div className="x_panel">
				<div className="x_title">
					{header}{parentName}
					<ul className="navbar-right panel_toolbox">
						<li><i className="fa fa-plus" title="Add" onClick={onHeader()}/></li>
					</ul>
				</div>
				<div className="x_content">
					<div className="row">
						<ShowEntries name={containerState.pageName+"_PAGELIMIT"} appPrefs={appPrefs} onListLimitChange={onListLimitChange}/>
						<Search name={containerState.pageName+"_SEARCH"} onChange={onSearchChange} onClick={onSearchClick} />
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
	containerState: PropTypes.object,
	header: PropTypes.string,
	items: PropTypes.array,
	itemCount: PropTypes.number,
	listStart: PropTypes.number,
	listLimit: PropTypes.number,
	parent: PropTypes.string,
	columns: PropTypes.array,
	appPrefs: PropTypes.object,
	onListLimitChange: PropTypes.func,
	onSearchChange: PropTypes.func,
	onSearchClick: PropTypes.func,
	onPaginationClick: PropTypes.func,
	onColumnSort: PropTypes.func,
	onHeader: PropTypes.func,
	onOption1: PropTypes.func,
	onOption2: PropTypes.func,
	onOption3: PropTypes.func,
	onOption4: PropTypes.func,
	onOption5: PropTypes.func,
	onOption6: PropTypes.func,
	onEditRole: PropTypes.func
};

export default Table;
