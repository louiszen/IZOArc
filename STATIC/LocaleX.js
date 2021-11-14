import _ from 'lodash';
import { LocaleConfig } from '__SYSDefault/Locale';

import { Accessor, store } from '.';


class LocaleX {

  /**
   * 
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
    
    _.map(mapping, (o, i) => {
      str = str.replace("@" + i, o);
    });

    if(_.isEmpty(str)){
      console.warn("No locale ID <" + store.lang + ">: " + accessor);
    }
    return str;

  }

}

export default LocaleX;