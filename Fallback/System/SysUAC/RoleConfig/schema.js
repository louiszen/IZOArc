import { LocaleX } from "IZOArc/STATIC";
import { LEDSwitch } from "IZOArc/BLOCKS/Ctrls";

const Table = [
  {
    label: " ",
    name: "_id",
    width: 50,
    Cell: (row, field, addOns) => {
      return (
        <LEDSwitch
          field={field}
          ctrl={addOns.projDoc?.SYSAuthCtrl?.Roles[field]}
          onCtrlSet={addOns.onCtrlSet}
          />
      );
    },
    filterable: false
  },
  {
    label: () => LocaleX.Parse({
      EN: "Role",
      TC: "身份"
    }),
    name: "name",
    Cell: (row, field, addOns) => LocaleX.Parse(field),
  }
];

const Add = [
  {
    label: "ID",
    name: "_id",
    format: "text",
    validate: ["required", "plain"]
  },
  {
    label: "English Display",
    name: "name.EN",
    format: "text",
    validate: ["required"]
  },
  {
    label: "中文顯示",
    name: "name.TC",
    format: "text",
    validate: ["required"]
  }
];

const Info = [
  {
    label: "ID",
    name: "_id",
    format: "text",
    readOnly: true
  },
  {
    label: "English Display",
    name: "name.EN",
    format: "text",
    validate: ["required"]
  },
  {
    label: "中文顯示",
    name: "name.TC",
    format: "text",
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