import React, { Component } from "react";
import Counter from "./Counter/counter";

class Counters extends Component {
  render() {
    const { onReset, counters, onIncrement, onDelete, onDecrement } =
      this.props;

    return (
      <div>
        <button onClick={onReset} className="btn-sm btn-primary btn">
          Reset
        </button>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            onDelete={onDelete}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            counter={counter}
          />
        ))}
      </div>
    );
  }
}

export default Counters;
