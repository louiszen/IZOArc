import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { VStack } from "../Stackizo";
import { v4 } from "uuid";

import WHeadline from "./_gears/Headline/WHeadline";

import _ from "lodash";
import WInputBar from "./_gears/InputBar/WInputBar";
import WMsgBody from "./_gears/MsgBody/WMsgBody";

import "./_style";

/**
 * @augments {Component<Props, State>}
 */
class Chatizo extends Component {

  static propTypes = {
    onMounted: PropsType.func,
    user: PropsType.shape({
      ID: PropsType.string,
      name: PropsType.string,
      avatar: PropsType.string
    }),
    theme: PropsType.string,

    //basic
    width: PropsType.oneOfType([PropsType.number, PropsType.string]),
    height: PropsType.oneOfType([PropsType.number, PropsType.string]),

    //Sending messages
    onSend: PropsType.func,
    onQuickReply: PropsType.func,
    onInputChange: PropsType.func,

    //Interactive
    onMsgPressed: PropsType.func,
    onMsgLongPressed: PropsType.func,
    onAvatarClicked: PropsType.func,
    onImageClicked: PropsType.func,
    onWebClicked: PropsType.func,
    onPhoneClicked: PropsType.func,
    onHeaderClicked: PropsType.func,

    //Rendering
    renderHeadLine: PropsType.func,
    renderInputAddOns: PropsType.func,

    //Runtime
    msgIDGen: PropsType.func,
    HTMLSpecialTagParser: PropsType.func,

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
    appendTextAfterSent: PropsType.bool,

    hideLongAnswer: PropsType.bool,
    longAnswerLength: PropsType.number,
    readMoreCaption: PropsType.oneOfType([PropsType.func, PropsType.string]),
    revertReadMore: PropsType.bool,
    readLessCaption: PropsType.oneOfType([PropsType.func, PropsType.string]),

    animated: PropsType.bool,

    //autoComplete
    autoCompleteAllowed: PropsType.bool,
    autoCompleteLibs: PropsType.objectOf(PropsType.arrayOf(PropsType.shape({
      icon: PropsType.oneOfType([PropsType.func, PropsType.string]),
      cap: PropsType.oneOfType([PropsType.func, PropsType.string]),
      val: PropsType.func
    }))),
    autoCompleteMethod: PropsType.oneOf(["startsWith", "endsWith", "contains"]),

    //appearance
    showHeadline: PropsType.bool,
    headlineIcon: PropsType.oneOfType([PropsType.func, PropsType.string]),
    headlineText: PropsType.oneOfType([PropsType.func, PropsType.string]),

    showNotice: PropsType.bool,

    showHeader: PropsType.bool,
    showFooter: PropsType.bool,

    showStatus: PropsType.bool,
    showDateTime: PropsType.bool,
    showLapseTime: PropsType.bool,

    showInAvatar: PropsType.bool,
    showOutAvatar: PropsType.bool,
    hideSameAvatar: PropsType.bool,
    avatarAtTop: PropsType.bool,

    quickReplyBar: PropsType.bool,
    showQuickRepliesAsButtons: PropsType.bool,
    disableButtonAfterSend: PropsType.bool,
    buttonWidthFitContent: PropsType.bool,

    canClickOnIn: PropsType.bool,
    canClickOnOut: PropsType.bool,
    HTMLEnabled: PropsType.bool,

    //runtime operating
    available: PropsType.bool,

    addOns:PropsType.object,
    lang: PropsType.string
  }

  static defaultProps = {
    onMounted: (callbacks) => {},
    user: {
      ID: "TEST",
      name: "TEST",
      avatar: null
    },
    theme: "",

    //basic
    width: "100%",
    height: "100%",

    //Sending messages
    onSend: (input, msgID) => {},
    onQuickReply: (qR, msgID) => {},
    onInputChange: (text) => {},

    //Interactive
    onMsgPressed: (msgID, inout) => {},
    onMsgLongPressed: (msgID, inout) => {},
    onAvatarClicked: (userID) => {},
    onImageClicked: (src) => {},
    onPhoneClicked: (phone) => {},
    onWebClicked: (url) => { window.open(url); },
    onHeaderClicked: (user) => {},

    //Rendering
    renderHeadLine: () => {},
    renderInputAddOns: () => {},

    //Runtime
    msgIDGen: () => v4(),
    HTMLSpecialTagParser: null,

    //Command
    enableCMD: true,
    cmds: {},

    //Menu
    showMenu: true,
    menu: [],

    //Settings
    enableEmoji: true,
    enableAttach: true,
    enableAudio: true,
    enableRecord: true,
    
    //attachments
    allowCamera: true,
    allowImage: true,
    allowVideo: true,
    allowFile: true,
    allowLocation: true,
    allowPoll: true,
    allowMusic: true,

    pressEnterToSend: true,
    inputPlaceHolder: "Message",
    appendTextAfterSent: true,

    hideLongAnswer: true,
    longAnswerLength: 300,
    readMoreCaption: "Read more...",
    revertReadMore: true,
    readLessCaption: "Read less",

    animated: false,

    //autoComplete
    autoCompleteAllowed: true,
    autoCompleteLibs: {},
    autoCompleteMethod: "startsWith",

    //appearance
    showHeadline: true,
    headlineIcon: "",
    headlineText: "",

    showHeader: true,
    showFooter: true,
    
    showStatus: true,
    showDateTime: true,
    showLapseTime: true,

    showInAvatar: true,
    showOutAvatar: false,
    hideSameAvatar: true,
    avatarAtTop: false,

    quickReplyBar: true,
    showQuickRepliesAsButtons: true,
    disableButtonAfterSent: true,
    buttonWidthFitContent: true,

    canClickOnIn: true,
    canClickOnOut: true,
    HTMLEnabled: true,

    //runtime operating
    available: true,

    addOns: {}
  }

