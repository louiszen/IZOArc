import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { FormControl, FormHelperText, IconButton, InputAdornment } from "@material-ui/core";

import { Accessor } from "IZOArc/STATIC";
import { StyledInput, StyledTextField } from "IZOArc/LabIZO/Stylizo";

/**
 * @augments {Component<Props, State>}
 */
class FFPassword extends Component {
  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
    iname: PropsType.string.isRequired,

    //root func
    _onValueChange: PropsType.func.isRequired,
    _onBlurInlineSubmit: PropsType.func.isRequired,
    _onInlineSubmit: PropsType.func.isRequired,
    _onFieldFocus: PropsType.func.isRequired,
    _onFieldBlur: PropsType.func.isRequired,

    //disability
    errorsShowOnHelperText: PropsType.bool.isRequired,
    readOnly: PropsType.bool.isRequired,

    //runtime
    formValue: PropsType.object.isRequired,
    formError: PropsType.object.isRequired,

    //style
    ifieldStyle: PropsType.oneOf(["grid", "standard", "filled", "outlined"]).isRequired,

    fieldSize: PropsType.string,
  };

  static defaultProps = {
    ischema: {},
    iname: "",

    _onValueChange: () => {},
    _onBlurInlineSubmit: () => {},
    _onInlineSubmit: () => {},
    _onFieldFocus: () => {},
    _onFieldBlur: () => {},

    errorsShowOnHelperText: true,
    readOnly: false,

    formValue: {},
    formError: {},

    fieldStyle: "grid",
  };

  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  componentDidMount() {
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFPassword.defaultProps))) {
      this._setAllStates();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  _setAllStates = (callback) => {
    this.setState(
      (state, props) => ({
        ...props,
      }),
      () => {
        let { formValue, ischema, iname, _Validate } = this.state;
        let ivalue = Accessor.Get(formValue, iname);
        if (!_.isEmpty(ischema.validate)) {
          _Validate(iname, ivalue, ischema.validate);
        }
        if (callback) callback();
      }
    );
  };

  togglePassword = () => {
    this.setState((state, props) => ({
      showPassword: !state.showPassword,
    }));
  };

  renderInput() {
    let { ischema, iname, formValue, formError, _onValueChange, _onBlurInlineSubmit, _onFieldFocus, _onFieldBlur, errorsShowOnHelperText, readOnly, showPassword, fieldSize, theme } = this.state;
    if (!ischema) return null;

    let ivalue = Accessor.Get(formValue, iname);
    if (ivalue === undefined || ivalue === null) ivalue = "";
    let ierror = Accessor.Get(formError, iname);
    let ireadOnly = ischema.readOnly || readOnly;

    let helperText = ischema.helperText;
    if (errorsShowOnHelperText) {
      helperText = ierror;
    }

    return (
      <FormControl
        error={!_.isEmpty(ierror)}
        disabled={ireadOnly}
        fullWidth={ischema.fullWidth !== false}
        name={iname}
        onChange={(e) => _onValueChange(iname, e.target.value, ischema.validate)}
        onFocus={(e) => {
          _onFieldFocus();
        }}
        onBlur={(e) => {
          _onFieldBlur();
          _onBlurInlineSubmit(iname);
        }}
      >
        <StyledInput
          value={ivalue}
          placeholder={ischema.placeholder}
          startAdornment={ischema.before}
          endAdornment={[
            ischema.after,
            <InputAdornment position="end" key="showPassword">
              <IconButton className="formizo-h-m" aria-label="toggle password visibility" onClick={() => this.togglePassword()} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>,
          ]}
          type={showPassword ? "text" : "password"}
          size={fieldSize}
          theme={theme && theme.textfield}
        />
        {!_.isEmpty(helperText) && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }

  renderTextField() {
    let { ischema, iname, formValue, formError, _onValueChange, _onBlurInlineSubmit, _onFieldFocus, _onFieldBlur, errorsShowOnHelperText, ifieldStyle, readOnly, showPassword, fieldSize, theme, addOns } =
      this.state;
    if (!ischema) return null;
    let label = _.isFunction(ischema.label)? ischema.label(formValue, addOns) : ischema.label;

    let ivalue = Accessor.Get(formValue, iname);
    if (ivalue === undefined || ivalue === null) ivalue = "";
    let ierror = Accessor.Get(formError, iname);
    let ireadOnly = ischema.readOnly || readOnly;

    let helperText = ischema.helperText;
    if (errorsShowOnHelperText) {
      helperText = ierror;
    }

    return (
      <StyledTextField
        value={ivalue}
        label={label || ""}
        helperText={helperText || ""}
        placeholder={ischema.placeholder || ""}
        onChange={(e) => _onValueChange(iname, e.target.value, ischema.validate)}
        onFocus={(e) => {
          _onFieldFocus();
        }}
        onBlur={(e) => {
          _onFieldBlur();
          _onBlurInlineSubmit(iname);
        }}
        name={iname}
        variant={ifieldStyle}
        fullWidth={ischema.fullWidth !== false}
        error={!_.isEmpty(ierror)}
        disabled={ireadOnly}
        InputProps={{
          startAdornment: ischema.before,
          endAdornment: [
            ischema.after,
            <InputAdornment position="end" key="showpassword">
              <IconButton className="formizo-h-m" aria-label="toggle password visibility" onClick={() => this.togglePassword()} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>,
          ],
        }}
        type={showPassword ? "text" : "password"}
        size={fieldSize}
        theme={theme && theme.textfield}
        autoFocus={ischema.autoFocus || false}
      />
    );
  }

  render() {
    let { ischema, ifieldStyle } = this.state;
    if (!ischema) {
      return null;
    }
    if (ifieldStyle === "grid") {
      return this.renderInput();
    } else {
      return this.renderTextField();
    }
  }
}

export default FFPassword;
