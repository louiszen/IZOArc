import { PermDataSettingRounded, Sync, ArticleRounded, ConfirmationNumber } from "@mui/icons-material";

import { LocaleX } from "IZOArc/STATIC";

import SysBnR from "./SysBnR/SysBnR";

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
    render: () => <div/>,
    ...Tail
  },
  {
    label: () => LocaleX.GetIZO("System.AuthLog"),
    icon: <ArticleRounded/>,
    reqAuth: "System.AuthLog",
    render: () => <div/>,
    ...Tail
  },
  {
    label: () => LocaleX.GetIZO("System.Ticket"),
    icon: <ConfirmationNumber/>,
    reqAuth: "System.Ticket",
    render: () => <div/>,
    ...Tail
  }
];

export default tabs;