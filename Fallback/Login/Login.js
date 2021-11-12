import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { observer } from 'mobx-react';
import axios from 'axios';
import { Box, IconButton, Link, Typography, Tooltip } from '@material-ui/core';

import schema from './schema';
import { IZOTheme, GateDis } from '__SYSDefault/Theme';
import { DOMAIN } from '__SYSDefault/Domain';
import Version from '__SYSDefault/Version';

import Formizo from 'IZOArc/LabIZO/Formizo';
import { Accessor, store, ColorX, Env, LocaleX } from 'IZOArc/STATIC';
import { VStack, HStack, Spacer } from 'IZOArc/LabIZO/Stackizo';
import { StyledButton, StyledLinearProgress } from 'IZOArc/LabIZO/Stylizo';
import { Language } from '@material-ui/icons';
import { LocaleConfig } from '__SYSDefault/Locale';
import { FirstPage } from '__SYSDefault/Config';

class Login extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(){
    super();
    this.state = {
      username: "",
      userDisplayName: "",
      page: "user",
      loading: false,
      errorMsg: ""
    };
    
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Login.defaultProps))){
      this._setAllStates();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
        return;
    };
  }

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props,
    }), callback);
  }

  onMountForm = (callbacks) => {
    this.MountForm = callbacks;
  }

  _ToggleLanguage = () => {
    let max = LocaleConfig.length;
    let idx = LocaleConfig.findIndex(o => o.code === store.lang);
    idx += 1;
    if(idx >= max) idx = 0;
    let newLang = LocaleConfig[idx].code;
    store.setLang(newLang);
  }

  renderLocale(){
    let langO = LocaleConfig.find(o => o.code === store.lang);
    let langLabel = langO.caption;
    return (
      <HStack width="fit-content" marginX={5}>
        <Tooltip title={LocaleX.Get("__IZO.NavBar.SwitchLang")} arrow={true} placement="bottom">
          <IconButton style={{color: ColorX.GetColorCSS(IZOTheme.menuFG, 1)}} size="small" onClick={() => this._ToggleLanguage()}>
            <Language/>
          </IconButton>
        </Tooltip>
        <Typography style={{width: 60, marginLeft: 5, fontFamily: "Palanquin", fontSize: 14, fontWeight: "bold", color: ColorX.GetColorCSS(IZOTheme.menuFG)}}>
          {langLabel}
        </Typography>
      </HStack>
    );
  }

  _CheckUser = (formProps) => {

    let url = DOMAIN + '/CommonAPI/Auth/CheckUserName';
    let req = {
      ...formProps
    };

    this.setState({
      loading: true
    }, async () => {
      try {
        let res = await axios.post(url, req);
        console.log(res);
        let {Success, payload} = res.data;
        if(Success){
          if(payload.hasUser){

            this.setState({
              page: 'password',
              loading: false,
              username: formProps.username,
              userDisplayName: payload.UserDisplayName
            });
          }else{
            store.Alert(LocaleX.Get("__IZO.Alert.UserNotFound"), "error");
            this.setState({
              loading: false
            });
          }
        }
      }catch(e){
        store.Alert(LocaleX.Get("__IZO.Alert.CannotConnect"), "error");
        this.setState({
          loading: false
        });
      }
    });
  
  }

  _Login = (formProps) => {
    console.log("_signIn");

    let {username} = this.state;
    let url = DOMAIN + '/CommonAPI/Auth/SignIn';

    let req = {
      username: username,
      ...formProps
    };

    this.setState({
      loading: true
    }, async () => {
      try {
        let res = await axios.post(url, req);

        let {Success, payload} = res.data;
        if(Success === true){
          console.log(payload);
          store.setUser(payload);
          store.Alert(LocaleX.Get("__IZO.Alert.SuccessLogin"), "success");
          await Env.CheckInitialized();

          if(!store.isInitialized()){
            this.setState({
              page: "user",
              loading: false
            });
          }
          
        }else{
          store.Alert(LocaleX.Get("__IZO.IncorrectPassword"), "error");
          this.setState({
            loading: false
          });
        }
      }catch(e){
        store.Alert(LocaleX.Get("__IZO.Alert.CannotConnect"), "error");
        this.setState({
          loading: false
        });
      }
    });
  }

  redirectToDashboard = () => {
    if(store.isInitialized){
      setTimeout(() => {
        this.props.history.push(FirstPage);
        store.isLoading(false);
      }, 1000);
    }
  }
  
  renderNextButton(){
    let {loading} = this.state;
    return (
      <VStack width="100%" key="next">
        <StyledButton
          onClick={() => {
            this.MountForm.Submit();
          }}
          theme={{
            label: "white",
            background: loading? ColorX.GetColorCSS(IZOTheme.btnHover) : ColorX.GetColorCSS(IZOTheme.menuFG),
            hover: {
              background: ColorX.GetColorCSS(IZOTheme.btnHover)
            },
            borderRadius: "0px", 
            width: "100%"
          }}
          disabled={loading}>
          <HStack>
            <div>{LocaleX.Get("__IZO.Login.Next")}</div>
            <Spacer/>
            <i className="fas fa-arrow-right"/>
          </HStack>
        </StyledButton>
        { loading &&
          <StyledLinearProgress theme={{bar: ColorX.GetColorCSS(IZOTheme.menuFG), background: ColorX.GetColorCSS(IZOTheme.btnHover)}}/>
        }
      </VStack>
    );
  }

  renderLoginButton(){
    let {loading} = this.state;
    return (
      <VStack width="100%" key="next">
        <StyledButton
          onClick={() => {
            this.MountForm.Submit();
          }}
          theme={{
            label: "white",
            background: loading? ColorX.GetColorCSS(IZOTheme.btnHover) : ColorX.GetColorCSS(IZOTheme.menuFG),
            hover: {
              background: ColorX.GetColorCSS(IZOTheme.btnHover)
            },
            borderRadius: "0px", 
            width: "100%"
          }}
          disabled={loading}>
          <HStack>
            <div>{LocaleX.Get("__IZO.Login.Login")}</div>
            <Spacer/>
            <i className="fas fa-arrow-right"/>
          </HStack>
        </StyledButton>
        { loading &&
          <StyledLinearProgress theme={{bar: ColorX.GetColorCSS(IZOTheme.menuFG), background: ColorX.GetColorCSS(IZOTheme.btnHover)}}/>
        }
      </VStack>
    );
  }

  renderForm(){
    let {page, loading} = this.state;

    return (
      <Formizo
        formID="login"
        height={ 
          page === "user"? "95px" : 
          page === "password"? "95px" :
          "225px"}
        schema={ 
          page === "user"? schema.loginName : 
          page === "password"? schema.loginPassword :
          schema.initial}
        buttons={[
          page === "user"? this.renderNextButton() :
          this.renderLoginButton()
        ]}
        buttonPadding={0}
        onSubmit={
          page === "user"? this._CheckUser : 
          this._Login
        }
        onMounted={this.onMountForm}
        fieldStyle="standard"
        fieldSize="small"
        errorsShowOnHelperText={false}
        theme={{
          textfield: {
            input: ColorX.GetColorCSS(IZOTheme.menuFG),
            background: "transparent",
            line: "transparent"
          }
        }}
        disabled={{loading}}
        />
    );
  }

  backToUser = () => {
    this.setState({
      page: "user",
      username: "",
      userDisplayName: ""
    });
  }

  renderHeaderMessage(){
    let {page, userDisplayName} = this.state;
    switch(page){
      default: case "user": return LocaleX.Get("__IZO.Login.HeaderMessage");
      case "password": return (
        <Link onClick={() => this.backToUser()}>
          {LocaleX.Get("__IZO.Login.Not") + " " + userDisplayName + " ?"}
        </Link>
      );
    }
  }

  renderInside(){
    return (
      <VStack width="100%">
        <Spacer/>
          <HStack>
            <VStack>
              <Box margin={1} width={1}>
              {this.renderHeaderMessage()}
              </Box>
              <Box width="300px" style={{background: "white"}}>
                {this.renderForm()}
              </Box>
            </VStack>
            <Spacer/>
          </HStack>
        <Spacer/>
      </VStack>
    );
  }

  renderEnv(){
    let env = Accessor.Get(store.server, "Env");
    let envStr = env? env.toUpperCase() : "";
    let style = {
      color: ColorX.GetColorCSS("grey", 0.5), 
      fontSize: 9
    };
    return (
      <Box style={{position: "absolute", bottom: 0, left: 0}}>
        <Typography style={style}>
          {"[" + envStr + "]"}
        </Typography>
        <Typography style={style}>
          {"UI Version: " + Version}
        </Typography>
        <Typography style={style}>
          {"Backend Version: " + store.server.backendVersion}
        </Typography>
        <Typography style={style}>
          {"Start Date: " + process.env.REACT_APP_STARTDATE}
        </Typography>
        <Typography style={style}>
          {"Domain: " + DOMAIN}
        </Typography>
      </Box>
    );
  }

  renderLogo(){
    return (
      <VStack spacing="1px" alignItems="center" width="100%" height="100vh">
        <VStack justifyContent="center">
          {GateDis.postRender && GateDis.preRender()}
          <Box style={GateDis.style}>
            <img src={GateDis.src} alt="Logo"/>
          </Box>
          {GateDis.postRender && GateDis.postRender()}
        </VStack>
        {this.renderEnv()}
      </VStack>
    );
  }

  render(){
    return (
      <VStack style={{
          background: ColorX.GetColorCSS("aliceblue"), 
          color: ColorX.GetColorCSS(IZOTheme.menuFG),
          width: "100%"
        }}>
        <Spacer/>
        <HStack spacing="75px">
          {this.renderLogo()}
          {this.renderInside()}
          <Spacer/>
        </HStack> 
        <VStack>
          {this.renderLocale()}
        </VStack>
        <Spacer/>
      </VStack>
    );
  }

}

export default withRouter(observer(Login));
