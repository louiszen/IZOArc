import _ from "lodash";

import Accessor from "./Accessor";

class ZArray {

  /**
   * 
   * @param {[*]} array 
   * @param {String} accessor 
   */
  static HaveDuplicatedElements(array, accessor){
    return new Set(array.map(o => Accessor.Get(o, accessor))).size !== array.length;
  }

  static Unique(array, accessor, caseSensitive = true){
    let rtn = [];
    let checked = [];
    _.map(array, (o, i) => {
      let value = Accessor.Get(o, accessor);
      if(!caseSensitive) value = typeof(value) === "string" ? value.toLowerCase() : value;
      if(!checked.includes(value)){
        checked.push(value);
        rtn.push(o);
      }
    });
    return rtn;
  }

  static FilterEmpty(array, accessor){
    let rtn = [];
    _.map(array, (o, i) => {
      let value = Accessor.Get(o, accessor);
      if(typeof(value) !== "number" && !_.isEmpty(value)){
        rtn.push(o);
      }
    });
    return rtn;
  }

  static Equals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((o, i) => o === b[i]);
  }
  

}

export default ZArray;