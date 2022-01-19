import { Typography } from "@mui/material";
import { ColorX, LocaleX } from "IZOArc/STATIC";

const schema = [
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

export default schema;