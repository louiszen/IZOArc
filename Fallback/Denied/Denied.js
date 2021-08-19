import React, { Component } from 'react';

import { Typography } from '@material-ui/core';

import { HStack, Spacer, VStack } from 'IZOArc/LabIZO/Stackizo';
import { Accessor } from 'IZOArc/STATIC';

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
          <img src="/Images/denied.svg" alt="not-found" style={{width: "100%"}}/> 
        </HStack>
        <Typography style={{fontSize: 20, fontWeight: "bold"}}>
          {"Access Denied"}
        </Typography>
        <Spacer/>
      </VStack>
    );
  }

}

export default Denied;
