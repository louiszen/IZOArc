import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';
import { v1 } from 'uuid';
import { Box, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import { Accessor, ColorX } from 'IZOArc/STATIC';
import { HStack, Spacer, VStack } from 'IZOArc/LabIZO/Stackizo';
import { StyledButton } from 'IZOArc/LabIZO/Stylizo';
import Formizo from 'IZOArc/LabIZO/Formizo';

class Inner extends Component {

  static propTypes = {
    doc: PropsType.object,
    docID: PropsType.string,
    ibase: PropsType.object,
    addOns: PropsType.object,
    onSubmit: PropsType.func,
    onQuit: PropsType.func,
    onQuitRefresh: PropsType.func,
    auth: PropsType.object,
    level: PropsType.number,
    showIDOnTop: PropsType.bool
  }

  static defaultProps = {
    doc: {},
    docID: "",
    ibase: {},
    addOns: {},
    onSubmit: () => {},
    onQuit: (docID) => {},
    onQuitRefresh: (docID) => {},
    auth: {},
    level: 999,
    showIDOnTop: true
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Inner.defaultProps))){
      this._setAllStates();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
        return;
    };
  }

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props,
    }), callback);
  }

  onMountFormizo = (callbacks) => {
    this.MountFormizo = callbacks;
  }

  _onQuit = () => {
    let {ibase, onQuit, onQuitRefresh, docID} = this.props;
    if(ibase.QuitReload){
      if(onQuitRefresh){
        onQuitRefresh(docID);
      }
    }else{
      if(onQuit){
        onQuit(docID);
      }
    }
  }

  renderFormizo(){
    let {ibase, doc, onSubmit, addOns, auth, level} = this.props;
    return (
      <Formizo
        schema={ibase.schema}
        formID={v1()}
        buttons={ibase.buttons || []}
        buttonAlign="right"
        readOnly={ibase.readOnly}
        onMounted={this.onMountFormizo}
        defaultValue={doc}
        onSubmit={onSubmit}
        addOns={addOns}
        auth={auth}
        level={level}
        />
    );
  }

  renderBackBar(){
    let {ibase, docID, showIDOnTop} = this.props;
    return (
      <HStack>
        <Box height="100%" background="#f9ffff">
          <HStack>
            <Typography style={{
              textAlign: "left", 
              fontFamily: "Segoe UI",
              fontSize: 20,
              color: ColorX.GetColorCSS("elainOrange"),
              marginRight: 10
              }}>
              {ibase.title}
            </Typography>
            {docID && showIDOnTop && 
              <Typography style={{
                textAlign: "left", 
                fontFamily: "Segoe UI",
                fontSize: 20,
                color: "black"
                }}>
                {docID}
              </Typography>
            }
          </HStack>
        </Box>
        <Spacer/>
        <StyledButton theme={{
          color: "white", 
          background: ColorX.GetColorCSS("elainOrange"),
          hover: {
            background: ColorX.GetColorCSS("elainOrangeDark")
          },
          boxShadow: "transparent",
          borderRadius: "0px"
          }}  
          onClick={() => {
            this._onQuit(docID);            
          }}>
          <ArrowBack/>
        </StyledButton>
      </HStack>
    );
  }

  renderContent(){
    let {ibase, docID, doc, onQuit, onQuitRefresh, addOns} = this.props;
    if(_.isFunction(ibase.Custom)){
      return ibase.Custom(docID, doc, onQuit, onQuitRefresh, this.renderFormizo, addOns);
    }else{
      return this.renderFormizo();
    }
  }

  render(){
    let {ibase} = this.props;
    if(!ibase) return null;
    return (
      <VStack width="100%" padding={1} paddingBottom={5} style={{overflow: "auto"}}>
        {this.renderBackBar()}
        {this.renderContent()}
      </VStack>
    );
  }

}

export default Inner;
