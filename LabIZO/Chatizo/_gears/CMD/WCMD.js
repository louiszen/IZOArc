import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Box } from "@mui/system";
import Holdable from "IZOArc/LabIZO/Controlizo/Holdable";
import BMarkdown from "IZOArc/BLOCKS/Display/BMarkdown";

import _ from "lodash";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import { Typography } from "@mui/material";

/**
 * @augments {Component<Props, State>}
 */
class WCMD extends Component {

  static propTypes = {
    theme: PropsType.string,
    cmds: PropsType.array,

    inCMD: PropsType.bool,
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WCMD.defaultProps))){
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

  renderCMDButton(o, match, i){
    let {theme, _onQuickReply} = this.props;
    let replaced = o.cmd;
    if(!_.isEmpty(match) && match.length > 1){
      replaced = o.cmd.replaceAll(new RegExp(match, "gi"), "**$&**");
      replaced = replaced.replaceAll(/\*\*\*\*/gi, ""); //prevent markdown conflict
    }
    return (
      <Box key={i} className={theme + " chatizo-input-cmd-btn"}>
        <Holdable onPress={() => _onQuickReply({title: o.cmd, payload: o.cmd})}>
          <HStack>
            <BMarkdown className={theme + " chatizo-input-cmd-text"}>
              {replaced}
            </BMarkdown>
            <Spacer/>
            <Typography className={theme + " chatizo-input-cmd-desc"}>
              {o.desc}
            </Typography>
          </HStack>
        </Holdable>
      </Box>
    );
  }

  render(){

    let {theme, cmds, inputText} = this.props;
  
    let txt = inputText.toLowerCase();
    if(!_.isEmpty(txt)){
      cmds = _.filter(cmds, o => o.cmd.toLowerCase().startsWith(txt) );
    }

    return (
      <VStack className={theme + " chatizo-input-cmd-btnlist"} spacing={1}>
        {_.map(cmds, (o, i) => {
          return this.renderCMDButton(o, inputText, i);
        })}
      </VStack>
    );
  }

}

export default WCMD;
