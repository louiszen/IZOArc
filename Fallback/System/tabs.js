import { PermDataSettingRounded, Sync, ArticleRounded, ConfirmationNumber } from "@mui/icons-material";

import { LocaleX } from "IZOArc/STATIC";
import SysAuthLog from "./SysAuthLog/SysAuthLog";

import SysBnR from "./SysBnR/SysBnR";
import SysTickets from "./SysTickets/SysTickets";
import SysUAC from "./SysUAC/SysUAC";

const Tail = {
  iconPos: "left",
  noTransform: true,
  alignment: "left",
  width: 250
};

const tabs = [
  {
    label: () => LocaleX.GetIZO("System.BnR"),
    icon: <Sync/>,
    reqAuth: "System.BnR",
    render: <SysBnR/>,
    ...Tail
  },
  {
    label: () => LocaleX.GetIZO("System.UAC"),
    icon: <PermDataSettingRounded/>,
    reqAuth: "System.UAC",
    render: <SysUAC/>,
    ...Tail
  },
  {
    label: () => LocaleX.GetIZO("System.AuthLog"),
    icon: <ArticleRounded/>,
    reqAuth: "System.AuthLog",
    render: <SysAuthLog/>,
    ...Tail
  },
  {
    label: () => LocaleX.GetIZO("System.Tickets"),
    icon: <ConfirmationNumber/>,
    reqAuth: "System.Tickets",
    render: <SysTickets/>,
    ...Tail
  }
];

export default tabs;