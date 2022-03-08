import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import Chatizo from "..";
import { CenterFocusWeakRounded } from "@mui/icons-material";
import MockChatbotEngine from "./MockChatbotEngine";

const autoCompleteLibs = {
  workNature: [
    {
      cap: "Confined Space Work 密閉空間",
      val: "CSP"
    },
    {
      cap: "ESSW 電力安全 (臨電/永久電)",
      val: "ESSW"
    },
    {
      cap: "Excavation 挖掘工程",
      val: "EXCAV"
    },
    {
      cap: "Fatal Zone Setup 圍封政命地帶",
      val: "FATAL"
    },
    {
      cap: "Hot Work Operation 熱工序",
      val: "HOT"
    },
    {
      cap: "HouseKeeping 工地整理",
      val: "HK"
    },
    {
      cap: "Lifting Operation 吊運工序",
      val: "LIFT"
    },
    {
      cap: "Plant Operation 機械操作",
      val: "PLANT"
    },
    {
      cap: "PPE 個人防護裝備",
      val: "PPE"
    },
    {
      cap: "Use of hazardous & flammable substances 使用危險物品/易燃物品",
      val: "DANGER"
    },
    {
      cap: "Work At Height 高空工作",
      val: "HEIGHT"
    }
  ],
  workActivities: [
    {
      cap: "Equipment 機械",
      val: "equip"
    },
    {
      cap: "Manhole",
      val: "Manhole"
    },
    {
      cap: "other 其他",
      val: "other"
    },
    {
      cap: "Permit system 工作許可證",
      val: "permit"
    },
    {
      cap: "Water Tank 水缸",
      val: "tank"
    }
  ],
  companies: [
    {
      cap: "Gammon Construction Limited 金門建築有限公司",
      val: "gammon"
    }
  ],
  locations: [
    {
      cap: "J3828 - AMC",
      val: "amc"
    },
    {
      cap: "J3880 - HKIA APM",
      val: "hkia"
    }
  ]
};

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
    this.state = {
      step: 0
    };
  }

  componentDidMount(){
    this._setAllStates();
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

  Start = () => {
    this.setState({
      step: 0
    }, () => {
      this.Proceed();
    });
  }

  Proceed = () => {
    let {step} = this.state;
    let res = MockChatbotEngine.GetResponse(step);
    console.log(res);
    this.MountChatizo.Append(res);
    this.setState({
      step: step + 1
    });
  }

  onSend = (input) => {
    console.log(input);
    this.Proceed();
  }

  onQR = (QR) => {
    console.log(QR);
    this.Proceed();
  }

  render(){
    let Menu = [
      {
        icon: <CenterFocusWeakRounded/>,
        cap: "SIO",
        func: this.Start
      }
    ];

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
        autoCompleteLibs={autoCompleteLibs}
        showMenu={true}
        menu={Menu}
        onSend={this.onSend}
        onQuickReply={this.onQR}
        />
    );
  }

}

export default Test;
