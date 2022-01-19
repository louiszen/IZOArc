import _ from "lodash";
import Accessor from "./Accessor";

class QsX {

  /**
   * 
   * @param {String} queryString 
   * @returns {*}
   */
  static Parse(queryString){

    if(_.isEmpty(queryString)) return {};
    let qS = queryString.slice(1);

    let rtn = {};

    let qSSplited = qS.split("&");
    _.map(qSSplited, (o, i) => {
      let splited = o.split("=");
      if(splited.length === 2){
        Accessor.Set(rtn, splited[0], splited[1]);
      }
    });

    return rtn;
  }

}

export default QsX;