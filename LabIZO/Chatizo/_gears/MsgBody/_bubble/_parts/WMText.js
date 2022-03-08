import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import htmlParser from "html-react-parser";
import TagParser from "./HTMLTags/TagParser";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import _ from "lodash";

/**
 * @augments {Component<Props, State>}
 */
class WMText extends Component {

  static propTypes = {
    theme: PropsType.string,
    
    addOns: PropsType.object,

    HTMLSpecialTagParser: PropsType.func,

    hideLongAnswer: PropsType.bool,
    longAnswerLength: PropsType.number,
    readMoreCaption: PropsType.oneOfType([PropsType.func, PropsType.string]),
    revertReadMore: PropsType.bool,
    readLessCaption: PropsType.oneOfType([PropsType.func, PropsType.string]),

    HTMLEnabled: PropsType.bool,

    //runtime
    otext: PropsType.oneOfType([PropsType.string, PropsType.func]),
  }

  static defaultProps = {
    otext: "",
    addOns: {}
  }

  constructor(){
    super();
    this.state = {
      hide: true
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WMText.defaultProps))){
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

  setHide = (f) => {
    this.setState({
      hide: f
    });
  }

  ReplaceSpecialTags = (otext) => {
    let parsed = htmlParser(otext);
    let {theme, HTMLSpecialTagParser, iaddOns} = this.state;

    if(HTMLSpecialTagParser){
      return HTMLSpecialTagParser(theme, parsed, iaddOns);
    }else{
      return TagParser.Parse(theme, parsed, iaddOns);
    }
  }

  renderReadMore(){
    let {theme, readMoreCaption} = this.state;
    return (
      <Typography key="readmore" className={theme + " chatizo-msg-text-readmore"} onClick={() => this.setHide(false)}>
        {readMoreCaption}
      </Typography>
    );
  }

  renderReadLess(){
    let {theme, readLessCaption} = this.state;
    return (
      <Typography key="readless" className={theme + " chatizo-msg-text-readmore"} onClick={() => this.setHide(true)}>
        {readLessCaption}
      </Typography>
    );
  }

  renderText(){
    let {theme, HTMLEnabled, hideLongAnswer, longAnswerLength,
      revertReadMore, hide, otext} = this.props;
    
    let rtn = [];
  
    if(HTMLEnabled){
      let blocks = this.ReplaceSpecialTags(otext);
      if(hideLongAnswer){
        if(!Array.isArray(blocks)) {
          blocks = [blocks];
        }

        let length = 0;
        let short = false;
        _.map(blocks, (o, i) => {

          if(o.props && o.props.children){
            if(typeof(o.props.children) === "string"){
              length += o.props.children.length;
            }
          }else{
            if(typeof(o) === "string"){
              length += o.length;
            }
          }

          if(length < longAnswerLength){
            if(i === blocks.length - 1){
              short = true;
            }
            rtn.push(o);
          }else{
            if(!hide){
              rtn.push(o);
            }
          }

        });

        if(!short){
          if(hide){
            rtn.push(
              this.renderReadMore()
            );
          }else if(!hide && revertReadMore){
            rtn.push(
              this.renderReadLess()
            );
          }
        }
      }
    }else{
      rtn = otext;
      
      if(hideLongAnswer){
        if(otext.length > longAnswerLength){
          let showText = otext.substring(0, longAnswerLength);
          let hideText = otext.substring(longAnswerLength);

          rtn = [
            <Box className={theme + " chatizo-msg-text-box"}>
              <Box key="showtext" className={theme + " chatizo-msg-text-show"}>
                {showText}
              </Box>
              {
                !hide &&
                <Box key="hidetext" className={theme + " chatizo-msg-text-hide"}>
                  {hideText}
                </Box>
              }
              {
                hide &&
                this.renderReadMore()
              }
              {
                !hide && revertReadMore &&
                this.renderReadLess()
              }
            </Box>
          ];
        }
      }
    }

    return rtn;

  }

  render(){
    let { theme } = this.props;
    return (
      <Box className={theme + " chatizo-msg-text-main"}>
        {this.renderText()}
      </Box>
    );
  }

}

export default WMText;
