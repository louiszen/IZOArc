import { LocaleX } from "IZOArc/STATIC";
import _ from "lodash";

const Rules = {
  required: value => !_.isEmpty(value) || !_.isUndefined(value) || _.isNumber(value),
  email: value => !value || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value),
  number: value => !_.isNaN(Number(value) || _.isUndefined(value)),
  plain: value => !value || /^[a-zA-Z0-9_]+$/i.test(value),
  plainSpace: value => !value || /^[a-zA-Z0-9_ -]+$/i.test(value),
  plainAt: value => !value || /^[a-zA-Z0-9_@]+$/i.test(value),
  plainLower: value => !value || /^[a-z0-9_]+$/.test(value),
  boolTrue: value => value === true,
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
  }),
  plain: () => LocaleX.Parse({
    EN: "No spaces or special characters except _",
    TC: "不可包含除 _ 外特殊子元",
  }),
  plainAt: () => LocaleX.Parse({
    EN: "No special characters except @ or _",
    TC: "不可包含除 @ 或 _ 外特殊子元",
  }),
  plainSpace: () => LocaleX.Parse({
    EN: "No special characters except space or _",
    TC: "不可包含除 空格 或 _ 外特殊子元",
  }),
  plainLower: () => LocaleX.Parse({
    EN: "Must be in lowercase, no spaces or special characters except _",
    TC: "只接受小寫字母，不可包含除 _ 外特殊子元",
  }),
  boolTrue: () => LocaleX.Parse({
    EN: "Please check the box if you want to submit this form",
    TC: "你必須勾選這項才可提交表單",
  }),

};

let validates = {
  Rules,
  ErrorMsg
};

export default validates;