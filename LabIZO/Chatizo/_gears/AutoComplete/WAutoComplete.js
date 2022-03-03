import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Box } from "@mui/system";
import { VStack } from "IZOArc/LabIZO/Stackizo";

import _ from "lodash";
import Holdable from "IZOArc/LabIZO/Controlizo/Holdable";
import BMarkdown from "IZOArc/BLOCKS/Display/BMarkdown";

/**
 * @augments {Component<Props, State>}
 */
class WAutoComplete extends Component {

  static propTypes = {
    //autoComplete
    autoCompleteAllowed: PropsType.bool,
    autoCompleteLibs: PropsType.objectOf(PropsType.arrayOf(PropsType.shape({
      icon: PropsType.oneOfType([PropsType.func, PropsType.string]),
      cap: PropsType.oneOfType([PropsType.func, PropsType.string]),
      val: PropsType.oneOfType([PropsType.func, PropsType.string]),
    }))),
    autoCompleteMethod: PropsType.oneOf(["startsWith", "endsWith", "contains"]),
  
    theme: PropsType.string,

    inAC: PropsType.bool,
    ACLib: PropsType.string,

    _onQuickReply: PropsType.func,
    inputText: PropsType.string,
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WAutoComplete.defaultProps))){
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

  renderAutoCompleteButton(o, match, i){
    let {theme, _onQuickReply} = this.props;
    let replaced = o.cap;
    if(!_.isEmpty(match)){
      replaced = o.cap.replaceAll(new RegExp(match, "gi"), "**$&**");
      replaced = replaced.replaceAll(/\*\*\*\*/gi, ""); //prevent markdown conflict
    }
    return (
      <Box key={i} className={theme + " chatizo-input-ac-btn"}>
        <Holdable onPress={() => _onQuickReply({title: o.cap, payload: o.val})}>
          <BMarkdown className={theme + " chatizo-input-ac-text"}>
            {replaced}
          </BMarkdown>
        </Holdable>
      </Box>
    );
  }

  render(){
    let {theme, ACLib, autoCompleteLibs, autoCompleteMethod, inputText} = this.props;
  
    let libs = autoCompleteLibs[ACLib];
    let txt = inputText.toLowerCase();
    if(!_.isEmpty(txt)){
      //filter
      switch(autoCompleteMethod){
        case "startsWith":
          libs = _.filter(libs, o => o.cap.toLowerCase().startsWith(txt) || o.val.toLowerCase().startsWith(txt) );
          break;
        case "endsWith":
          libs = _.filter(libs, o => o.cap.toLowerCase().endsWith(txt) || o.val.toLowerCase().startsWith(txt));
          break;
          
        default: case "contains":
          libs = _.filter(libs, o => o.cap.toLowerCase().includes(txt) || o.val.toLowerCase().startsWith(txt));
          break;
      }
    }

    return (
      <VStack className={theme + " chatizo-input-ac-btnlist"} spacing={1}>
        {_.map(libs, (o, i) => {
          return this.renderAutoCompleteButton(o, inputText, i);
        })}
      </VStack>
    );

  }

}

export default WAutoComplete;
