import React, {Component} from 'react';
import PropTypes from 'prop-types';

const Table = ({items, columns, onClick}) => {
  if (items != null && items.length > 0) {
    let header = "";
    let rows = [];

    if (columns != null && columns.length > 0) {
      let headers = [];
        headers.push(<th key={0} scope="col">#</th>);
      for (let c = 0; c < columns.length; c++) {
        headers.push(
          <th key={columns[c].id} scope="col">{columns[c].value}</th>
        );
      }
      header = <thead><tr>{headers}</tr></thead>;
    }

    for (let i = 0; i < items.length; i++) {
      let cells = [];
      cells.push(<th key={0} scope="row">{i}</th>);
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
          cells.push(
            <td key={columns[c].id}>{value}</td>
          );
        } else {
          cells.push(
            <td key={columns[c].id}/>
          );
        }
      }
      rows.push(
        <tr key={items[i].id} >{cells}</tr>
      );
    }
    let body = <tbody>{rows}</tbody>;

    return (
      <table className="table table-striped">
        {header}
        {body}
      </table>
    );
  } else {
    return (
      <div> No items </div>
    );
  }
};

Table.propTypes = {
  items: PropTypes.array,
  columns: PropTypes.array,
  onClick: PropTypes.func
};

export default Table;
