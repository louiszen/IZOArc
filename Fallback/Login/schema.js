import { LocaleX } from "IZOArc/STATIC";

const loginName = [
  {
    label: () => LocaleX.GetIZO("Login.form.username"),
    name: "username",
    format: "text",
    validate: ["required"],
    autoFocus: true,
  },
];

const loginPassword = [
  {
    label: () => LocaleX.GetIZO("Login.form.password"),
    name: "password",
    format: "password",
    autoFocus: true,
    validate: ["required"],
  },
];

const loginOTP = [
  {
    label: () => LocaleX.GetIZO("Login.form.EnterOTP"),
    name: "otp",
    format: "password",
    autoFocus: true,
    validate: ["required"],
  },
];

let schema = {
  loginName,
  loginPassword,
  loginOTP
};

export default schema;
