import React, { Component } from "react";

import { Typography } from "@mui/material";

import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import { Accessor, LocaleX } from "IZOArc/STATIC";
import { SITEBASE } from "__SYSDefault/Domain";

class Denied extends Component {

  static propTypes = {}

  static defaultProps = {}

  componentDidMount(){
    this.setState((state, props) => ({
      ...props,
    }));
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Denied.defaultProps))){
      this.componentDidMount();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
        return;
    };
  }

  render(){
    return (
      <VStack spacing={15}>
        <Spacer/>
        <HStack width="15vw">
          <img src={SITEBASE + "Images/denied.svg"} alt="not-found" style={{width: "100%"}}/> 
        </HStack>
        <Typography style={{fontSize: 20, fontWeight: "bold"}}>
          {LocaleX.GetIZO("System.AccessDenied")}
        </Typography>
        <Spacer/>
      </VStack>
    );
  }

}

export default Denied;
