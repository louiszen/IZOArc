import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { VStack } from "../Stackizo";
import { v4 } from "uuid";

import style from "./_style";
import WHeadline from "./_gears/Headline/WHeadline";

import _ from "lodash";

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
    onHeaderClicked: PropsType.func,

    //Rendering
    renderHeadLine: PropsType.func,
    renderInputAddOns: PropsType.func,

    //Runtime
    msgIDGen: PropsType.func,
    HTMLSpecialTagParser: PropsType.func,

    //Command
    sendCMD: PropsType.bool,
    cmds: PropsType.objectOf(PropsType.func),

    //Menu
    showMenu: PropsType.bool,
    menu: PropsType.arrayOf(PropsType.shape({
      cap: PropsType.oneOfType([PropsType.func, PropsType.string]),
      func: PropsType.func
    })),

    //Settings
    sendImage: PropsType.bool,
    sendVideo: PropsType.bool,
    sendAttach: PropsType.bool,

    pressEnterToSend: PropsType.bool,
    inputPlaceHolder: PropsType.oneOfType([PropsType.func, PropsType.string]),
    appendTextAfterSent: PropsType.bool,
    autoCompleteAllowed: PropsType.bool,

    hideLongAnswer: PropsType.bool,
    longAnswerLength: PropsType.number,
    readMoreCaption: PropsType.oneOfType([PropsType.func, PropsType.string]),
    revertReadMore: PropsType.bool,
    readLessCaption: PropsType.oneOfType([PropsType.func, PropsType.string]),

    animated: PropsType.bool,

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
    theme: "Origin",

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
    sendCMD: true,
    cmds: {},

    //Settings
    sendImage: true,
    sendVideo: true,
    sendAttach: true,

    pressEnterToSend: true,
    inputPlaceHolder: "Please input something here...",
    appendTextAfterSent: true,
    autoCompleteAllowed: true,

    hideLongAnswer: true,
    longAnswerLength: 300,
    readMoreCaption: "Read more...",
    revertReadMore: true,
    readLessCaption: "Read less",

    animated: false,

    //appearance
    showHeadline: true,
    headlineIcon: "",
    headlineText: "",

    showHeader: true,
    showFooter: true,
    showStatus: false,
    showDateTime: true,
    showLapseTime: true,

    showInAvatar: true,
    showOutAvatar: false,
    hideSameAvatar: true,
    avatarAtTop: true,

    quickReplyBar: true,
    showQuickRepliesAsButtons: true,
    disableButtonAfterSent: true,

    canClickOnIn: false,
    canClickOnOut: false,
    HTMLEnabled: true,

    //runtime operating
    available: true,

    addOns: {}
  }

  constructor(){
    super();
    this.state = {
      themeCSS: {},
      inQR: false,
      typingDisabled: false,
      messages: [],
      quickReplies: [],
      libraries: {}
    };
  }

  componentDidMount(){
    this._setAllStates(() => {
      this._setTheme();
    });
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

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props,
    }), () => {
      if(this.props.onMounted){
        this.props.onMounted({
          
        });
      }
      if(callback) callback();
    });
  }

  _setTheme = () => {
    let {theme} = this.props;
    let newTheme = style[theme];
    let origin = _.cloneDeep(style.Origin);
    let css = {};
    if(newTheme) {
      css = Accessor.DeepReplace(origin, style[theme]);
    }
    this.setState({
      themeCSS: css
    });
  }

  renderNotice(){

  }

  renderInputBar(){

  }

  renderMsgBody(){

  }

  renderHeadline(){
    let {showHeadline, headlineIcon, headlineText, addOns} = this.props;
    if(!showHeadline) return;

    let {themeCSS} = this.state;

    return (
      <WHeadline
        themeCSS={themeCSS}
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
