import React, { Component } from 'react';


import PropsType from 'prop-types';
import _ from 'lodash';
import { Add, Delete } from '@material-ui/icons';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import FItem from '../FItem';

import { Accessor, ColorX } from 'IZOArc/STATIC';
import { HStack, Spacer, VStack } from 'IZOArc/LabIZO/Stackizo';
import { OutlinedBox } from 'IZOArc/LabIZO/Stylizo';

class FGArray extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,

    //runtime
    formValue: PropsType.object.isRequired,

    //readOnly
    readOnly: PropsType.bool.isRequired
  }

  static defaultProps = {
    //data
    ischema: {},

    formValue: {},

    readOnly: false
  }

  constructor(){
    super();
    this.state = {
      arraySize: 0
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FGArray.defaultProps))){
      this._setAllStates();
    }
    let {ischema, preAccessor, formValue, arraySize} = this.state;
    let iname = ischema.name;
    if(!_.isEmpty(preAccessor)){
      if(!_.isEmpty(ischema.name)){
        iname = preAccessor + "." + ischema.name;
      }else{
        iname = preAccessor;
      }
    }
    let items = Accessor.Get(formValue, iname);
    if((!items && arraySize !== 0) 
      || (items && items.length !== arraySize)){
      this.setState({
        arraySize: (items && items.length) || 0
      });
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
    }), (callback));
  }

  onAddItem = () => {
    console.log("onAddItem");
    let {ischema, preAccessor, formValue, _onValueChange, arraySize} = this.state;
    let iname = ischema.name;
    if(!_.isEmpty(preAccessor)){
      if(!_.isEmpty(ischema.name)){
        iname = preAccessor + "." + ischema.name;
      }else{
        iname = preAccessor;
      }
    }
    let items = Accessor.Get(formValue, iname);
    if(!items) items = [];
    let newItem = {};
    _.map(ischema.array, (o, i) => {
      if(_.isEmpty(o.name)){
        newItem = "";
      }else{
        newItem[o.name] = null;
      }
    });
    items.push(newItem);
    _onValueChange(iname, items);
    this.setState({
      arraySize: arraySize + 1
    });
  }

  onDeleteItem = (idx) => {
    console.log("onDeleteItem");
    let {ischema, preAccessor, formValue, _onValueChange, arraySize} = this.state;
    let iname = ischema.name;
    if(!_.isEmpty(preAccessor)){
      if(!_.isEmpty(ischema.name)){
        iname = preAccessor + "." + ischema.name;
      }else{
        iname = preAccessor;
      }
    }
   
    let items = Accessor.Get(formValue, iname);
    let newItems = _.clone(items);
    if(newItems && (newItems[idx] !== undefined || newItems[idx] !== null)){
      delete newItems[idx];
      
      newItems = newItems.filter(o=>o);
      
      _onValueChange(iname, newItems);
      this.setState({
        arraySize: arraySize - 1
      });
    }
  }

  renderTableHeader(){
    return (
      <TableRow>
        {this.renderTableHeaderCell()}
      </TableRow>
    );
  }

  renderTableHeaderCell(){
    let {ischema, readOnly} = this.state;
    let ireadOnly = ischema.readOnly || readOnly;
    let rtn = [];
    _.map(ischema.array, (o, i) => {
      rtn.push (
        <TableCell key={i} style={{textAlign: "center", padding: 5}}>
          {o.label}
        </TableCell>
      );
    });

    if(!ireadOnly && ischema.canDelete){
      rtn.push(
        <TableCell key={"delete"} style={{position: "sticky", top: 0, zIndex: 10, padding: 5}}></TableCell>
      )
    }

    return rtn;
  }

  renderTableRows(){
    let {ischema, readOnly, arraySize} = this.state;
    let ireadOnly = ischema.readOnly || readOnly;
    
    let rtn = [];
    
    for(let i =0; i < arraySize; i++){
      rtn.push(
        <TableRow key={i} style={{width: "100%"}}>
          {this.renderTableRowCells(i)}
        </TableRow>
      );
    }

    if(!ireadOnly && ischema.canAdd && ischema.addStyle === "placeholder"){
      rtn.push(
        <TableRow key={arraySize} style={{width: "100%"}}>
          {this.renderTableRowCellsAdd(arraySize)}
        </TableRow>
      );
    }
    
    return rtn;
  }

  renderTableRowCells(idx){
    
    let {ischema, readOnly} = this.state;
    let ireadOnly = ischema.readOnly || readOnly;

    let rtn = [];
    _.map(ischema.array, (o, i) => {
      rtn.push (
        <TableCell key={i} style={{padding: 5}}>
          {this.renderItem(o, idx)}
        </TableCell>
      );
    });

    if(!ireadOnly && ischema.canDelete){
      rtn.push(
        <TableCell key={"delete"} style={{padding: 5}}>
          {this.renderDeleteButton(idx)}
        </TableCell>
      );
    }

    return rtn;
  }

  renderTableRowCellsAdd(idx){
    let {ischema} = this.state;

    let rtn = [];
    _.map(ischema.array, (o, i) => {
      rtn.push (
        <TableCell key={i} style={{padding: 5}}>
          {this.renderItem(o, idx)}
        </TableCell>
      );
    });

    rtn.push(
      <TableCell key={"add"} style={{padding: 5}}>
        {this.renderAddButton()}
      </TableCell>
    );
    return rtn;
  }

  renderItem(cschema, idx){
    let {ischema, preAccessor, ...other} = this.props;

    let newPreAccessor = "";
    if(_.isEmpty(preAccessor)){
      newPreAccessor = ischema.name + "." + idx;
    }else{
      newPreAccessor = preAccessor + "." + ischema.name + "." + idx;
    }

    return (
      <FItem
        ischema={cschema}
        preAccessor={newPreAccessor}
        inTable={true}
        {...other}/>
    );
  }

  renderTable(){
    let {ischema} = this.state;
    let showHeader = true;
    if(ischema.array.length === 1 && _.isEmpty(ischema.array[0].label)){
      showHeader = false;
    }
    return (
      <TableContainer style={{width: "100%", maxHeight: ischema.maxHeight || "500px"}}>
        <Table stickyHeader style={{width: "100%"}}>
          {
            showHeader &&
            <TableHead style={{width: "100%"}}>
              {this.renderTableHeader()}
            </TableHead>
          }
          <TableBody style={{width: "100%"}}>
            {this.renderTableRows()}
          </TableBody>  
        </Table>
      </TableContainer>
    );
  }

  renderSchema(cschema, idx){
    let {ischema, preAccessor, ...other} = this.props;

    let newPreAccessor = "";
    if(_.isEmpty(preAccessor)){
      newPreAccessor = ischema.name + "." + idx;
    }else{
      newPreAccessor = preAccessor + "." + ischema.name + "." + idx;
    }

    return _.map(cschema, (o, i) => {
      return (
        <FItem
          key={i}
          ischema={o}
          preAccessor={newPreAccessor}
          {...other}/>
      );
    });
  }

  renderCards(){
    let {arraySize, ischema} = this.state;
    
    let rtn = [];
    
    for(let i = 0; i < arraySize; i++){
      rtn.push(
        <OutlinedBox key={i} theme={{color: ColorX.GetColorCSS("elainOrangeDark", 0.2)}}>
          <VStack style={{width: "100%"}}>
            {this.renderSchema(ischema.array, i)}
            <HStack>
              <Spacer/>
              {this.renderDeleteButton(i)}
            </HStack>
          </VStack>
        </OutlinedBox>
      );
    }
    
    return rtn;

  }

  renderCardList(){
    return (
      <VStack style={{width:"100%", maxHeight: "500px", overflowY: "auto"}}>
        {this.renderCards()}
      </VStack>
    );
  }

  renderDeleteButton(idx){
    let {ischema, readOnly} = this.state;
    let ireadOnly = ischema.readOnly || readOnly;
    return (
      <IconButton onClick={() => this.onDeleteItem(idx)} disabled={ireadOnly} color="secondary">
        <Delete/>
      </IconButton>
    );
  }

  renderAddButton(size = "normal"){
    let {ischema, readOnly} = this.state;
    let ireadOnly = ischema.readOnly || readOnly;
    return (
      <IconButton onClick={() => this.onAddItem()} disabled={ireadOnly} color="primary" size={size}>
        <Add/>
      </IconButton>
    );
  }

  renderHeader(){
    let {ischema, readOnly} = this.state;
    let addStyle = ischema.addStyle || "header";
    let ireadOnly = ischema.readOnly || readOnly;
    return (
      <Paper style={{width:"100%", borderRadius: 0}}>
        <HStack>
          <Box margin={1} fontWeight="bold">
            {ischema.label}
          </Box>
          <Spacer/>
          {!ireadOnly && ischema.canAdd 
            && addStyle === "header" 
            && this.renderAddButton()}
        </HStack>
      </Paper>
    );
  }

  renderData(){
    let {ischema} = this.state;
    
    switch (ischema.arrayStyle){
      case "card":
        return this.renderCardList();
      case "table": default:
        return this.renderTable();
    }
  }

  render(){
    let {ischema, arraySize, readOnly} = this.state;
    if(!ischema) return null;
    let headerStyle = ischema.headerStyle || "header";
    let addStyle = ischema.addStyle || "header";
    let ireadOnly = ischema.readOnly || readOnly;

    switch(headerStyle){
      case "outlined":
        return (
          <OutlinedBox label={ischema.label} 
            style={{width: ischema.width || "100%", marginTop: "15px"}} 
            theme={{border: ColorX.GetColorCSS("elainOrangeDark", 0.2)}}
            >
            <VStack style={{width: "100%"}} alignItems="flex-start">
              {!ireadOnly && ischema.canAdd 
                && addStyle === "header" 
                && this.renderAddButton("small")}
              <HStack>
              { (arraySize > 0 || addStyle === "placeholder") &&
                this.renderData()
              }
              
              </HStack>
            </VStack>
          </OutlinedBox>
        );
      default: case "header":
        return (
          <OutlinedBox
            style={{width: ischema.width || "100%", marginTop: "15px"}} 
            theme={{border: ColorX.GetColorCSS("elainOrangeDark", 0.2)}}
            >
            <VStack style={{width: "100%"}}>
              { this.renderHeader()}
              { (arraySize > 0 || addStyle === "placeholder") &&
                this.renderData()
              }
            </VStack>
          </OutlinedBox>
        );
      case "noheader":
        return (
          <OutlinedBox
            style={{width: ischema.width || "100%", marginTop: "15px"}} 
            theme={{border: ColorX.GetColorCSS("elainOrangeDark", 0.2)}}
            >
            <VStack style={{width: "100%"}} alignItems="flex-start">
              {!ireadOnly && ischema.canAdd 
                && addStyle === "header" 
                && this.renderAddButton("small")}
              <HStack alignItems="flex-start" width="100%">
              { (arraySize > 0 || addStyle === "placeholder") &&
                this.renderData()
              }
              </HStack>
            </VStack>
          </OutlinedBox>
        );    
    }
  }

}

export default FGArray;
