import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { columns } = this.props;
    return (
      <thead className=" thead-light w-auto">
        <tr>
          {columns.map((c) => (
            <th
              key={c.inputValue || c.keyValue}
              onClick={() => this.raiseSort(c.inputValue)}
              className="clickable"
            >
              {c.textValue}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
