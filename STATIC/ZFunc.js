import _ from "lodash";

class ZFunc {

  /**
   * Execute if it is a function 
   * @param {*} func 
   * @param  {...any} param 
   * @returns 
   */
  static IfFuncExec(func, ...param){
    if(_.isFunction(func)){
      return func(...param);
    }else{
      return func;
    }
  }

}

export default ZFunc;