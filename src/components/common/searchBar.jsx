import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    search: "",
  };

  handleChange = ({ currentTarget: input }) => {
    let search = this.state.search;
    search = input.value;
    this.setState({ search });
    this.props.onSearch(search);
  };

  render() {
    return (
      <form className="form w-100">
        <input
          className="form-control mr-sm-2"
          value={this.state.search}
          type="search"
          placeholder="Search..."
          aria-label="Search"
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default SearchBar;
