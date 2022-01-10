import { AccountTreeRounded, ApiRounded, GroupsRounded, InfoOutlined, PersonRounded, Widgets } from "@mui/icons-material";
import { LocaleX } from "IZOArc/STATIC";
import APIAvail from "./APIAvail/APIAvail";
import AuthTree from "./AuthTree/AuthTree";
import General from "./General/General";
import GroupConfig from "./GroupConfig/GroupConfig";
import RoleConfig from "./RoleConfig/RoleConfig";
import UserAccess from "./UserAccess/UserAccess";

const tail = {
  iconPos: "left",
  noTransform: true,
  spacing: 20,
  width: 240,
  alignment: "left"
};

/**
 * 
 * @param {*} addOns 
 * @type {[
 *  {
 *    label: String | (() => String),
 *    icon: String | JSX.Element | (() => String | JSX.Element)
 *    reqAuth: String,
 *    render: JSX.Element | ((addOns) => JSX.Element),
 *    iconPos: "top" | "left" | "right" | "bottom",
 *    noTransform: Boolean=false, 
 *    spacing: Number=5,
 *    alignment: "center" | "left" | "right",
 *    width: Number=200,
 *    height: Number=20
 *  }
 * ]}
 */
const tabs = [
  {
    label: () => LocaleX.Parse({
      EN: "General",
      TC: "一般設定"
    }),
    icon: <InfoOutlined/>,
    render: (addOns) => <General projDoc={addOns.projDoc} onUpdate={addOns.Refresh}/>,
    ...tail,
    width: 180
  },
  {
    label: () => LocaleX.Parse({
      EN: "API Availablity",
      TC: "接口開關設定"
    }),
    icon: <ApiRounded/>,
    render: (addOns) => <APIAvail projDoc={addOns.projDoc} onUpdate={addOns.Refresh}/>,
    ...tail
  },
  {
    label: () => LocaleX.Parse({
      EN: "Registered Authority",
      TC: "項目權限設定"
    }),
    icon: <AccountTreeRounded/>,
    render: (addOns) => <AuthTree projDoc={addOns.projDoc} onUpdate={addOns.Refresh}/>,
    ...tail
  },
  {
    label: () => LocaleX.Parse({
      EN: "Available Roles",
      TC: "身份權限配置"
    }),
    icon: <PersonRounded/>,
    render: (addOns) => <RoleConfig projDoc={addOns.projDoc} onUpdate={addOns.Refresh}/>,
    ...tail
  },
  {
    label: () => LocaleX.Parse({
      EN: "Resource Groups",
      TC: "資源組別配置"
    }),
    icon: <Widgets/>,
    render: (addOns) => <GroupConfig 
      projDoc={addOns.projDoc} 
      userlist={addOns.userlist} 
      grouplist={addOns.grouplist} 
      rolelist={addOns.rolelist} 
      onUpdate={addOns.Refresh}
      />,
    ...tail
  },
  {
    label: () => LocaleX.Parse({
      EN: "Custom User Access",
      TC: "使用者權限設定"
    }),
    icon: <GroupsRounded/>,
    render: (addOns) => <UserAccess 
      projDoc={addOns.projDoc} 
      userlist={addOns.userlist} 
      grouplist={addOns.grouplist} 
      rolelist={addOns.rolelist}
      onUpdate={addOns.Refresh}/>,
    ...tail
  }
];

export default tabs;