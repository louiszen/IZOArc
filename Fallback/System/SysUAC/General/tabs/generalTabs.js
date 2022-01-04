import { LocaleX } from "IZOArc/STATIC";
import BMarkdown from "IZOArc/BLOCKS/Display/BMarkdown";

import AuthTreeMd from "../md/AuthTreeMd";

/**
 * @type {[
 *  {
 *    label: String | (() => String),
 *    icon: String | JSX.Element | (() => String | JSX.Element)
 *    reqAuth: String,
 *    render: JSX.Element | (() => JSX.Element),
 *    iconPos: "top" | "left" | "right" | "bottom",
 *    noTransform: Boolean=false, 
 *    spacing: Number=5,
 *    alignment: "center" | "left" | "right",
 *    width: Number=200,
 *    height: Number=20
 *  }
 * ]}}
 */
const tabs = [
  {
    label: () => LocaleX.Parse({
      EN: "AuthTree",
      TC: "權限樹"
    }),
    render: () => <BMarkdown>
      {AuthTreeMd()}
    </BMarkdown>,
    noTransform: true,
  }
];

export default tabs;