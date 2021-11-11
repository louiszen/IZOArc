import { Typography, Tooltip } from "@material-ui/core";
import { DeleteOutline, Restore } from "@material-ui/icons";

import SysDBInc from "./SysDBInc";

import { HStack } from "IZOArc/LabIZO/Stackizo";
import { StyledButton } from "IZOArc/LabIZO/Stylizo";
import { ColorX } from "IZOArc/STATIC";

const database = [
  {
    label: "Databases",
    name: "name"
  },
  {
    label: "Included",
    name: "included",
    width: 115,
    Cell: (row, field, addOns) => {
      return <SysDBInc dbname={row.name} included={field} onToggle={addOns.onToggle}/>;
    },
  }
];

const restore = [
  {
    label: "Version",
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
                Restore
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
        <Tooltip title="Delete" arrow={true} placement="top">
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
              <DeleteOutline fontSize="small"/>
            </HStack>            
          </StyledButton>
        </Tooltip>
      );
    }
  }, 
  
];

let schema = {
  database,
  restore
};

export default schema;