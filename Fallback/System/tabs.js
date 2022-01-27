import { Sync, ArticleRounded, ConfirmationNumber, SettingsAccessibility, Dangerous } from "@mui/icons-material";

import { LocaleX } from "IZOArc/STATIC";
import SysAuthLog from "./SysAuthLog/SysAuthLog";

import SysBnR from "./SysBnR/SysBnR";
import SysDANGER from "./SysDANGER/SysDANGER";
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
    icon: <SettingsAccessibility/>,
    reqAuth: "System.UAC",
    render: (addOns) => <SysUAC location={addOns?.location}/>,
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
    label: () => LocaleX.GetIZO("System.Ticket"),
    icon: <ConfirmationNumber/>,
    reqAuth: "System.Tickets",
    render: <SysTickets/>,
    ...Tail
  },
  {
    label: () => LocaleX.Parse({
      EN: "DANGER ZONE",
      TC: "危險區域"
    }),
    icon: <Dangerous/>,
    render: <SysDANGER/>,
    reqAuth: "System.DANGER",
    reqLevel: 0,
    ...Tail
  }
];

export default tabs;