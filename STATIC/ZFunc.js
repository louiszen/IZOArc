import _ from "lodash";

class ZFunc {

  static IfFuncExec(func){
    if(_.isFunction(func)){
      return func();
    }else{
      return func;
    }
  }

}

export default ZFunc;