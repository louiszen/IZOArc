import { LocaleX } from "IZOArc/STATIC";

const Table = [
  {
    label: () => LocaleX.Parse({
      EN: "Resources Group",
      TC: "資源組"
    }),
    name: "ID",
    Cell: (row, field, addOns) => {
      let group = addOns.grouplist.find(o => o._id === field); 
      if(!group) return "";
      return LocaleX.Parse(group.name);
    }
  },
  {
    label: () => LocaleX.Parse({
      EN: "Role",
      TC: "身份"
    }),
    name: "Role",
    Cell: (row, field, addOns) => {
      let group = addOns.grouplist.find(o => o._id === row.ID); 
      if(!group) return "";
      let groupuser = group.users.find(o => o.username === addOns.selectedUserDoc._id);
      if(!groupuser) return "";
      let role = addOns.rolelist.find(o => o._id === groupuser.role); 
      if(!role) return "";
      return LocaleX.Parse(role.name);
    }
  }
];

const Add = [
  {
    label: () => LocaleX.Parse({
      EN: "Resources Group",
      TC: "資源組"
    }),
    name: "ID",
    format: "select",
    selectStyle: "dropdown",
    selectRef: "grouplist",
    selectCap: "name",
    selectCapMod: (c) => LocaleX.Parse(c),
    selectVal: "_id",
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Role",
      TC: "身份"
    }),
    name: "Role",
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
    name: "Level",
    format: "number",
    min: 0,
    defaultValue: 1,
    validate: ["required"]
  }
];

const Info = [
  {
    label: () => LocaleX.Parse({
      EN: "Resources Group",
      TC: "資源組"
    }),
    name: "ID",
    format: "select",
    selectStyle: "dropdown",
    selectRef: "grouplist",
    selectCap: "name",
    selectCapMod: (c) => LocaleX.Parse(c),
    selectVal: "_id",
    readOnly: true
  },
  {
    label: () => LocaleX.Parse({
      EN: "Role",
      TC: "身份"
    }),
    name: "Role",
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
    name: "Level",
    format: "number",
    min: 0,
    defaultValue: 1,
    validate: ["required"]
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