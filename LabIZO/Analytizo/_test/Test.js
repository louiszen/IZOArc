import React, { Component } from "react";

import { Pieizo } from "IZOArc/LabIZO/Analytizo";
import data from "./sample_data";

import { Accessor } from "IZOArc/STATIC";
import { HStack, VStack } from "IZOArc/LabIZO/Stackizo";

class Test extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!Accessor.IsIdentical(prevProps, this.props, Object.keys(Test.defaultProps))) {
      this._setAllStates();
    }
  }

  _setAllStates = (callback) => {
    this.setState(
      (state, props) => ({
        ...props,
      }),
      callback
    );
  };

  _Delete = (id, row) => {
    console.log(id, row);
  };

  render() {
    return (
      <VStack padding={1}>
        <HStack height={"100%"}>
          <Pieizo data={data.PieData} />
          <Pieizo data={data.PieData} />
        </HStack>
        <HStack height={"100%"}>
          <Pieizo data={data.PieData} />
          <Pieizo data={data.PieData} />
        </HStack>
      </VStack>
    );
  }
}

export default Test;
