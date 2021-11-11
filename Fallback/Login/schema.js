import { LocaleX } from "IZOArc/STATIC";

const loginName = [
  {
    label: () => LocaleX.Get("Login.form.username"),
    name: "username",
    format: "text",
    validate: ["required"],
    autoFocus: true,
  },
];

const loginPassword = [
  {
    label: () => LocaleX.Get("Login.form.password"),
    name: "password",
    format: "password",
    autoFocus: true,
  },
];

let schema = {
  loginName,
  loginPassword
};

export default schema;
