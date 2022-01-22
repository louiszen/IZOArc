import _ from "lodash";
import Accessor from "./Accessor";
import STORE from "./AppStore";

class AuthX {

  static AuthCheck(authority, reqAuth){
    if(_.isEmpty(reqAuth) || Accessor.Get(authority, reqAuth) !== undefined){ //no authority required or authority tree found
      return true;
    }
    return false;
  }

  static LevelCheck(level, reqLevel){
    if(reqLevel === -1) return true;
    return level <= reqLevel; //level less is more
  }

  static FuncCheck(authority, reqAuth, reqFunc){
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
  static GroupCheck(groups, reqGroup){
    if(_.isEmpty(reqGroup)) return true;
    return groups.includes(reqGroup) || groups.includes("*");
  }

  /**
   * 
   * @param {String} role 
   * @param {String} reqRole 
   */
  static RoleCheck(role, reqRole){
    if(_.isEmpty(reqRole)) return true;
    if(_.isArray(reqRole)){
      return reqRole.includes(role);
    }
    return role === reqRole;
  }

  static IsAccessible(user, reqAuth = "", reqLevel = Number.MAX_SAFE_INTEGER, reqFunc = "", reqGroup = "", reqRole = "", DEBUG = false){
    if(!user) return false;
    let {authority, level, groups, role} = user;
    let check = {G: false, A: false, L: false, F: false, R: false};
    
    if(_.isEmpty(reqGroup)){
      check.G = true;
      check.A = this.AuthCheck(authority, reqAuth) 
      check.L = this.LevelCheck(level, reqLevel) 
      check.F = this.FuncCheck(authority, reqAuth, reqFunc)
      check.R = this.RoleCheck(role, reqRole);
    }else{
      let group = groups.find(o => o.ID === reqGroup);
      if(!group) {
        check.G = false;
        return false;
      }
      check.G = true;
      check.A = this.AuthCheck(group.authority, reqAuth) 
      check.L = this.LevelCheck(level, reqLevel)
      check.F = this.FuncCheck(group.authority, reqAuth, reqFunc)
      check.R = this.RoleCheck(group.role, reqRole);
    }

    if(DEBUG){
      console.log(check);
    }
    let {G, A, L, F, R} = check;
    return G && A && L && F && R;
  }

  static Pass(reqAuth = "", reqLevel = Number.MAX_SAFE_INTEGER, reqFunc = "", reqGroup = "", reqRole = "", DEBUG = false){
    return this.IsAccessible(STORE.user, reqAuth, reqLevel, reqFunc, reqGroup, reqRole, DEBUG);
  }

  static PassF(reqAuth = "", reqFunc = "", reqGroup = "", reqRole = "", reqLevel = Number.MAX_SAFE_INTEGER, DEBUG = false){
    return this.IsAccessible(STORE.user, reqAuth, reqLevel, reqFunc, reqGroup, reqRole, DEBUG);
  }

  static PassR(reqRole = "", reqAuth = "", reqFunc = "", reqGroup = "",  reqLevel = Number.MAX_SAFE_INTEGER, DEBUG = false){
    return this.IsAccessible(STORE.user, reqAuth, reqLevel, reqFunc, reqGroup, reqRole, DEBUG);
  }

  static PassG(reqGroup = "", reqAuth = "", reqFunc = "", reqRole = "", reqLevel = Number.MAX_SAFE_INTEGER, DEBUG = false){
    return this.IsAccessible(STORE.user, reqAuth, reqLevel, reqFunc, reqGroup, reqRole, DEBUG);
  }

  static PassL(reqLevel = Number.MAX_SAFE_INTEGER, reqAuth = "", reqFunc = "", reqGroup = "", reqRole = "", DEBUG = false){
    return this.IsAccessible(STORE.user, reqAuth, reqLevel, reqFunc, reqGroup, reqRole, DEBUG);
  }

  static AuthCheckQ(reqAuth){
    return this.AuthCheck(STORE.user.authority, reqAuth);
  }

  static LevelCheckQ(reqLevel){
    return this.LevelCheck(STORE.user.level, reqLevel);
  }

  static FuncCheckQ(reqAuth, reqFunc){
    return this.FuncCheck(STORE.user.authority, reqAuth, reqFunc);
  }

  static GroupCheckQ(reqGroup){
    return this.GroupCheck(STORE.user.groups, reqGroup);
  }

  static RoleCheckQ(reqRole){
    return this.RoleCheck(STORE.user.role, reqRole);
  }

  static Require(reqAuth = "", reqLevel = Number.MAX_SAFE_INTEGER, reqFunc = [], reqGroup = "", reqRole = ""){
    if(!this.Pass(reqAuth, reqLevel, reqFunc, reqGroup, reqRole)){
      window.location.assign("/Denied");
    }
  }

}

export default AuthX;