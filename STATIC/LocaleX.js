import _ from 'lodash';
import { LocaleConfig } from '__SYSDefault/Locale';

import { Accessor, store } from '.';


class LocaleX {

  static Get(accessor){
    let langO = LocaleConfig.find(o => o.code === store.lang);
    let lib = langO.lib;

    let str = Accessor.Get(lib, accessor);
    if(_.isEmpty(str)){
      console.warn("No locale ID <" + store.lang + ">: " + accessor);
    }
    return str;

  }

}

export default LocaleX;