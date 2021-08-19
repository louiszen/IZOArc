import _ from "lodash";
import Accessor from "./Accessor";

class QueryString {

  static Parse(queryString){

    let qS = queryString.slice(1);
    console.log(qS);

    let rtn = {};

    let qSSplited = qS.split('&');
    _.map(qSSplited, (o, i) => {
      let splited = qS.split('=');
      if(splited.length === 2){
        Accessor.Set(rtn, splited[0], splited[1]);
      }
    });

    return rtn;
  }

}

export default QueryString;