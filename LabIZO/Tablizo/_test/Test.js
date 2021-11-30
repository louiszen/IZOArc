import React, { Component } from "react";

import { Delete } from "@material-ui/icons";

import schema from "./_schema";
import data from "./_data"; 

import Tablizo from "IZOArc/LabIZO/Tablizo";
import { VStack } from "IZOArc/LabIZO/Stackizo";
import { Accessor } from "IZOArc/STATIC";

class Test extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Test.defaultProps))){
      this._setAllStates();
    }
  }

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props,
    }), callback);
  }

  _Delete = (id, row) => {
    console.log(id, row);
  }

  render(){
    return (
      <VStack padding={1}>
        <Tablizo
          schema={schema.simple}
          data={data.data}
          level={1}
          loading={false}
          densityToolbar={true}
          columnsToolbar={true}
          inlineButtons={[
            {
              caption: "Delete",
              icon: <Delete/>,
              func: this._Delete,
              reqLevel: 2
            }
          ]}
          inlineButtonsAlign={"right"}
          datagridProps={{}}
          />
      </VStack>
      
    );
  }

}

export default Test;
