import React, { Component } from "react";
import { Accessor, ColorX, ZTime } from "IZOArc/STATIC";
import Chatizo from "..";
import { v1 } from "uuid";

/**
 * @augments {Component<Props, State>}
 */
class Test extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates(() => {
      let test = [{
        _id: v1(),
        createdAt: ZTime.Now(),
        lapseTime: 0,
        user: null,
        msg: {
          system: "It is a system message."
        }
      },
      {
        _id: v1(),
        createdAt: ZTime.Now(),
        lapseTime: 25.245,
        user: {
          ID: "1",
          name: "HELLO",
          avatar: "/Images/Icon/gambot.png"
        },
        msg: {
          text: "Hello world"
        },
        next: {
          autoComplete: "companies"
        }
      },
      {
        _id: v1(),
        createdAt: ZTime.Now(),
        lapseTime: 30.2,
        user: {
          ID: "1",
          name: "HELLO",
          avatar: "/Images/Icon/gambot.png"
        },
        msg: {
          text: "Please Select",
          buttons: [
            {
              title: "Good",
              payload: "yes",
              style: {
                backgroundColor: ColorX.GetColorCSS("green")
              }
            },
            {
              title: "Bad",
              payload: "no",
              style: {
                backgroundColor: ColorX.GetColorCSS("red")
              }
            }
          ]
        },
        next: {
          autoComplete: "companies"
        }
      },
      {
        _id: v1(),
        createdAt: ZTime.Now(),
        status: "sent",
        user: {
          ID: "0",
          name: "User",
          avatar: "/Images/QSK.png"
        },
        msg: {
          text: "Hello world"
        }
      },
      {
        _id: v1(),
        createdAt: ZTime.Now(),
        status: "pending",
        user: {
          ID: "0",
          name: "User",
          avatar: "/Images/QSK.png"
        },
        msg: {
          text: "Hello world2"
        }
      }];

      
      if(this.MountChatizo){
        this.MountChatizo.Append([
          ...test
        ]);
      }
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Test.defaultProps))){
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

  onMountChatizo = (callbacks) => {
    this.MountChatizo = callbacks;
  }

  render(){
    return (
      <Chatizo
        onMounted={this.onMountChatizo}
        width={"100%"}
        height={"100%"}
        headlineIcon="/Images/Icon/gambot.png"
        headlineText={(addOns) => "Gambot - " + addOns.projectID}
        addOns={{
          projectID: "J0000"
        }}
        user={{
          ID: "0",
          name: "User",
          avatar: "/Images/QSK.png"
        }}
        />
    );
  }

}

export default Test;
