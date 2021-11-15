import _ from 'lodash';
import { LocaleConfig } from '__SYSDefault/Locale';

import { Accessor, store } from '.';


class LocaleX {

  /**
   * Get Locale String from LocaleConfig
   * @param {String} accessor 
   * @param {*} mapping replace @[field] to value
   * @returns 
   */
  static Get(accessor, mapping = {}){
    let langO = LocaleConfig.find(o => o.code === store.lang);
    let lib = langO.lib;

    let str = Accessor.Get(lib, accessor);
    if(!_.isEmpty(str) && !_.isString(str)) {
      console.warn("Not Type of String <" + store.lang + ">: " + accessor);
      return str;
    }

    if(_.isEmpty(str)){
      console.warn("No locale ID <" + store.lang + ">: " + accessor);
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
  static Parse(obj, mapping = {}){
    let str = "";
    if(_.isString(obj)){
      str = obj;
    }else{
      if(!obj[store.lang]){
        console.warn("No locale Key <" + store.lang + ">");
        return str;
      }
      str = obj[store.lang];
    }
    
    _.map(mapping, (o, i) => {
      str = str.replace("@" + i, o);
    });

    return str;
  }

}

export default LocaleX;