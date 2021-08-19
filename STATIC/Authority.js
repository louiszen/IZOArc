import _ from "lodash";
import Accessor from "./Accessor";
import store from "./AppStore";

class Authority {

  static AuthCheck = (authority, reqAuth) => {
    if(_.isEmpty(reqAuth) || Accessor.Get(authority, reqAuth) !== undefined){ //no authority required or authority tree found
      return true;
    }
    return false;
  }

  static LevelCheck = (level, reqLevel) => {
    return level <= reqLevel; //level less is more
  }

  static FuncCheck = (authority, reqAuth, reqFunc) => {
    if(_.isEmpty(reqAuth) || _.isEmpty(reqFunc)) return true; //no required
    let func = Accessor.Get(authority, reqAuth); 
    if(!func || !_.isArray(func)) return false; //no func authority found or format not correct
    if(func.includes("*") || func.includes(reqFunc)) return true; //wild card or included
    return false;
  }

  static IsAccessible = (authority, level, reqAuth = "", reqLevel = 999, reqFunc = "") => {
    return this.AuthCheck(authority, reqAuth) 
      && this.LevelCheck(level, reqLevel) 
      && this.FuncCheck(authority, reqAuth, reqFunc);
  }

  static IsAccessibleQ = (reqAuth = "", reqLevel = 999, reqFunc = "") => {
    return this.IsAccessible(store.user.authority, store.user.level, reqAuth, reqLevel, reqFunc);
  }


  static Require(reqAuth = "", reqLevel = 999, reqFunc = []){
    if(!this.IsAccessibleQ(reqAuth, reqLevel, reqFunc)){
      window.location.assign("/Denied");
    }
  }

}

export default Authority;