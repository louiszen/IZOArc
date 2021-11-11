import { Group, Sync } from "@material-ui/icons";
import { LocaleX } from "IZOArc/STATIC";

import SysBnR from "./SysBnR/SysBnR";
import SysUser from "./SysUser/SysUser";

const tabs = [
  {
    label: () => LocaleX.Get("__IZO.System.BnR"),
    icon: <Sync/>,
    reqAuth: "System.BnR",
    render: <SysBnR/>,
    iconPos: "left",
    noTransform: true,
    alignment: "left"
  },
  {
    label: () => LocaleX.Get("__IZO.System.UAC"),
    icon: <Group/>,
    reqAuth: "System.User",
    render: <SysUser/>,
    iconPos: "left",
    noTransform: true,
    alignment: "left"
  }
];

export default tabs;