import { LocaleX } from "IZOArc/STATIC";
import _ from "lodash";

const Rules = {
  required: value => !_.isEmpty(value) || _.isNumber(value),
  email: value => !value || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value),
  number: value => !value || !isNaN(Number(value)),
  plain: value => !value || /^[a-zA-Z0-9_]+$/i.test(value),
  plainSpace: value => !value || /^[a-zA-Z0-9_ ]+$/i.test(value)
};

const ErrorMsg = {
  required: () => LocaleX.Parse({
    EN: "Required",
    TC: "必需填寫"
  }),
  email: () => LocaleX.Parse({
    EN: "Invalid email address",
    TC: "無效的Email格式"
  }),
  number: () => LocaleX.Parse({
    EN: "Must be a number",
    TC: "必需為數字"
  }) ,
  plain: () => LocaleX.Parse({
    EN: "No spaces or special characters except _",
    TC: "不可包含除 _ 外 空格 或 特殊子元",
  }),
  plainSpace: () => LocaleX.Parse({
    EN: "No special characters except space or _",
    TC: "不可包含除 空格 或 _ 外特殊子元",
  }),
};

let validates = {
  Rules,
  ErrorMsg
};

export default validates;