import { LEDSwitch } from "IZOArc/BLOCKS/Ctrls";
import { LocaleX } from "IZOArc/STATIC";

const Table = [
  {
    label: " ",
    name: "_id",
    width: 50,
    Cell: (row, field, addOns) => {
      return (
        <LEDSwitch
          field={field}
          ctrl={addOns.selectedGroupDoc?.userCtrl
            && addOns.selectedGroupDoc?.userCtrl[field]}
          onCtrlSet={addOns.onCtrlSet}
          />
      );
    }
  },
  {
    label: () => LocaleX.Parse({
      EN: "Username",
      TC: "使用者帳號"
    }),
    name: "username",
  },
  {
    label: () => LocaleX.Parse({
      EN: "Role",
      TC: "身份"
    }),
    name: "role",
    Cell: (row, field, addOns) => {
      let role = addOns.rolelist.find(o => o._id === field); 
      if(!role) return "";
      return LocaleX.Parse(role.name);
    }
  },
  {
    label: () => LocaleX.Parse({
      EN: "Level",
      TC: "等級"
    }),
    name: "level"
  }
];

const Add = [
  {
    label: () => LocaleX.Parse({
      EN: "Username",
      TC: "使用者帳號"
    }),
    name: "username",
    format: "select",
    selectStyle: "dropdown",
    selectRef: "userlist",
    selectCap: "UserDisplayName",
    selectVal: "_id",
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Role",
      TC: "身份"
    }),
    name: "role",
    format: "select",
    selectStyle: "dropdown",
    selectRef: "rolelist",
    selectCap: "name",
    selectCapMod: (c) => LocaleX.Parse(c),
    selectVal: "_id",
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Level",
      TC: "等級"
    }),
    name: "level",
    format: "number",
    min: 0,
    defaultValue: 1,
    validate: ["required"]
  }
];

const Info = [
  {
    label: () => LocaleX.Parse({
      EN: "Username",
      TC: "使用者帳號"
    }),
    name: "_id",
    format: "select",
    selectStyle: "dropdown",
    selectRef: "userlist",
    selectCap: "UserDisplayName",
    selectVal: "_id"
  },
  {
    label: () => LocaleX.Parse({
      EN: "Role",
      TC: "身份"
    }),
    name: "role",
    format: "select",
    selectStyle: "dropdown",
    selectRef: "rolelist",
    selectCap: "name",
    selectCapMod: (c) => LocaleX.Parse(c),
    selectVal: "_id"
  },
  {
    label: () => LocaleX.Parse({
      EN: "Level",
      TC: "等級"
    }),
    name: "level",
    format: "number",
    min: 0
  }
];

const Edit = [
  ...Info
];

const Export = [];

const Import = [];

const ImportFormat = [...Export];

const Filter = [];

const AdvFilter = [];

const schema = {
  Table,
  Info,
  Add,
  Edit,
  Export,
  Import,
  ImportFormat,
  Filter,
  AdvFilter
};

export default schema;