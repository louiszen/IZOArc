import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import htmlParser from 'html-react-parser';
import TagParser from './HTMLTags/TagParser';
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import _ from "lodash";

/**
 * @augments {Component<Props, State>}
 */
class WMText extends Component {

  static propTypes = {
    themeCSS: PropsType.object,
    
    addOns: PropsType.object,

    HTMLSpecialTagParser: PropsType.func,

    hideLongAnswer: PropsType.bool,
    longAnswerLength: PropsType.number,
    readMoreCaption: PropsType.oneOfType([PropsType.func, PropsType.string]),
    revertReadMore: PropsType.bool,
    readLessCaption: PropsType.oneOfType([PropsType.func, PropsType.string]),

    HTMLEnabled: PropsType.bool,

    //runtime
    text: PropsType.oneOfType([PropsType.string, PropsType.func]),
  }

  static defaultProps = {
    text: "",
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

  ReplaceSpecialTags = (text) => {
    let parsed = htmlParser(text);
    let {cssPrefix, HTMLSpecialTagParser, iaddOns} = this.state;

    if(HTMLSpecialTagParser){
      return HTMLSpecialTagParser(cssPrefix, parsed, iaddOns);
    }else{
      return TagParser.Parse(cssPrefix, parsed, iaddOns);
    }
  }

  renderReadMore(){
    let {themeCSS, readMoreCaption} = this.state;
    return (
      <Typography key="ReadMore" style={themeCSS?.msgbody?.msg?.text?.readmore} onClick={() => this.setHide(false)}>
        {readMoreCaption}
      </Typography>
    );
  }

  renderReadLess(){
    let {themeCSS, readLessCaption} = this.state;
    return (
      <Typography key="ReadLess" style={themeCSS?.msgbody?.msg?.text?.readmore} onClick={() => this.setHide(true)}>
        {readLessCaption}
      </Typography>
    );
  }

  renderText(){
    let {themeCSS, HTMLEnabled, hideLongAnswer, longAnswerLength,
      revertReadMore, hide, text} = this.props;
    
    let rtn = [];
  
    if(HTMLEnabled){
      let blocks = this.ReplaceSpecialTags(text);
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
      rtn = text;
      
      if(hideLongAnswer){
        if(text.length > longAnswerLength){
          let showText = text.substring(0, longAnswerLength);
          let hideText = text.substring(longAnswerLength);

          rtn = [
            <Box style={themeCSS?.msgbody?.msg?.text?.box}>
              <Box key="showtext" style={themeCSS?.msgbody?.msg?.text?.show}>
                {showText}
              </Box>
              {
                !hide &&
                <Box key="hidetext" style={themeCSS?.msgbody?.msg?.text?.hide}>
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
    let { themeCSS } = this.props;
    return (
      <Box style={themeCSS?.msgbody?.msg?.text?.main}>
        {this.renderText()}
      </Box>
    )
  }

}

export default WMText;
