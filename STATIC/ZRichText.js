import _ from "lodash";
import Accessor from "./Accessor";

class ZRichText {

  static IsRichText(obj){
    let eState = Accessor.Get(obj, "_editorState");
    if(!_.isEmpty(eState)) return true;
    return false;
  }

  static ToHTML(obj){
    return obj.toString('html');
  }

}

export default ZRichText;