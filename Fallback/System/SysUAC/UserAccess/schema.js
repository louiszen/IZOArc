import { LEDSwitch } from "IZOArc/BLOCKS/Ctrls";
import { HStack } from "IZOArc/LabIZO/Stackizo";
import { StyledButton } from "IZOArc/LabIZO/Stylizo";
import { ColorX, LocaleX } from "IZOArc/STATIC";

const Table = [
  {
    label: " ",
    name: "_id",
    width: 50,
    Cell: (row, field, addOns) => {
      return (
        <LEDSwitch
          field={field}
          ctrl={addOns.projDoc?.SYSAuthCtrl?.Users[field]}
          onCtrlSet={addOns.onCtrlSet}
          />
      );
    },
    filterable: false
  },
  {
    label: () => LocaleX.Parse({
      EN: "Name",
      TC: "顯示名稱"
    }),
    name: "UserDisplayName"
  },
  {
    label: () => LocaleX.Parse({
      EN: "Company",
      TC: "公司"
    }),
    name: "Company",
    Cell: (row, field, addOns) => {
      let company = addOns.companylist.find(o => o._id === field); 
      if(!company) return "";
      return LocaleX.Parse(company.name);
    }
  },
  {
    label: () => LocaleX.Parse({
      EN: "Role",
      TC: "身份"
    }),
    name: "Role",
    Cell: (row, field, addOns) => {
      let role = addOns.rolelist.find(o => o._id === field); 
      if(!role) return "";
      return LocaleX.Parse(role.name);
    }
  }
];

const Add = [
  {
    label: () => LocaleX.Parse({
      EN: "Username",
      TC: "使用者帳號"
    }),
    name: "_id",
    format: "text",
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Password",
      TC: "使用者密碼"
    }),
    name: "password",
    format: "password",
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "User Display Name",
      TC: "使用者顯示名稱"
    }),
    name: "UserDisplayName",
    format: "text",
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Company",
      TC: "公司"
    }),
    name: "Company",
    format: "select",
    selectStyle: "dropdown",
    selectRef: "companylist",
    selectCap: "name",
    selectCapMod: (c) => LocaleX.Parse(c),
    selectVal: "_id",
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Email",
      TC: "電郵"
    }),
    name: "Email",
    format: "text",
    validate: ["required", "email"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Tel No.",
      TC: "電話號碼"
    }),
    name: "TelNo",
    format: "text",
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
      TC: "權限等級"
    }),
    name: "Level",
    format: "number",
    min: 0,
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Project Group",
      TC: "項目組別"
    }),
    name: "ProjectGroup",
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
      EN: "Project Role",
      TC: "項目身份"
    }),
    name: "GroupRole",
    format: "select",
    selectStyle: "dropdown",
    selectRef: "rolelist",
    selectCap: "name",
    selectCapMod: (c) => LocaleX.Parse(c),
    selectVal: "_id",
    validate: ["required"]
  },
];

const Info = [
  {
    label: () => LocaleX.Parse({
      EN: "Username",
      TC: "使用者帳號"
    }),
    name: "_id",
    format: "text",
    readOnly: true
  },
  {
    inject: (formValue, addOns) => {
      return (
        <HStack width={"100%"}>
          <StyledButton theme={{color: "red", hover: {
              color: "white",
              background: ColorX.GetColorCSS("red"),
            }}} 
            onClick={() => addOns.ResetPassword.onClick(addOns.projDoc._id, formValue._id)}>
            {LocaleX.Parse({
              EN: "Reset Password",
              TC: "重設密碼"
            })}
          </StyledButton>
        </HStack>
      );
    }
  },
  {
    label: () => LocaleX.Parse({
      EN: "User Display Name",
      TC: "使用者顯示名稱"
    }),
    name: "UserDisplayName",
    format: "text"
  },
  {
    label: () => LocaleX.Parse({
      EN: "Company",
      TC: "公司"
    }),
    name: "Company",
    format: "select",
    selectStyle: "dropdown",
    selectRef: "companylist",
    selectCap: "name",
    selectCapMod: (c) => LocaleX.Parse(c),
    selectVal: "_id",
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Email",
      TC: "電郵"
    }),
    name: "Email",
    format: "text"
  },
  {
    label: () => LocaleX.Parse({
      EN: "Tel No.",
      TC: "電話號碼"
    }),
    name: "TelNo",
    format: "text"
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
      TC: "權限等級"
    }),
    name: "Level",
    format: "number",
    min: 0
  },
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