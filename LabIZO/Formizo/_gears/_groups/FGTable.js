import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";

import FItem from "../FItem";

import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from "@mui/material";
import { Accessor } from "IZOArc/STATIC";

class FGTable extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
    formValue: PropsType.object,
    addOns: PropsType.object
  }

  static defaultProps = {
    ischema: {},
    formValue: {},
    addOns: {}
  }

  constructor(){
    super();
    this.state = {
      open: false
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FGTable.defaultProps))){
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

  getCellSchema = (cell) => {
    let {formValue, addOns} = this.props;
    if(_.isFunction(cell)){
      return cell(formValue, addOns);
    }
    return cell;
  }

  getRowSchema = (row) => {
    let {formValue, addOns} = this.props;
    if(_.isFunction(row)){
      return row(formValue, addOns);
    }
    return row;
  }

  getHeaderSchema = () => {
    let {ischema, formValue, addOns} = this.props;
    if(_.isFunction(ischema.table.header)){
      return ischema.table.header(formValue, addOns);
    }
    return ischema.table.header;
  }

  getRowsSchema = () => {
    let {ischema, formValue, addOns} = this.props;
    if(_.isFunction(ischema.table.rows)){
      return ischema.table.rows(formValue, addOns);
    }
    return ischema.table.rows;
  }

  renderCell(cell, idx){
    // eslint-disable-next-line no-unused-vars
    let {ischema, ...other} = this.props;
    let cellSchema = this.getCellSchema(cell);
    return (
      <TableCell colSpan={cellSchema.colSpan} key={idx} width={cellSchema.width} padding="none">
        <FItem
          ischema={cellSchema}
          {...other}/>
      </TableCell>
    );
  }

  renderHeader(){
    let headerSchema = this.getHeaderSchema();
    return _.map(headerSchema, (o, i) => {
      return (
        <TableRow key={i} style={{width: "100%"}}>
          {this.renderRow(o, i)}
        </TableRow>
      );
    });
  }

  renderRow(row, idx){
    let rowSchema = this.getRowSchema(row);
    return _.map(rowSchema, (o, i) => {
      return this.renderCell(o, i);
    });
  }

  renderRows(){
    let rowsSchema = this.getRowsSchema();
    return _.map(rowsSchema, (o, i) => {
      return (
        <TableRow key={i} style={{width: "100%"}}>
          {this.renderRow(o, i)}
        </TableRow>
      );
    });
  }

  render(){
    let {ischema} = this.state;
    if(!ischema) return null;

    return (
      <TableContainer style={{width: "100%", maxHeight: ischema.maxHeight || "500px"}}>
        <Table stickyHeader style={{width: "100%"}}>
          <TableHead style={{width: "100%"}}>
            {this.renderHeader()}
          </TableHead>
          <TableBody style={{width: "100%"}}>
            {this.renderRows()}
          </TableBody>  
        </Table>
      </TableContainer>
    );
        
  }

}

export default FGTable;
