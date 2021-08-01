import React, { Component } from "react";
//import { Link } from "react-router-dom";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.inputValue);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id} className=" align-items-lg-center">
            {columns.map((c) => (
              <td>{this.renderCell(item, c)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
