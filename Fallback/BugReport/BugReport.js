import React, { Component } from "react";
import { observer } from "mobx-react";
import { Accessor, AuthX, ColorX, LocaleX } from "IZOArc/STATIC";
import Formizo from "IZOArc/LabIZO/Formizo";

import schema from "./schema";
import { Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import { Typography } from "@mui/material";
import SReport from "IZOArc/API/SReport";
import { Denied } from "..";

/**
 * @augments {Component<Props, State>}
 */
class BugReport extends Component {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(BugReport.defaultProps))){
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

  SubmitBugReport = async (formProps) => {
    await SReport.SendBugReport(formProps);
  }

  renderForm(){
    return (
      <VStack height="fit-content" style={{
        borderWidth: 1, 
        borderRadius: 25,
        borderStyle: "solid",
        borderColor: ColorX.GetColorCSS("grey", 0.5),
        padding: 5
        }}>
          <Typography style={{
            padding: 5,
            fontSize: 20, 
            fontWeight: "bold"
            }}>
            {LocaleX.Parse({
              EN: "Bug Report",
              TC: "錯誤報告"
            })}
          </Typography>
        <Formizo
          width={700}
          height={500}
          schema={schema}
          onSubmit={this.SubmitBugReport}
          />
      </VStack>
    );
  }

  render(){
    if(!AuthX.Pass("BugReport")) return <Denied/>;
    return (
      <VStack>
        <Spacer/>
          {this.renderForm()}
        <Spacer/>
      </VStack>
    );
  }

}

export default observer(BugReport);
