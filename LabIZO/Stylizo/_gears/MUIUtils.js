import { Accessor } from "IZOArc/STATIC";

class MUIUtils {

  static getMappedProps = (func, ...accessors) => 
    (props) => {
      let value;
      for(let i=0; i<accessors.length; i++){
        value = Accessor.Get(props, accessors[i]);
        if(value) break;
      }
      let rtn = func(value);
      if(rtn) return rtn;
      return value;
    };

  static getImportantMappedProps = (func, ...accessors) => 
    (props) => {
      let value;
      for(let i=0; i<accessors.length; i++){
        value = Accessor.Get(props, accessors[i]);
        if(value) break;
      }
      let rtn = func(value);
      if(rtn) return rtn + " !important";
      return value + " !important";
    };

  static getProps = (...accessors) => 
    (props) => {
      let value;
      for(let i=0; i<accessors.length; i++){
        value = Accessor.Get(props, accessors[i]);
        if(value) return value;
      }
    }

  static getImportantProps = (...accessors) => 
    (props) => {
      let value;
      for(let i=0; i<accessors.length; i++){
        value = Accessor.Get(props, accessors[i]);
        if(value) return value + " !important";
      }
    }

  static getMapped = (colorMap, accessor) => {
    let value = Accessor.Get(colorMap, accessor);
    if(value) return value;
    return accessor;
  }

}

export default MUIUtils;