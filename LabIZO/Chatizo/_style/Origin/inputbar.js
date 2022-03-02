// eslint-disable-next-line no-unused-vars
import { CSSProperties } from "react";
import { ColorX } from "IZOArc/STATIC";

const iconSize = 30;

/**
 * @type {CSSProperties}
 */
const btnStyle = {
  minHeight: iconSize,
  maxHeight: iconSize,
  minWidth: iconSize,
  maxWidth: iconSize,
  color: ColorX.GetColorCSS("lightGrey")
}

/**
 * @type {import("../../__typedef").tstyle}
 */
const style = {
  main: {
    minHeight: 40,
    maxHeight: 40
  },
  mainbar: {
    main: {
      backgroundColor: ColorX.GetColorCSS("blue"),
      padding: 5
    },
    text: {
      outter: {
        borderRadius: 5,
        backgroundColor: ColorX.GetColorCSS("white"),
        flexGrow: 1,
        padding: "0 5px"
      },
      inner: {
        roundRadius: 5,
        width: "100%",
        borderWidth: 0,
        backgroundColor: ColorX.GetColorCSS("transparent"),
      },
      notEmpty: {

      }
    },
    audio: {
      ...btnStyle
    },
    record: {
      ...btnStyle
    },
    attach: {
      ...btnStyle
    },
    send: {
      
    },
    cmd: {
      ...btnStyle
    },
    emoji: {
      ...btnStyle
    },
    menu: {
      ...btnStyle
    }
  }
};

export default style;