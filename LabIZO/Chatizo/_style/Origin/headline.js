// eslint-disable-next-line no-unused-vars
import { CSSProperties } from "react";
import { ColorX } from "IZOArc/STATIC";

/**
 * @type {Object.<string, CSSProperties}
 */
const style = {
  main: {
    userSelect: "none",
    position: "relative",
    minHeight: 50,
    height: 50,
    width: "100%",
    borderRadius: 0,
    padding: 0,
    background: ColorX.GetColorCSS("blue"),
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15
  },
  text: {
    alignItems: "center",
    display: "inline",
    position: "relative",
    padding: "0px",
    fontWeight: "bold",
    color: ColorX.GetColorCSS("pureWhite")
  },
  settings: {
    width: 50,
    height: 50,
    color: ColorX.GetColorCSS("pureWhite")
  }

};

export default style;