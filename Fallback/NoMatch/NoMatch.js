import React, { Component } from 'react';

import { HStack, Spacer, VStack } from 'IZOArc/LabIZO/Stackizo';
import { Accessor } from 'IZOArc/STATIC';

class NoMatch extends Component {

  static propTypes = {}

  static defaultProps = {}

  componentDidMount(){
    this.setState((state, props) => ({
      ...props,
    }));
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(NoMatch.defaultProps))){
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
      <VStack>
        <Spacer/>
        <HStack width="30vw" height="30vh">
          <img src="/Images/404.svg" alt="not-found"/> 
        </HStack>
        <Spacer/>
      </VStack>
    );
  }

}

export default NoMatch;
