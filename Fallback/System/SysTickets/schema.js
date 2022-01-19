import { Typography } from "@mui/material";
import { ColorX, LocaleX } from "IZOArc/STATIC";

const Table = [
  {
    label: "Req No",
    name: "_id",
    width: 200
  },
  {
    label: () => LocaleX.Parse({
      EN: "Type",
      TC: "種類"
    }),
    width: 150,
    name: "type",
    Cell: (row, field, addOns) => {
      let t = "";
      switch(field){
        case 0: t = {
          EN: "Bug Report",
          TC: "錯誤報告"
        }; break;
        case 1: t = {
          EN: "Request",
          TC: "行動索求"
        }; break;
        default: t = {
          EN: "", 
          TC: ""
        }; break;
      }
      return (
        <Typography>
          {LocaleX.Parse(t)}
        </Typography>
      );
    }
  },
  {
    label: () => LocaleX.Parse({
      EN: "Severity",
      TC: "重要程度"
    }),
    name: "severity",
    width: 150,
    Cell: (row, field, addOns) => {
      let color = "green";
      let c = "";
      switch(field){
        case 0: 
          color = "red"; 
          c = {
            EN: "Urgent",
            TC: "緊急"
          }; 
          break;
        case 1: 
          color = "yellow"; 
          c = {
            EN: "Severe",
            TC: "嚴重"
          };
          break;
        case 2: 
          color = "blue"; 
          c = {
            EN: "Important",
            TC: "重要"
          };
          break;
        default: case 3: 
          color = "green";
          c = {
            EN: "Minor",
            TC: "次要"
          };
          break;
      }
      return (
        <Typography style={{color: ColorX.GetColorCSS(color), fontWeight: "bold"}}>
          {LocaleX.Parse(c)}
        </Typography>
      );
    }
  },
  {
    label: () => LocaleX.Parse({
      EN: "Disicpline",
      TC: "範疇"
    }),
    name: "discipline",
    width: 150
  },
  {
    label: () => LocaleX.Parse({
      EN: "Description",
      TC: "描述"
    }),
    name: "description",
  },
  {
    label: () => LocaleX.Parse({
      EN: "Created At",
      TC: "新增於"
    }),
    name: "createdAt",
    transform: "datetime",
    width: 180
  },
  {
    label: () => LocaleX.Parse({
      EN: "Created By",
      TC: "建立者"
    }),
    name: "createdBy",
    width: 100
  }
];

const Add = [
  {
    label: () => LocaleX.Parse({
      EN: "Severity",
      TC: "重要程度"
    }),
    name: "severity",
    format: "select",
    selectStyle: "dropdown",
    selectRef: [
      {
        cap: {
          EN: "Urgent",
          TC: "緊急"
        },
        val: 0
      },
      {
        cap: {
          EN: "Severe",
          TC: "嚴重"
        },
        val: 1
      },
      {
        cap: {
          EN: "Important",
          TC: "重要"
        },
        val: 2
      },
      {
        cap: {
          EN: "Minor",
          TC: "次要"
        },
        val: 3
      }
    ],
    selectCap: "cap",
    selectVal: "val",
    selectCapMod: (c, v, t) => {
      let color = "green";
      switch(v){
        case 0: color = "red"; break;
        case 1: color = "yellow"; break;
        case 2: color = "blue"; break;
        default: case 3: color = "green"; break;
      }
      return (
        <Typography style={{color: ColorX.GetColorCSS(color), fontWeight: "bold"}}>
          {LocaleX.Parse(c)}
        </Typography>
      );
    },
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Disicpline",
      TC: "範疇"
    }),
    name: "discipline",
    format: "text",
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Description",
      TC: "描述"
    }),
    name: "description",
    format: "textarea",
    rows: 10,
    validate: ["required"]
  }
];

const Info = [
  {
    label: "Req No",
    name: "_id",
    format: "text",
    readOnly: true
  },
  {
    label: () => LocaleX.Parse({
      EN: "Severity",
      TC: "重要程度"
    }),
    name: "severity",
    format: "select",
    selectStyle: "dropdown",
    selectRef: [
      {
        cap: {
          EN: "Urgent",
          TC: "緊急"
        },
        val: 0
      },
      {
        cap: {
          EN: "Severe",
          TC: "嚴重"
        },
        val: 1
      },
      {
        cap: {
          EN: "Important",
          TC: "重要"
        },
        val: 2
      },
      {
        cap: {
          EN: "Minor",
          TC: "次要"
        },
        val: 3
      }
    ],
    selectCap: "cap",
    selectVal: "val",
    selectCapMod: (c, v, t) => {
      let color = "green";
      switch(v){
        case 0: color = "red"; break;
        case 1: color = "yellow"; break;
        case 2: color = "blue"; break;
        default: case 3: color = "green"; break;
      }
      return (
        <Typography style={{color: ColorX.GetColorCSS(color), fontWeight: "bold"}}>
          {LocaleX.Parse(c)}
        </Typography>
      );
    },
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Disicpline",
      TC: "範疇"
    }),
    name: "discipline",
    format: "text",
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Description",
      TC: "描述"
    }),
    name: "description",
    format: "textarea",
    rows: 10,
    validate: ["required"]
  },
  {
    label: () => LocaleX.Parse({
      EN: "Created At",
      TC: "新增於"
    }),
    name: "createdAt",
    format: "date",
    dateType: "datetime"
  },
  {
    label: () => LocaleX.Parse({
      EN: "Created By",
      TC: "建立者"
    }),
    name: "createdBy",
    format: "text"
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