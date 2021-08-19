import _ from 'lodash';

const Rules = {
  required: value => !_.isEmpty(value),
  email: value => !value || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value),
  number: value => !value || !isNaN(Number(value)),
  plain: value => !value || /^[a-zA-Z0-9_]+$/i.test(value),
  plainSpace: value => !value || /^[a-zA-Z0-9_ ]+$/i.test(value)
};

const ErrorMsg = {
  required: "Required",
  email: "Invalid email address",
  number: "Must be a number",
  plain: "No spaces and special characters except _",
  plainSpace: "No special characters except _",
}

let validates = {
  Rules,
  ErrorMsg
};

export default validates;