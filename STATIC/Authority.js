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

  /**
   * 
   * @param {[String]} groups 
   * @param {String} reqGroup 
   * @returns 
   */
  static GroupCheck = (groups, reqGroup) => {
    if(_.isEmpty(reqGroup)) return true;
    return groups.includes(reqGroup) || groups.includes("*");
  }

  /**
   * 
   * @param {String} role 
   * @param {String} reqRole 
   */
  static RoleCheck = (role, reqRole) => {
    if(_.isEmpty(reqRole)) return true;
    return role === reqRole;
  }

  static IsAccessible = (user, reqAuth = "", reqLevel = Number.MAX_SAFE_INTEGER, reqFunc = "", reqGroup = "", reqRole = "") => {
    if(!user) return false;
    let {authority, level, groups, role} = user;
    return this.AuthCheck(authority, reqAuth) 
      && this.LevelCheck(level, reqLevel) 
      && this.FuncCheck(authority, reqAuth, reqFunc)
      && this.GroupCheck(groups, reqGroup)
      && this.RoleCheck(role, reqRole);
  }

  static IsAccessibleQ = (reqAuth = "", reqLevel = Number.MAX_SAFE_INTEGER, reqFunc = "", reqGroup = "", reqRole = "") => {
    return this.IsAccessible(store.user, reqAuth, reqLevel, reqFunc, reqGroup, reqRole);
  }

  static Require(reqAuth = "", reqLevel = Number.MAX_SAFE_INTEGER, reqFunc = [], reqGroup = "", reqRole = ""){
    if(!this.IsAccessibleQ(reqAuth, reqLevel, reqFunc, reqGroup, reqRole)){
      window.location.assign("/Denied");
    }
  }

}

export default Authority;