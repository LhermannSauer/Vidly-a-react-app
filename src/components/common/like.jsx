import React, { Component } from "react";

class LikeButton extends Component {
  getIcon = () => {
    return this.props.isLiked
      ? "fa fa-heart clickable"
      : "fa fa-heart-o clickable";
  };

  render() {
    return (
      <i
        className={this.getIcon()}
        onClick={this.props.onClick}
        aria-hidden="true"
      />
    );
  }
}

export default LikeButton;
