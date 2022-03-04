import React, { Component } from "react";
import { Accessor, ZFunc } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { HStack, VStack } from "IZOArc/LabIZO/Stackizo";
import { IconButton } from "@mui/material";
import { AttachFile, Code, Hive, InsertEmoticon, Mic, RadioButtonChecked, Send } from "@mui/icons-material";
import { Box } from "@mui/system";
import _ from "lodash";
import Holdable from "IZOArc/LabIZO/Controlizo/Holdable";

/**
 * @augments {Component<Props, State>}
 */
class WInputBar extends Component {

  static propTypes = {

    //Command
    enableCMD: PropsType.bool,
    cmds: PropsType.objectOf(PropsType.func),

    //Menu
    inMenu: PropsType.bool,
    showMenu: PropsType.bool,

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

    theme: PropsType.string,

    //runtime
    available: PropsType.bool,
    inAC: PropsType.bool,
    ACLib: PropsType.string,

    //base functions
    _setShowMenu: PropsType.func,
    _onInputChange: PropsType.func,
    _onSend: PropsType.func,
    input: PropsType.object
  }

  static defaultProps = {
    //Command
    enableCMD: false,
    cmds: {},

    //Menu
    inMenu: false,
    showMenu: false,

    //Settings
    enableEmoji: false,
    enableAttach: false,
    enableAudio: false,
    enableRecord: false,

    //attachments
    allowCamera: false,
    allowImage: false,
    allowVideo: false,
    allowFile: false,
    allowLocation: false,
    allowPoll: false,
    allowMusic: false,

    pressEnterToSend: true,
    inputPlaceHolder: "Message",

    theme: "",

    //runtime
    available: false,
    inAC: false,
    ACLib: "",

    //base functions
    _setShowMenu: () => {},
    _onInputChange: () => {},
    _onSend: () => {},
    input: {}
  }

  constructor(){
    super();
    this.state = {
      audioMode: true
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

  toggleAV = () => {
    let {audioMode} = this.state;
    this.setState({
      audioMode: !audioMode
    });
  }

  toAudio = () => {
    console.log("toAudio");
  }

  toRecord = () => {
    console.log("toRecord");
  }

  toMenu = () => {
    console.log("toMenu");
    let {inMenu, _setShowMenu} = this.props;
    _setShowMenu(!inMenu);
  }

  toEmoji = () => {
    console.log("toEmoji");
  }

  toCMD = () => {
    console.log("toCMD");
  } 

  toAtth = () => {
    console.log("toAtth");
  }

  _isInputEmpty = () => {
    let {input} = this.state;
    return _.isEmpty(input?.text);
  }

  onKeyDown = (e) => {
    let {pressEnterToSend, _onSend} = this.props;
    if(pressEnterToSend && e.keyCode === 13 && e.shiftKey === false){
      _onSend();
      e.preventDefault();
    }
    return false;
  }

  onInputChange = (text) => {
    let {_onInputChange} = this.props;
    ZFunc.IfFuncExec(_onInputChange, {text: text});
  }

  renderImageUpload(){

  }

  renderMenuBtn(){
    let {theme, showMenu} = this.props;
    if(!showMenu) return;
    return (
      <Holdable onPress={() => this.toMenu()}>
        <IconButton className={theme + " chatizo-input-icon"} size="small">
          <Hive style={{width:"100%", height: "100%"}}/>
        </IconButton>
      </Holdable>
    );
  }

  renderEmojiBtn(){
    let {theme, enableEmoji} = this.props;
    if(!enableEmoji) return;
    return (
      <Holdable onPress={() => this.toEmoji()}>
        <IconButton className={theme + " chatizo-input-icon"} size="small">
          <InsertEmoticon style={{width:"100%", height: "100%"}}/>
        </IconButton>
      </Holdable>
    );
  }

  renderTextField(){
    let {inputPlaceHolder, addOns, available, input} = this.props;
    let ph = ZFunc.IfFuncExec(inputPlaceHolder, addOns);
    return (
      <Box className="chatizo-input-text-outter" >
        <input
          className="chatizo-input-text-inner"
          onKeyDown={e => this.onKeyDown(e)}
          onChange={e => this.onInputChange(e.target.value)}
          rows="1"
          placeholder={ph}
          value={input?.text || ""}
          disabled={!available}
          />
      </Box>
    );
  }

  renderCMDBtn(){
    let {theme, enableCMD} = this.props;
    if(!enableCMD) return;
    return (
      <Holdable onPress={() => this.toCMD()} key="cmd">
        <IconButton className={theme + " chatizo-input-icon"} size="small">
          <Code style={{width:"100%", height: "100%"}}/>
        </IconButton>
      </Holdable>
    );
  }

  renderAttachBtn(){
    let {theme, enableAttach} = this.props;
    if(!enableAttach) return;
    return (
      <Holdable onPress={() => this.toAtth()} key="atth">
        <IconButton className={theme + " chatizo-input-icon"} size="small">
          <AttachFile style={{width:"100%", height: "100%"}}/>
        </IconButton>
      </Holdable>
    );

  }

  renderAudioRecordBtn(){
    let {theme, enableAudio, enableRecord} = this.props;
    let {audioMode} = this.state;
    if(!enableAudio && !enableRecord) return;

    if(enableAudio && (!enableRecord || audioMode)){
      return (
        <Holdable onPress={() => this.toggleAV()} onLongPress={() => this.toAudio()} key="av">
          <IconButton className={theme + " chatizo-input-icon"} size="small">
            <Mic style={{width:"100%", height: "100%"}}/>
          </IconButton>
        </Holdable>
      );
    }

    if(enableRecord && (!enableAudio || !audioMode)){
      return (
        <Holdable onPress={() => this.toggleAV()} onLongPress={() => this.toRecord()} key="ar">
          <IconButton className={theme + " chatizo-input-icon"} size="small">
            <RadioButtonChecked style={{width:"100%", height: "100%"}}/>
          </IconButton>
        </Holdable>
      );
    }

  }

  renderSendBtn(){
    let {theme, _onSend} = this.props;
    if(!this._isInputEmpty()){
      return (
        <Holdable onPress={() => _onSend()} key="send">
          <IconButton className={theme + " chatizo-input-icon send"} size="small">
            <Send style={{width:"100%", height: "100%"}}/>
          </IconButton>
        </Holdable>
      );
    }
  }

  renderButtons(){
    if(this._isInputEmpty()){
      return [
        this.renderCMDBtn(),
        this.renderAttachBtn(),
        this.renderAudioRecordBtn()
      ];
    }
    return this.renderSendBtn();
  }

  renderMainBar(){
    let {theme} = this.props;
    return (
      <HStack width="100%" className={theme + " chatizo-input-bar"} spacing={2}>
        {this.renderMenuBtn()}
        {this.renderEmojiBtn()}
        {this.renderTextField()}
        {this.renderButtons()}
      </HStack>
    );
  }

  render(){
    let {theme} = this.props;
    return (
      <VStack width="100%" className={theme + " chatizo-input-main"}>
        {this.renderImageUpload()}
        {this.renderMainBar()}
      </VStack>
    );
  }

}

export default WInputBar;
