import { Accessor, LocaleX } from "IZOArc/STATIC";
import { LEDSwitch } from "IZOArc/BLOCKS/Ctrls";

const Table = [
  {
    label: () => LocaleX.Parse({
      EN: "Endpoints",
      TC: "接口端"
    }),
    name: "api"
  },
  {
    label: " ",
    name: "ctrl",
    width: 50,
    Cell: (doc, field, addOns) => {
      let api = Accessor.Get(doc, "api");
      return (
        <LEDSwitch
          field={api}
          ctrl={field}
          onCtrlSet={addOns.onCtrlSet}
          />
      );
    }
  },
  {
    label: () => LocaleX.Parse({
      EN: "Group",
      TC: "所屬資源群組"
    }),
    name: "req.reqGroup",
    width: 200,
  },
  {
    label: () => LocaleX.Parse({
      EN: "Role",
      TC: "所需權限身份"
    }),
    name: "req.reqRole",
    width: 150,
  },
  {
    label: () => LocaleX.Parse({
      EN: "Authority Node",
      TC: "所需權限節點"
    }),
    name: "req.reqAuth"
  },
  {
    label: () => LocaleX.Parse({
      EN: "Function",
      TC: "所需行動權限"
    }),
    name: "req.reqFunc",
    width: 150,
  },
  {
    label: () => LocaleX.Parse({
      EN: "Level",
      TC: "所需權限等級"
    }),
    width: 100,
    name: "req.reqLevel"
  }
];

const schema = {
  Table
};

export default schema;