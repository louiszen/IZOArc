import { ColorX } from "IZOArc/STATIC";
import { IZOTheme } from "__Base/config";

const Tail = {
  padding: "0 !important",
  borderRadius: "0px",
  textTransform: "none",
  position: "relative"
};

const originTheme = {
  color: ColorX.GetColorCSS(IZOTheme.menuFG),
  background: ColorX.GetColorCSS("black"),
  hover: {
    color: ColorX.GetColorCSS("black"),
    background: ColorX.GetColorCSS("pureWhite"),
  },
  ...Tail
};

const inPageTheme = {
  background: ColorX.GetColorCSS("pureWhite"),
  label: ColorX.GetColorCSS(IZOTheme.menuFG),
  hover: {
    color: ColorX.GetColorCSS("black"),
    background: ColorX.GetColorCSS("pureWhite"),
  },
  ...Tail
};

const disabledTheme = {
  color: ColorX.GetColorCSS("grey"),
  background: ColorX.GetColorCSS("black"),
  hover: {
    color: ColorX.GetColorCSS("grey"),
    background: ColorX.GetColorCSS("black"),
  },
  ...Tail
}

const submenuTheme = {
  color: ColorX.GetColorCSS(IZOTheme.menuFG, 0.6),
  background: ColorX.GetColorCSS("black"),
  hover: {
    color: ColorX.GetColorCSS("black"),
    background: ColorX.GetColorCSS("pureWhite"),
  },
  ...Tail
}

const inPageSubmenuTheme = {
  background: ColorX.GetColorCSS("pureWhite"),
  label: ColorX.GetColorCSS(IZOTheme.menuFG, 0.6),
  hover: {
    color: ColorX.GetColorCSS("black"),
    background: ColorX.GetColorCSS("pureWhite"),
  },
  ...Tail
};

let theme = {
  originTheme,
  inPageTheme,
  disabledTheme,
  submenuTheme,
  inPageSubmenuTheme
}

export default theme;