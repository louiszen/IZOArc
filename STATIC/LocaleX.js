import _ from "lodash";
import { LocaleConfig } from "__SYSDefault/Locale";

import { Accessor, STORE } from ".";

class LocaleX {

  static GetIZO(accessor, mapping = {}, lang = STORE.lang){
    return this.Get("__IZO." + accessor, mapping, lang = STORE.lang);
  }

  /**
   * Get Locale String from LocaleConfig
   * @param {String} accessor 
   * @param {*} mapping replace @[field] to value
   * @returns 
   */
  static Get(accessor, mapping = {}, lang = STORE.lang){
    let langO = LocaleConfig.find(o => o.code === lang);
    let lib = langO.lib;

    let str = Accessor.Get(lib, accessor);
    if(!_.isEmpty(str) && !_.isString(str)) {
      console.warn("Not Type of String <" + lang + ">: " + accessor);
      return str;
    }

    if(_.isEmpty(str)){
      console.warn("No locale ID <" + lang + ">: " + accessor);
      return str;
    }
    
    _.map(mapping, (o, i) => {
      str = str.replace("@" + i, o);
    });

    return str;

  }

  /**
   * 
   * @param {Object.<string, String>} obj 
   * @param {*} mapping 
   * @returns 
   */
  static Parse(obj, mapping = {}, lang = STORE.lang){
    let str = "";
    if(!obj) return "";
    if(_.isString(obj)){
      str = obj;
    }else{
      if(!obj[lang]){
        console.warn("No locale Key <" + lang + ">");
        return str;
      }
      str = obj[lang];
    }
    
    _.map(mapping, (o, i) => {
      str = str.replace("@" + i, o);
    });

    return str;
  }

}

export default LocaleX;