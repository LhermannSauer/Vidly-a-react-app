import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const {
      categories,
      onSelection,
      textProperty,
      selectedItem,
      valueProperty,
    } = this.props;

    return (
      <div className="list-group">
        <ul className="list-group">
          {categories.map((category) => (
            <li
              key={category[valueProperty]}
              onClick={() => onSelection(category)}
              className={
                category === selectedItem
                  ? "list-group-item active menuElement"
                  : "list-group-item menuElement"
              }
            >
              {category[textProperty]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
