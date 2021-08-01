import React, { Component } from "react";
import Counters from "../counters";
import CounterNavBar from "./counterNavBar";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 3 },
      { id: 4, value: 0 },
      { id: 5, value: 4 },
      { id: 6, value: 7 },
    ],

    sumCounters: () =>
      this.state.counters.reduce((sum, counter) => sum + counter.value, 0),
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = counter;
    counters[index].value--;
    this.setState({ counters });
  };

  render() {
    return (
      <React.Fragment>
        <CounterNavBar
          countersCount={
            this.state.counters.filter((c) => c.value !== 0).length
          }
        />
        <main role="main" className="container">
          <Counters
            counters={this.state.counters}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onReset={this.handleReset}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
