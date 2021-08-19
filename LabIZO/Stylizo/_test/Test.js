import React, { Component } from 'react';

import { Delete } from '@material-ui/icons';

import OutlinedBox from '../OutlinedBox';
import StyledTextField from '../StyledTextField';
import StyledIconButton from '../StyledIconButton';

import { Accessor } from 'IZOArc/STATIC';
import { HStack, VStack } from 'IZOArc/LabIZO/Stackizo';
import { StyledButton, StyledCircularProgress, StyledInput, StyledLinearProgress } from 'IZOArc/LabIZO/Stylizo';

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

  render(){
    return (
      <VStack width="100%">
        <HStack>
          <StyledButton theme={{
              color: "blue",
              background: "white"
            }}
            disabled
            >
              Button1
            </StyledButton>        
        </HStack>
        <StyledIconButton theme={{
          color: "blue", 
          background: "white", 
          hover: {
            background: "red"
          }
        }}
        >
          <Delete/>
        </StyledIconButton>
        <OutlinedBox label="HELLO" theme={{color: "rgba(255, 0, 255, 1)"}}>
          You can put whatever you want in here.
        </OutlinedBox>
        <StyledTextField 
          label="TESTING" 
          variant="standard"
          theme={{
            input: "red",
            field: "red",
            line: "transparent"
          }}
          >
        </StyledTextField>
        <StyledInput
          theme={{
            input: "red",
            line: "transparent"
          }}
          error
          >

        </StyledInput>
        <StyledCircularProgress  theme={{bar:"red"}}/>
        <StyledLinearProgress theme={{background:"red", bar: "blue"}}/>
      </VStack>
    );
  }

}

export default Test;
