import React, { Component } from "react";
import TableHeader from "./tableHead";
import TableBody from "./tableBody";

class Table extends Component {
  render() {
    const { data, columns, sortColumn, onSort } = this.props;

    return (
      <table className="table table-light table-bordered mt-5">
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody data={data} columns={columns} />
      </table>
    );
  }
}

export default Table;
