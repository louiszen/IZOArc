import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { observer } from 'mobx-react';
import axios from 'axios';
import _ from 'lodash';
import { Box, Link, Typography } from '@material-ui/core';

import schema from './schema';
import { IZOTheme, GateDis } from '__SYSDefault/Theme';
import { DOMAIN } from '__SYSDefault/Domain';
import Version from '__SYSDefault/Version';

import Formizo from 'IZOArc/LabIZO/Formizo';
import { Accessor, STORE, ColorX, Env, LocaleX } from 'IZOArc/STATIC';
import { VStack, HStack, Spacer } from 'IZOArc/LabIZO/Stackizo';
import { StyledButton, StyledLinearProgress } from 'IZOArc/LabIZO/Stylizo';
import { FirstPage, StartDate } from '__SYSDefault/Config';
import { CheckUserNameAPI, SignInAPI } from '__SYSDefault/SysAPI';
import { Password, Window, GitHub, Facebook, Instagram, Twitter, Google, LinkedIn} from '@mui/icons-material';
import { LangToggler } from 'IZOArc/BLOCKS';
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
      page: "method",
      loading: false,
      errorMsg: ""
    };
    
  }

  componentDidMount(){
    this._setAllStates(() => {
      if(STORE.onlyUsernamePassword()){
        this.toUser();
      }
    });
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

  _CheckUser = (formProps) => {

    let url = DOMAIN + CheckUserNameAPI;
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
            STORE.Alert(LocaleX.Get("__IZO.Alert.UserNotFound"), "error");
            this.setState({
              loading: false
            });
          }
        }
      }catch(e){
        STORE.Alert(LocaleX.Get("__IZO.Alert.CannotConnect"), "error");
        this.setState({
          loading: false
        });
      }
    });
  
  }

  _SignInByUP = (formProps) => {
    console.log("_signIn");

    let {username} = this.state;
    let url = DOMAIN + SignInAPI;

    let req = {
      username: username,
      method: "Username-Password",
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
          STORE.setUser(payload);
          STORE.Alert(LocaleX.Get("__IZO.Alert.SuccessLogin"), "success");
          await Env.CheckInitialized();

          if(!STORE.isInitialized()){
            this.setState({
              page: "method",
              loading: false
            });
          }
          
        }else{
          STORE.Alert(LocaleX.Get("__IZO.IncorrectPassword"), "error");
          this.setState({
            loading: false
          });
        }
      }catch(e){
        STORE.Alert(LocaleX.Get("__IZO.Alert.CannotConnect"), "error");
        this.setState({
          loading: false
        });
      }
    });
  }

  redirectToDashboard = () => {
    if(STORE.isInitialized){
      setTimeout(() => {
        this.props.history.push(FirstPage);
        STORE.isLoading(false);
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
        height={"95px"}
        schema={ 
          page === "user"? 
          schema.loginName 
          : schema.loginPassword}
        buttons={[
          page === "user"? 
          this.renderNextButton() 
          : this.renderLoginButton()
        ]}
        buttonPadding={0}
        onSubmit={
          page === "user"? 
          this._CheckUser 
          : this._SignInByUP
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

  toUser = () => {
    this.setState({
      page: "user",
      username: "",
      userDisplayName: ""
    });
  }

  toMethod = () => {
    this.setState({
      page: "method",
      username: "",
      userDisplayName: ""
    });
  }

  renderHeaderMessage(){
    let {page, userDisplayName} = this.state;
    switch(page){
      default: case "user": return LocaleX.Get("__IZO.Login.HeaderMessage");
      case "password": return (
        <Link onClick={() => this.toUser()}>
          {LocaleX.Get("__IZO.Login.Not") + " " + userDisplayName + " ?"}
        </Link>
      );
      case "method": return LocaleX.Get("__IZO.Login.WhichMethod");
    }
  }

  renderOtherAuth(){
    if(!STORE.onlyUsernamePassword()){
      return (
        <Link onClick={() => this.toMethod()}>
          {LocaleX.Get("__IZO.Login.OtherMethod")}
        </Link>
      );
    }
  }

  renderLoginBox(){
    return (
      <VStack width="100%">
        <Spacer/>
        <HStack>
          <VStack spacing={10}>
            <HStack marginY={3} width={1}>
              {this.renderHeaderMessage()}
              <Spacer/>
            </HStack>
            <Box width="300px" style={{background: "white"}}>
              {this.renderForm()}
            </Box>
            <HStack>
              {this.renderOtherAuth()}
              <Spacer/>
            </HStack>
          </VStack>
          <Spacer/>
        </HStack>
        <Spacer/>
      </VStack>
    );
  }

  renderMethodButton(icon, caption, func){
    let {loading} = this.state;
    return (
      <StyledButton onClick={() => {if(func){ func(); }}}
        theme={{
          label: "white",
          background: loading? ColorX.GetColorCSS(IZOTheme.btnHover) : ColorX.GetColorCSS(IZOTheme.menuFG),
          hover: {
            background: ColorX.GetColorCSS(IZOTheme.btnHover)
          },
          borderRadius: "0px", 
          textTransform: "none",
          width: 300
        }}>
        <HStack spacing={20}>
          {icon}
          <Spacer/>
          <Typography>
            {caption}
          </Typography>
          <Spacer/>
        </HStack>
      </StyledButton>
    )
  }

  renderMethod(o){
    switch(o){
      default: return;
      case "Username-Password": 
        return this.renderMethodButton(
          <Password/>, 
          LocaleX.Get("__IZO.Login.Methods.UsernamePassword"), 
          this.toUser);
      case "MSAL": 
        return this.renderMethodButton(
          <Window/>, 
          LocaleX.Get("__IZO.Login.Methods.MSAL"), 
          () => {});
      case "GitHub": 
        return this.renderMethodButton(
          <GitHub/>, 
          LocaleX.Get("__IZO.Login.Methods.GitHub"), 
          () => {});
      case "Facebook": 
        return this.renderMethodButton(
          <Facebook/>, 
          LocaleX.Get("__IZO.Login.Methods.Facebook"), 
          () => {});
      case "Instagram": 
        return this.renderMethodButton(
          <Instagram/>, 
          LocaleX.Get("__IZO.Login.Methods.Instagram"), 
          () => {});
      case "Twitter": 
        return this.renderMethodButton(
          <Twitter/>, 
          LocaleX.Get("__IZO.Login.Methods.Twitter"), 
          () => {});
      case "Google": 
        return this.renderMethodButton(
          <Google/>, 
          LocaleX.Get("__IZO.Login.Methods.Google"), 
          () => {});
      case "LinkedIn": 
        return this.renderMethodButton(
          <LinkedIn/>, 
          LocaleX.Get("__IZO.Login.Methods.LinkedIn"), 
          () => {});
    }
  }

  renderAuthenticationMethods(){
    let methods = _.isArray(STORE.server.Authentication)? STORE.server.Authentication : [STORE.server.Authentication];
    return (
      <VStack width="100%">
        <Spacer/>
        <HStack>
          <VStack spacing={10}>
            <HStack marginY={3} width={1}>
              {this.renderHeaderMessage()}
              <Spacer/>
            </HStack>
            <VStack spacing={5}>
              {_.map(methods, (o, i) => {
                return this.renderMethod(o);
              })}
            </VStack>
          </VStack>
          <Spacer/>
        </HStack>
        <Spacer/>
      </VStack>
    );
  }

  renderInside(){
    let {page} = this.state;
    return (
      <VStack spacing={5} width="70%" height="100%">
        <HStack marginY={1}>
          <LangToggler/>
          <Spacer/>
        </HStack>
        {
          page === "method"?
          this.renderAuthenticationMethods():
          this.renderLoginBox()
        }
      </VStack>
    );
  }

  renderEnv(){
    let env = Accessor.Get(STORE.server, "Env");
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
          {"Backend Version: " + STORE.server.backendVersion}
        </Typography>
        <Typography style={style}>
          {"Start Date: " + StartDate}
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
          {GateDis.preRender}
          <Box style={GateDis.style}>
            <img src={GateDis.src} alt="Logo" style={{width: "100%"}}/>
          </Box>
          {GateDis.postRender}
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
        <Spacer/>
      </VStack>
    );
  }

}

export default withRouter(observer(Login));
