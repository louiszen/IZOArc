import { ZTime } from "IZOArc/STATIC";
import { v1 } from "uuid";


class MockChatbotEngine {

  static GetUser(){
    return {
      ID: "1",
      name: "Gambot",
      avatar: "/Images/Icon/gambot.png"
    };
  }

  static GetResponse(step){
    switch(step){
      default: case 0: return MockChatbotEngine.Step0();
      case 1: return MockChatbotEngine.Step1();
      case 2: return MockChatbotEngine.Step2();
      case 3: return MockChatbotEngine.Step3();
      case 4: return MockChatbotEngine.Step4();
      case 5: return MockChatbotEngine.Step5();
      case 6: return MockChatbotEngine.Step6();
    }
  }

  static Step0(){
    let user = MockChatbotEngine.GetUser();
    return [
      {
        _id: v1(),
        createdAt: ZTime.Now(),
        lapseTime: 0.5,
        user: null,
        msg: {
          system: "You are using SIO reporting system."
        }
      },
      {
        _id: v1(),
        createdAt: ZTime.Now(),
        lapseTime: 0.5,
        user: user,
        msg: {
          text: "請提供相片"
        }
      }
    ];
  }

  static Step1(){
    let user = MockChatbotEngine.GetUser();
    return [
      {
        _id: v1(),
        createdAt: ZTime.Now(),
        lapseTime: 0.5,
        user: user,
        msg: {
          text: "此觀察是什麼性質?",
          quickReplies: [
            {
              title: "良好質量事項",
              payload: "yes",
              color: "green"
            },
            {
              title: "不良質量事項",
              payload: "no",
              color: "red"
            }
          ]
        }
      }
    ];
  }

  static Step2(){
    let user = MockChatbotEngine.GetUser();
    return [
      {
        _id: v1(),
        createdAt: ZTime.Now(),
        lapseTime: 0.5,
        user: user,
        msg: {
          text: "請描述你的觀察"
        }
      }
    ];
  }

  static Step3(){
    let user = MockChatbotEngine.GetUser();
    return [
      {
        _id: v1(),
        createdAt: ZTime.Now(),
        lapseTime: 0.5,
        user: user,
        msg: {
          text: "工作性質是?"
        },
        next: {
          autoComplete: "workNature"
        }
      }
    ];
  }

  static Step4(){
    let user = MockChatbotEngine.GetUser();
    return [
      {
        _id: v1(),
        createdAt: ZTime.Now(),
        lapseTime: 0.5,
        user: user,
        msg: {
          text: "工作活動是?"
        },
        next: {
          autoComplete: "workActivities"
        }
      }
    ];
  }

  static Step5(){
    let user = MockChatbotEngine.GetUser();
    return [
      {
        _id: v1(),
        createdAt: ZTime.Now(),
        lapseTime: 0.5,
        user: user,
        msg: {
          text: "公司"
        },
        next: {
          autoComplete: "companies"
        }
      }
    ];
  }

  static Step6(){
    let user = MockChatbotEngine.GetUser();
    return [
      {
        _id: v1(),
        createdAt: ZTime.Now(),
        lapseTime: 0.5,
        user: user,
        msg: {
          text: "工作地點是"
        },
        next: {
          autoComplete: "locations"
        }
      }
    ];
  }

}

export default MockChatbotEngine;