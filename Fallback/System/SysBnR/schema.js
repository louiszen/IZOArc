import { Typography, Tooltip } from "@mui/material";
import { DeleteOutline, Restore } from "@mui/icons-material";

import SysDBInc from "./SysDBInc";

import { HStack } from "IZOArc/LabIZO/Stackizo";
import { StyledButton } from "IZOArc/LabIZO/Stylizo";
import { ColorX, LocaleX } from "IZOArc/STATIC";

const database = [
  {
    label: () => LocaleX.GetIZO("BnR.Databases"),
    name: "name"
  },
  {
    label: () => LocaleX.GetIZO("BnR.Included"),
    name: "included",
    width: 115,
    Cell: (row, field, addOns) => {
      return <SysDBInc dbname={row.name} included={field} onToggle={addOns.onToggle}/>;
    },
  }
];

const restore = [
  {
    label: () => LocaleX.GetIZO("BnR.Version"),
    name: "name"
  },
  {
    label: " ",
    name: "_id",
    width: 120,
    Cell: (row, field, addOns) => {
      return (
        <StyledButton 
            onClick={() => {
              if(addOns.Restore) {
                addOns.Restore(field);
              }
            }}
            theme={{
              width: 100,
              height: 25,
              color: "purple",
              hover: {
                background: ColorX.GetColorCSS("purple"),
                color: ColorX.GetBGColorCSS("purple")
              }
            }}>
            <HStack spacing={5}>
              <Restore fontSize="small"/>
              <Typography style={{fontSize: 12}}>
                {LocaleX.GetIZO("System.Restore")}
              </Typography>
            </HStack>            
          </StyledButton>
      );
    }
  },
  {
    label: " ",
    name: "",
    width: 50,
    Cell: (row, field, addOns) => {
      return (
        <StyledButton 
          onClick={() => {
            if(addOns.Delete) {
              addOns.Delete(row._id);
            }
          }}
            theme={{
              width: 25,
              minWidth: 25,
              height: 25,
              color: "red",
              hover: {
                background: ColorX.GetColorCSS("red"),
                color: ColorX.GetBGColorCSS("red")
              }
            }}>
            <HStack spacing={5}>
              <Tooltip title="Delete" arrow={true} placement="top">
                <DeleteOutline fontSize="small"/>
              </Tooltip>
            </HStack>            
        </StyledButton>
      );
    }
  }, 
  
];

let schema = {
  database,
  restore
};

export default schema;