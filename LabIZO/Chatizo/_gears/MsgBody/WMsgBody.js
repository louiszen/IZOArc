import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import WMsg from "./WMsg";
import _ from "lodash";
import WAvatar from "./WAvatar";


/**
 * @augments {Component<Props, State>}
 */
class WMsgBody extends Component {

  static propTypes = {
    theme: PropsType.string,

    onAvatarClicked: PropsType.func,

    onMounted: PropsType.func,
    user: PropsType.shape({
      ID: PropsType.string,
      name: PropsType.string,
      avatar: PropsType.string
    }),

    messages: PropsType.array,

    showInAvatar: PropsType.bool,
    showOutAvatar: PropsType.bool,
    hideSameAvatar: PropsType.bool,
    avatarAtTop: PropsType.bool,

    animated: PropsType.bool,
    typing: PropsType.bool,
  }

  static defaultProps = {
    onMounted: null,
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    this.scrollToBottom();
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WMsgBody.defaultProps))){
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
          scrollToBottom: this.scrollToBottom
        });
      }
      if(callback) callback();
    });
  }

  scrollToBottom(){
    if (this.messageEnd) {
      this.messageEnd.scrollIntoView({ behavior: "smooth" });
    }
  }

  renderAvatar(user, hideImg){
    return (
      <WAvatar
        {...this.props}
        iuser={user}
        hideImg={hideImg}
        />
    );
  }

  renderMsgs(){
    let {messages, user,
      showInAvatar, showOutAvatar, avatarAtTop, hideSameAvatar, 
      typing, animated, _onQuickReply, disableButtonAfterSent} = this.props;

    let rtn = [];
    
    _.map(messages, (o, i) => {
      let last = i === messages.length - 1;
      let pos = o.user?.ID === user.ID? "out" : "in";
      let hideImg = false;
      let hideHeader = false;

      let prevMsg = messages[i-1];
      let nextMsg = messages[i+1];

      if(prevMsg?.user && o.user){
        hideHeader = prevMsg.user.ID === o.user.ID;
      }
      
      if(hideSameAvatar){
        if(avatarAtTop){       
          if(prevMsg?.user && o.user){
            hideImg = prevMsg.user.ID === o.user.ID;
          }
        }else{ 
          if(nextMsg?.user && o.user){
            hideImg = nextMsg.user.ID === o.user.ID;
          }
        }
      }
      
      rtn.push(
        <HStack alignItems={avatarAtTop? "flex-start": "flex-end"} key={i}>
          {(showInAvatar && pos === "in" && !o.msg.system) && 
            this.renderAvatar(o.user, hideImg)}
          {pos === "out" && !o.msg.system && <Spacer/>}
          <WMsg
            {...this.props}
            _onQuickReply={_onQuickReply}
            pos={pos}
            item={o}
            last={last}
            hideHeader={hideHeader}
            disabled={disableButtonAfterSent? !last : false}
            />
          {(showOutAvatar && pos === "out" && !o.msg.system) &&
            this.renderAvatar(o.user, hideImg)}
          {pos === "in" && !o.msg.system && <Spacer/>}
        </HStack>
      );
    });

    if(animated && typing){
      rtn.push(
        <HStack alignItems={avatarAtTop? "flex-start": "flex-end"} key="typing">
          {showInAvatar && this.renderAvatar(null, true)}
          <WMsg
            {...this.props}
            _onQuickReply={null}
            pos={"in"}
            item={{}}
            last={false}
            typingBubbles={true}
            hideHeader={true}
            />
          <Spacer/>
        </HStack>
      );
    }

    return rtn;
  }

  render(){
    let {theme} = this.props;
    return (
      <VStack width="100%" className={theme + " chatizo-msg-main"}>
        {this.renderMsgs()}
        <div ref={e => this.messageEnd = e}/>
      </VStack>
    );
  }

}

export default WMsgBody;
