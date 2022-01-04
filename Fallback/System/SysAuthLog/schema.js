import { Typography } from "@mui/material";
import BMarkdown from "IZOArc/BLOCKS/Display/BMarkdown";
import { HStack } from "IZOArc/LabIZO/Stackizo";
import { LocaleX } from "IZOArc/STATIC";
import codeMap from "./codeMap";

const Table = [
  {
    label: () => LocaleX.Parse({
      EN: "Operations",
      TC: "操作"
    }),
    name: "_id",
    Cell: (doc, field, addOns) => {
      if(codeMap[doc.code]) {
        return LocaleX.Parse(codeMap[doc.code]);
      }
      return "";
    }
  },
  {
    label: () => LocaleX.Parse({
      EN: "Code",
      TC: "代碼"
    }),
    name: "code",
    width: 80,
    Cell: (doc, field, addOns) => field
  },
  {
    label: () => LocaleX.Parse({
      EN: "Affected",
      TC: "影響"
    }),
    name: "affected",
    Cell: (doc, field, addOns) => {
      return JSON.stringify(field);
    }
  },
  {
    label: () => LocaleX.Parse({
      EN: "Reason",
      TC: "原因"
    }),
    name: "reason"
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
      TC: "操作者"
    }),
    name: "createdBy",
    width: 100
  }
];

const Add = [];

const Info = [
  {
    label: () => LocaleX.Parse({
      EN: "Code",
      TC: "代碼"
    }),
    name: "code",
    format: "number"
  },
  {
    label: () => LocaleX.Parse({
      EN: "Operations",
      TC: "操作"
    }),
    name: "code",
    format: "display",
    Custom: (doc, field, addOns) => {
      if(codeMap[field]) {
        return (
          <HStack width="100%" justifyContent="flex-start">
            <Typography>{LocaleX.Parse(codeMap[field])}</Typography>
          </HStack>
        );
      }
      return "";
    }
  },
  {
    label: () => LocaleX.Parse({
      EN: "Affected",
      TC: "影響"
    }),
    name: "affected",
    format: "display",
    Custom: (doc, field, addOns) => {
      if(field) {
        return (
          <HStack width="100%" justifyContent="flex-start">
            <BMarkdown>{"```json\n" + JSON.stringify(field, null, 2) + "\n```"}</BMarkdown>
          </HStack>
        );
      }
      return "";
    }
  },
  {
    label: () => LocaleX.Parse({
      EN: "Reason",
      TC: "原因"
    }),
    name: "reason",
    format: "textarea"
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
      TC: "操作者"
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