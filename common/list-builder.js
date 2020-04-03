import React from 'react';
import PropTypes from 'prop-types';
import List from '../../coreView/common/list';
import moment from 'moment';

const ListBuilder = ({containerState, header, items, itemCount, columns, appPrefs, listStart, listLimit, parent,
	onListLimitChange, onSearchClick, onSearchChange, onPaginationClick, onOrderBy, onHeader, onOption1, onOption2, 
	onOption3, onOption4, onOption5, onOption6, goBack, orderCriteria, searchCriteria}) => {
	let striped = true;
	let parentName = "";
	if (parent != null) {
		parentName = parent;
	}
	let tableHeader = "";
	let tableRows = [];
	
	let parentReturn = "";
	if (goBack != null && parent != null) {
		parentReturn = <i className="fa fa-arrow-circle-left" title="Go Back" onClick={goBack()} aria-hidden="true"></i>;
	}
	
	let listRows = [];
	// fill list
	if (items != null && items.length > 0) {
		let even = true;
	    for (let i = 0; i < items.length; i++) {
	    	let cells = [];
	    	let lines = [];
	    	for (let c = 0; c < columns.length; c++) {
				if (columns[c].optionalParams != null) {
					let opt = JSON.parse(columns[c].optionalParams);
					let value = "";
					let label = columns[c].value;
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
					lines.push(
							<div key={columns[c].id}>{label}: {value}</div>
					);
				} else {
					lines.push(
						<div key={columns[c].id}> no data</div>
					);
				}
			}
	    	
	    	
	    	let active = "Disabled";
	    	if (items[i].active == true) {
	    		active = "Active";
	    	}
	    	let created = "";
	    	if (items[i].created != null) {
	    		created = new Intl.DateTimeFormat('en-US', {
		          year: 'numeric',
		          month: 'short',
		          day: 'numeric',
		          hour: 'numeric',
		          minute: 'numeric',
		          second: 'numeric',
		          timeZone: 'America/New_York'
	    		}).format(moment(items[i].created).toDate());
	    	}
	    	let modified = "";
	    	if (items[i].modified != null) {
	    		modified = new Intl.DateTimeFormat('en-US', {
		          year: 'numeric',
		          month: 'short',
		          day: 'numeric',
		          hour: 'numeric',
		          minute: 'numeric',
		          second: 'numeric',
		          timeZone: 'America/New_York'
	    		}).format(moment(items[i].modified).toDate());
	    	}
	    	
	    	
	    	cells.push(
	    		<div key={0} >
		            <div className="row">
		              <div className="col-md-4">
		                {lines}
		              </div>
		            </div>
		        </div>
            );

	    	listRows.push(<li key={items[i].id} className="list-group-item">{cells}</li>);
	    	
	    }
  	} else {
	    listRows.push(<li key="1"><div id={appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.name}> {appPrefs.prefTexts.GLOBAL_PAGE.GLOBAL_PAGE_LIST_EMPTY.value}</div></li>);
  	}
	
	return (
		<List 
		containerState={containerState} 
		header={header} 
		listRows={listRows} 
		itemCount={itemCount} 
		appPrefs={appPrefs} 
		listStart={listStart} 
		listLimit={listLimit} 
		onListLimitChange={onListLimitChange} 
		onSearchClick={onSearchClick} 
		onSearchChange={onSearchChange} 
		onPaginationClick={onPaginationClick}
		onOrderBy={onOrderBy}
		onHeader={onHeader} 
		striped={striped} 
		orderCriteria={orderCriteria}
		searchCriteria={searchCriteria}
		columns={columns}
		/>
	);
};

ListBuilder.propTypes = {
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
	onOrderBy: PropTypes.func,
	onHeader: PropTypes.func,
	onOption1: PropTypes.func,
	onOption2: PropTypes.func,
	onOption3: PropTypes.func,
	onOption4: PropTypes.func,
	onOption5: PropTypes.func,
	onOption6: PropTypes.func,
	goBack: PropTypes.func,
	orderCriteria: PropTypes.array,
	searchCriteria: PropTypes.array
};

export default ListBuilder;
