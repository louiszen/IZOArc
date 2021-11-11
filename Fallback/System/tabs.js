import { Group, Sync } from "@material-ui/icons";

import SysBnR from "./SysBnR/SysBnR";
import SysUser from "./SysUser/SysUser";

const tabs = [
  {
    label: "Backup & Restore",
    icon: <Sync/>,
    reqAuth: "System.BnR",
    render: <SysBnR/>,
    iconPos: "left",
    noTransform: true,
    alignment: "left"
  },
  {
    label: "User Access Control",
    icon: <Group/>,
    reqAuth: "System.User",
    render: <SysUser/>,
    iconPos: "left",
    noTransform: true,
    alignment: "left"
  }
];

export default tabs;