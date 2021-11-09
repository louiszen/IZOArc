import _ from 'lodash';
import { Locale } from '__Base/config';
import { Accessor, store } from '.';


class LocaleX {

  static Get(accessor){
    let langO = Locale.find(o => o.code === store.lang);
    let lib = langO.lib;

    let str = Accessor.Get(lib, accessor);
    if(_.isEmpty(str)){
      console.warn("No locale ID: " + accessor);
    }
    return str;

  }

}

export default LocaleX;