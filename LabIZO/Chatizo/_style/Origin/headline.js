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
    padding: "0 20px",
    background: ColorX.GetColorCSS("blue"),
  },
  icon: {
    width: 100,
    height: 100,
    padding: "10px 5px"
  },
  text: {
    alignItems: "center",
    display: "inline",
    position: "relative",
    padding: "0px",
    fontWeight: "bold",
    color: ColorX.GetColorCSS("pureWhite")
  },

}

export default style;