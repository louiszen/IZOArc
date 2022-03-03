// eslint-disable-next-line no-unused-vars
import { CSSProperties } from "react";
import { ColorX } from "IZOArc/STATIC";

/**
 * @type {import("../__typedef").tstyle}
 */
const style = {
  main: {
    flexGrow: 1,
    overflowY: "auto",
    overflowX: "hidden",
    width: "100%",
  },
  body: {
    alignItems: "flex-start"
  },
  avatar: {
    main: {
      margin: "5px 0 5px 5px",
      minWidth: 40,
      maxWidth: 40
    },
    avatar: {
      margin: 0,
      padding: 0,
      alignItems: "baseline",
      borderRadius: 50,
      overflow: "hidden",
      display: "flex"
    },
    avatarimg: {
      width: "100%"
    }
  },
  bubble: {
    main: {
      margin: "5px 10px",
      padding: "5px 10px",
      maxWidth: "70%",
      boxShadow: "0 0 0.25cm rgba(163, 94, 40, 0.349)",
      cursor: "pointer",
      minWidth: 100
    },
    in: {
      float: "left",
      color: ColorX.GetColor({r: 51, g: 51, b: 51}, 1),
      borderRadius: 10,
    },
    out: {
      float: "right",
      color: "white",
      borderRadius: 10,
      background: ColorX.GetColorCSS("blue"),
    },
    header: {
      cursor: "pointer",
      fontSize: 12,
      fontWeight: "bold",
      fontFamily: "Arial, Helvetica, sans-serif",
      color: ColorX.GetColorCSS({r: 200, g: 123, b: 30})
    },
    footer: {
      main: {
        userSelect: "none",
        fontSize: "xx-small",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "3px 0 0 0"
      },
      datetime: {
        flexGrow: 1,
        textAlign: "right"
      },
      status: {
        margin: "0 10px 0 0"
      },
      lapse: {
        textAlign: "left",
        flexGrow: 1,
        margin: "0 10px 0 0",
        fontStyle: "italic"
      }
    }
  },
  msg: {
    system: {
      margin: 1,
      padding: "3px 15px",
      backgroundColor: ColorX.GetColorCSS("lightGrey"),
      textAlign: "center",
      borderRadius: 5,
      fontSize: "xx-small"
    },
    text: {
      main: {
        margin: "0"
      },
      readmore: {

      }
    },
    buttons: {
      main: {
        justifyContent: "center",
        alignItems: "center"
      },
      button: {
        width: "100%",
        cursor: "pointer",
        borderRadius: 5,
        background: "linear-gradient(90deg, rgb(200, 123, 30) 0%, rgb(125, 60, 10) 75.75%, rgb(125, 60, 10) 100%)",
        padding: "1px",
        margin: "2px 0"
      },
      text: {

      },
      disabledButton: {
        opacity: 0.5
      },
      disabledText: {

      },
      fitContent: {
        width: "fit-content"
      }
    }
  }
};

export default style;