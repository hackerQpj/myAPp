import React, { Component } from "react";
class Test extends Component {
  state = {
    count: 1,
  };

  handleClick = () => {
    console.log("--before---", this.state.count); //1
    this.setState({ count: this.state.count + 1 }, () => {
      console.log("---middle---", this.state.count);
    });
    console.log("--after---", this.state.count); // 1

    // this.setState((prevState) => {
    //   return { count: prevState.count + 1 };
    // });
    // console.log(this.state.count); // 3
  };
  render() {
    return (
      <>
        <div>Count值:{this.state.count}</div>
        <button onClick={this.handleClick}>加1</button>
      </>
    );
  }
}

export default Test;