  constructor(){
    super();
    this.state = {
      inQR: false,
      inAC: false,
      typingDisabled: false,
      messages: [],
      quickReplies: [],
      libraries: {},
      typing: false
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Chatizo.defaultProps))){
      this._setAllStates();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  onMountWMsgBody = (callbacks) => {
    this.MountWMsgBody = callbacks;
  }

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props,
    }), () => {
      if(this.props.onMounted){
        this.props.onMounted({
          Append: this._Append,
          GetMsg: this._GetMsg,
          SetQuickReplies: this._setQuickReplies,
          SetMsgStatus: this._setMsgStatus,
          Clear: this._Clear,
          Typing: this._Typing,
          ScrollToBottom: this._scrollToBottom
        });
      }
      if(callback) callback();
    });
  }

  _Typing = (tf = true) => {
    this.setState({
      typing: tf
    });
  }

  _Clear = () => {
    this.setState({
      inQR: false,
      inAC: false,
      typingDisabled: false,
      messages: [],
      quickReplies: [],
      typing: false,
      input: undefined
    });
  }

  /**
   * 
   * @param {String | [String]} msgID 
   * @param {import("./__typedef").msgstatus} status 
   */
  _setMsgStatus = (msgID, status) => {
    let {messages} = this.state;
    _.map(messages, (o, i) => {
      if(msgID === o._id){
        o.status = status;
      }
    });
    this.setState({
      messages: messages
    });
  }

  /**
   * 
   * @param {[import("./__typedef").quickReply]} quickReplies 
   */
  _setQuickReplies = (quickReplies) => {
    this.setState({
      quickReplies: quickReplies
    });
  }

  /**
   * 
   * @param {Boolean} b 
   */
  _setTypingDisabled = (b) => {
    this.setState({
      typingDisabled: b
    });
  }


  /**
   * Reset Input to empty
   */
  _resetInput = () => {
    this.setState({
      input: undefined
    });
  }

  /**
   * 
   * @returns 
   */
  _scrollToBottom = () => {
    if(this.MountWMsgBody){
      this.MountWMsgBody.scrollToBottom();
    }
  }

  /**
   * 
   * @returns {[import("./__typedef").msgblock]}
   */
  _GetMsg = () => {
    return this.state.messages;
  }

  /**
   * 
   * @param {[import("./__typedef").msgblock] | import("./__typedef").msgblock} msgs 
   */
  _Append = (msgs) => {
    if(!_.isArray(msgs)) msgs = [msgs];

    if(msgs.length === 0) return;

    let lastMsg = msgs[msgs.length - 1];
    let quickReplies = lastMsg.msg.quickReplies || [];

    this.setState((state, props) => ({
      messages: state.messages.concat(msgs),
      quickReplies: quickReplies,
      inQR: quickReplies.length > 0
    }), () => {
      this._scrollToBottom();
    });
  }

  _onSend = () => {
    let {input} = this.state;
    console.log(input);
  }

  _onQuickReply = (quickReply) => {

  }

  _onSendWithAttachment = (input, atth, type) => {

  }

  /**
   * 
   * @param {import("./__typedef").cinput} input 
   * @param {Function} callback
   * @returns 
   */
  _onInputChange = (input, callback) => {
    let {typingDisabled, onInputChange} = this.state;
    if(typingDisabled) return;

    if(onInputChange)
      onInputChange(input);

    this.setState({
      input: input
    }, () => {
      if(callback) callback(input);
    });
  }

  renderNotice(){

  }

  renderInputBar(){
    let {input} = this.state;
    return (
      <WInputBar
        {...this.props}
        _onInputChange={this._onInputChange}
        _onSend={this._onSend}
        input={input}
        />
    );
  }

  renderMsgBody(){
    let {messages, typing} = this.state;
    return (
      <WMsgBody
        {...this.props}
        onMounted={this.onMountWMsgBody}
        _onQuickReply={this._onQuickReply}
        messages={messages}
        typing={typing}
        />
    );
  }

  renderHeadline(){
    let {showHeadline, headlineIcon, headlineText, addOns} = this.props;
    if(!showHeadline) return;

    return (
      <WHeadline
        iconSrc={headlineIcon}
        text={headlineText}
        addOns={addOns}
        />
    );
  }

  render(){
    let {width, height} = this.props;
    return (
      <VStack width={width} height={height}>
        {this.renderHeadline()}
        {this.renderNotice()}
        {this.renderMsgBody()}
        {this.renderInputBar()}
      </VStack>
    );
  }

}

export default Chatizo;
