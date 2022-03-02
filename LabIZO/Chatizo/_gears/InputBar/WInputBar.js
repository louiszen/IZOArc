import React, { Component } from "react";
import { Accessor, ZFunc } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { HStack, VStack } from "IZOArc/LabIZO/Stackizo";
import { IconButton } from "@mui/material";
import { AttachFile, Code, Hive, InsertEmoticon, Mic, RadioButtonChecked, Send } from "@mui/icons-material";
import { Box } from "@mui/system";
import _ from "lodash";

/**
 * @augments {Component<Props, State>}
 */
class WInputBar extends Component {

  static propTypes = {

    //Command
    enableCMD: PropsType.bool,
    cmds: PropsType.objectOf(PropsType.func),

    //Menu
    showMenu: PropsType.bool,
    menu: PropsType.arrayOf(PropsType.shape({
      icon: PropsType.oneOfType([PropsType.func, PropsType.string]),
      cap: PropsType.oneOfType([PropsType.func, PropsType.string]),
      func: PropsType.func
    })),

    //autoComplete
    autoCompleteAllowed: PropsType.bool,
    autoCompleteLibs: PropsType.objectOf(PropsType.arrayOf(PropsType.shape({
      icon: PropsType.oneOfType([PropsType.func, PropsType.string]),
      cap: PropsType.oneOfType([PropsType.func, PropsType.string]),
      val: PropsType.func
    }))),
    autoCompleteMethod: PropsType.oneOf(["startsWith", "endsWith", "contains"]),

    //Settings
    enableEmoji: PropsType.bool,
    enableAttach: PropsType.bool,
    enableAudio: PropsType.bool,
    enableRecord: PropsType.bool,

    //attachments
    allowCamera: PropsType.bool,
    allowImage: PropsType.bool,
    allowVideo: PropsType.bool,
    allowFile: PropsType.bool,
    allowLocation: PropsType.bool,
    allowPoll: PropsType.bool,
    allowMusic: PropsType.bool,

    pressEnterToSend: PropsType.bool,
    inputPlaceHolder: PropsType.oneOfType([PropsType.func, PropsType.string]),

    themeCSS: PropsType.object,

    //runtime
    available: PropsType.bool,
    inAC: PropsType.bool,

    //base functions
    _onTextChange: PropsType.func,
    _onSend: PropsType.func,
  }

  static defaultProps = {

  }

  constructor(){
    super();
    this.state = {
      input: "",
      isEmpty: true,
      avSwitch: "a"
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WInputBar.defaultProps))){
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

  onKeyDown = (e) => {

  }

  onInputChange = (text) => {
    this.setState({
      input: text,
      isEmpty: _.isEmpty(text)
    })
  }

  renderImageUpload(){

  }

  renderAutoComplete(){

  }

  renderMenuBtn(){
    let {themeCSS, showMenu} = this.props;
    if(!showMenu) return;
    return (
      <IconButton style={themeCSS?.inputbar?.mainbar?.menu} size="small">
        <Hive style={{width:"100%", height: "100%"}}/>
      </IconButton>
    );
  }

  renderEmojiBtn(){
    let {themeCSS, enableEmoji} = this.props;
    if(!enableEmoji) return;
    return (
      <IconButton style={themeCSS?.inputbar?.mainbar?.emoji} size="small">
        <InsertEmoticon style={{width:"100%", height: "100%"}}/>
      </IconButton>
    );
  }

  renderTextField(){
    let {themeCSS, inputPlaceHolder, addOns, available} = this.props;
    let {input} = this.state;
    let ph = ZFunc.IfFuncExec(inputPlaceHolder, addOns);
    return (
      <Box className="chatizo-input-box" style={themeCSS?.inputbar?.mainbar?.text?.outter}>
        <input
          className="chatizo-input"
          style={themeCSS?.inputbar?.mainbar?.text?.inner}
          onKeyDown={e => this.onKeyDown(e)}
          onChange={e => this.onInputChange(e.target.value)}
          rows="1"
          placeholder={ph}
          value={input || ""}
          disabled={!available}
          />
      </Box>
    );
  }

  renderCMDBtn(){
    let {themeCSS, enableCMD} = this.props;
    if(!enableCMD) return;
    return (
      <IconButton style={themeCSS?.inputbar?.mainbar?.cmd} size="small">
        <Code style={{width:"100%", height: "100%"}}/>
      </IconButton>
    );
  }

  renderAttachBtn(){
    let {themeCSS, enableAttach} = this.props;
    if(!enableAttach) return;
    return (
      <IconButton style={themeCSS?.inputbar?.mainbar?.attach} size="small">
        <AttachFile style={{width:"100%", height: "100%"}}/>
      </IconButton>
    );

  }

  renderAudioRecordBtn(){
    let {themeCSS, enableAudio, enableRecord} = this.props;
    let {avSwitch} = this.state;
    if(!enableAudio && !enableRecord) return;

    if(enableAudio && (!enableRecord || avSwitch === "a")){
      return (
        <IconButton style={themeCSS?.inputbar?.mainbar?.audio} size="small">
          <Mic style={{width:"100%", height: "100%"}}/>
        </IconButton>
      );
    }

    if(enableRecord && (!enableAudio || avSwitch === "v")){
      return (
        <IconButton style={themeCSS?.inputbar?.mainbar?.record} size="small">
          <RadioButtonChecked style={{width:"100%", height: "100%"}}/>
        </IconButton>
      );
    }

  }

  renderSendBtn(){
    let {themeCSS, isEmpty} = this.state;
    if(!isEmpty){
      return (
        <IconButton style={themeCSS?.inputbar?.mainbar?.send} size="small">
          <Send style={{width:"100%", height: "100%"}}/>
        </IconButton>
      );
    }
  }

  renderButtons(){
    let {isEmpty} = this.state;
    if(isEmpty){
      return [
        this.renderCMDBtn(),
        this.renderAttachBtn(),
        this.renderAudioRecordBtn()
      ];
    }
    return this.renderSendBtn()
  }

  renderMainBar(){
    let {themeCSS} = this.props;
    return (
      <HStack width="100%" style={themeCSS?.inputbar?.mainbar?.main} spacing={2}>
        {this.renderMenuBtn()}
        {this.renderEmojiBtn()}
        {this.renderTextField()}
        {this.renderButtons()}
      </HStack>
    );
  }

  render(){
    let {themeCSS} = this.props;
    return (
      <VStack width="100%" style={themeCSS?.inputbar?.main}>
        {this.renderImageUpload()}
        {this.renderAutoComplete()}
        {this.renderMainBar()}
      </VStack>
    );
  }

}

export default WInputBar;
