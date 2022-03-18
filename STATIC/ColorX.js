import _ from "lodash";

class ColorX {

  /**
   * @typedef {{
   *  r: Number,
   *  g: Number,
   *  b: Number,
   *  a: Number
   * }} color
   */

  /**
   * @type {Object<string, color>}
   */
  static __staticColor = {
    transparent: {r: 0, g: 0, b: 0, a: 0},
    aliceblue: {r: 240, g: 248, b: 255, a: 1},
    
    //company
    elainOrange: {r: 242, g: 132, b: 62, a: 1},
    elainOrangeDark: {r: 142, g: 67, b: 35, a: 1},

    //cell color fg
    black: {r: 29, g: 29, b: 29, a: 1},
    white: {r: 255, g: 255, b: 255, a: 1},
    green: {r: 85, g: 136, b: 38, a: 1},
    red: {r: 163, g: 1, b: 8, a: 1},
    yellow: {r: 157, g: 88, b: 22, a: 1},
    gold: {r: 230, g: 200, b: 0, a: 1},
    blue: {r: 74, g: 98, b: 136, a: 1},
    purple: {r: 171, g: 84, b: 211, a: 1},
    grey: {r: 80, g: 80, b: 80, a: 1},
    orange: {r: 212, g: 120, b: 0, a: 1},
    
    //cell color bg
    bgTransparent: {r: 0, g: 0, b: 0, a: 0},
    bgDark: {r: 29, g: 25, b: 25, a: 1},
    bgBlack: {r: 29, g: 29, b: 29, a: 1},
    bgWhite: {r: 255, g: 255, b: 255, a: 1},
    bgGreen: {r: 198, g: 239, b: 206, a: 1},
    bgRed: {r: 255, g: 199, b: 206, a: 1},
    bgYellow: {r: 255, g: 235, b: 156, a: 1},
    bgLightYellow: {r: 255, g: 245, b: 206, a: 1},
    bgBlue: {r: 155, g: 194, b: 230, a: 1},
    bgPurple: {r: 250, g: 198, b: 255, a: 1},
    bgGrey: {r: 197, g: 197, b: 197, a: 1},
    bgOrange: {r: 255, g: 220, b: 191, a: 1},
    bgLightBlue: {r: 175, g: 214, b: 250, a: 1},

    //alert
    Success: {r: 76, g: 175, b: 80, a: 1},
    Warn: {r: 255, g: 152, b: 0, a: 1},
    Info: {r: 33, g: 150, b: 243, a: 1},
    Error: {r: 244, g: 67, b: 54, a: 1},

    //special meaning
    Warning: {r: 255, g: 220, b: 0, a: 1},

    //light | dark
    lightRed: {r: 200, g: 0, b: 0, a: 1},
    darkBox: {r: 60, g: 60, b: 60, a: 1},
    darkRed: {r: 140, g: 1, b: 8, a: 1},
    greyOut: {r: 160, g: 160, b: 160, a: 1},
    lightGrey: {r: 220, g: 220, b: 220, a: 1},
    lightGreen: {r: 160, g: 255, b: 160, a: 1},

    //pure
    pureRed: {r: 255, g: 0, b: 0, a: 1},
    pureGreen: {r: 0, g: 255, b: 0, a: 1},
    pureBlue: {r: 0, g: 0, b: 255, a: 1},
    pureYellow: {r: 255, g: 255, b: 0, a: 1},
    pureCyan: {r: 0, g: 255, b: 255, a: 1},
    pureMagenta: {r: 255, g: 0, b: 255, a: 1},
    pureWhite: {r: 255, g: 255, b: 255, a: 1},
    pureDark: {r: 0, g: 0, b: 0, a: 1},
  };

  /**
   * @type {Object.<string, [{
   *  percent: Number,
   *  color: color
   * }]}
   */
  static __gradient = {
    fantasticBlue: [
      {
        percent: 0,
        color: {r: 67, g: 169, b: 223, a: 1}
      },
      {
        percent: 75.75,
        color: {r: 31, g: 103, b: 176, a: 1}
      },
      {
        percent: 100,
        color: {r: 31, g: 103, b: 176, a: 1}
      },
    ]
  }

  /**
   * 
   * @param {String | color} name 
   * @param {Number} a 
   * @returns {color}
   */
  static GetColor(name, a = undefined){
    if(!name) return undefined;

    if(_.isString(name)){
      if(!ColorX.__staticColor[name]) {
        return undefined;
      }
      if(a === null || a === undefined){
        return ColorX.__staticColor[name];
      }
      return {...ColorX.__staticColor[name], a};
    }

    if(_.isObject(name)){
      if(a){
        return {...name, a}; 
      }
      return {...name}; 
    }
  }

  /**
   * Get the color from the mapping
   * @param {String | color} name 
   * @param {Number} a 
   * @returns
   */
  static GetColorCSS(name, a = undefined){
    let color = ColorX.GetColor(name, a);
    return ColorX.toCSS(color);
  }

  /**
   * Get the color with bgXxxx 
   * @param {String | color} name 
   * @param {Number} a 
   * @returns 
   */
  static GetBGColorCSS(name, a = undefined){
    if(!name) return undefined;

    if(_.isString(name)){
      let _name = "bg" + name.charAt(0).toUpperCase() + name.slice(1);
      return ColorX.GetColorCSS(_name, a);
    }

    if(_.isObject(name)){
      return ColorX.GetColorCSS(name, a);
    }
  }

  /**
   * Preset 0.2 alpha
   * @param {String | color} name 
   * @returns 
   */
  static GetBorderColorCSS(name){
    if(!name) return undefined;
    return ColorX.GetColorCSS(name, 0.2);
  }

  /**
   * Preset "0 0 2px 2px", alpha 0.2
   * @param {String | color} name 
   * @returns 
   */
  static GetBoxShadowCSS(name){
    if(!name) return undefined;
    return "0 0 2px 2px " + ColorX.GetColorCSS(name, 0.2);
  }

  /**
   * Get the linear gradient mapping
   * @param {String} name 
   * @param {Number} deg 
   * @param {Number} a 
   * @returns 
   */
  static GetLinearGradient(name, deg, a = undefined){
    if(!name) return undefined;
    if(!ColorX.__gradient[name]) {
      console.warn("Gradient " + name + " not found.");
      return undefined;
    }
    return ColorX.linearGradientToCSS(deg, ColorX.__gradient[name], a);
  }

  /**
   * 
   * @param {String | color} name 
   * @param {Number} brightness 
   * @param {Number} glow  
   * @returns 
   */
  static GetLEDLight(name, brightness = 1, glow = 50){
    let color = ColorX.GetColor(name);
    let gradient = [
      {
        percent: 0,
        color: {...color, a: brightness}
      },
      {
        percent: glow,
        color: {...color, a: 0}
      },
      {
        percent: 100,
        color: {...color, a: 0}
      }
    ];
    return ColorX.radialGradientToCSS("circle at center", gradient); 
  }

  /**
   * Get the radial gradient mapping
   * @param {String} name
   * @param {String} mode 
   * @param {Number} a 
   * @returns 
   */
  static GetRadialGradientCSS(name, mode = "circle at center", a = undefined){
    if(!name) return undefined;
    if(!ColorX.__gradient[name]) {
      console.warn("Gradient " + name + " not found.");
      return undefined;
    }
    return ColorX.radialGradientToCSS(mode, ColorX.__gradient[name], a);
  }

  /**
   * Get Linear gradient CSS token 
   * @param {Number} deg 
   * @param {[color]} colors 
   * @param {Number} a 
   * @returns 
   */
  static linearGradientToCSS(deg = 0, colors = [], a = undefined){
    let str = "linear-gradient(" + deg + "deg, ";
    str += ColorX.grandientColorsToCSS(colors, a);
    str += ")";
    return str;
  }

  /**
   * Get Radial Gradient CSS token
   * @param {String} mode 
   * @param {[color]} colors 
   * @param {Number} a 
   * @returns 
   */
  static radialGradientToCSS(mode = "circle at center", colors = [], a = undefined){
    let str = "radial-gradient(" + mode + ", ";
    str += ColorX.grandientColorsToCSS(colors, a);
    str += ")";
    return str;
  } 

  /**
   * Get Gradient CSS token
   * @param {[color]} colors 
   * @param {Number} a 
   * @returns 
   */
  static grandientColorsToCSS(colors, a){
    let str = "";
    _.map(colors, (o, i) => {
      if(i !== 0) str += ", ";
      str += ColorX.partToCSS(o, a);
    });
    return str;
  }

  /**
   * 
   * @param {{
   *   percent: Number,
   *   color: color
   * }} param0 
   * @param {Number} a 
   * @returns 
   */
  static partToCSS({percent, color}, a = undefined){
    if(a) return ColorX.toCSS({...color}, a) + " " + percent + "%";
    return ColorX.toCSS({...color}) + " " + percent + "%";
  }

  /**
   * Generate Rainbow CSS token
   * @param {Number} start 
   * @param {Number} section 
   * @param {Number} a 
   * @returns 
   */
  static Rainbow(start = 0, section = 7, a = undefined){
    return ColorX.IntervalCSS(0, 360, section, a);
  }

  /**
   * Get Array of CSS gradiant from a range of hue degree
   * @param {Number} startHue 
   * @param {Number} endHue 
   * @param {Number} section 
   * @param {Number} a 
   * @returns 
   */
  static Intervals(startHue, endHue, section = 7, a = undefined){
    let _range = _.range(section);
    let endH = endHue;
    if(endHue < startHue) endH = endHue + 360;

    let rtn = [];
    _.map(_range, (o, i) => {
      rtn.push(ColorX.HSL2RGB(startHue + ((endH - startHue) / section * i) % 360, a));
    });
    return rtn;
  }

  /**
   * Get Interval CSS array
   * @param {Number} startHue 
   * @param {Number} endHue 
   * @param {Number} section 
   * @param {Number} a 
   * @returns 
   */
  static IntervalCSS(startHue, endHue, section = 7, a = undefined){
    let colors = ColorX.Intervals(startHue, endHue, section, a);
    let rtn = [];
    _.map(colors, (o, i) => {
      rtn.push(ColorX.toCSS(o));
    });
    return rtn;
  }

  /**
   * Get linear interval CSS array
   * @param {Number} deg 
   * @param {Number} startHue 
   * @param {Number} endHue 
   * @param {Number} section 
   * @param {Number} a 
   * @returns 
   */
  static LinearInterval(deg, startHue, endHue, section = 7, a = undefined){
    let _range = _.range(section + 1);
    let endH = endHue;
    if(endHue < startHue) endH = endHue + 360;

    let __colors = [];
    _.map(_range, (o, i) => {
      __colors.push({
        percent: Math.fround(100 / section * i),
        color: ColorX.HSL2RGB(startHue + ((endH - startHue)  / section * i) % 360, a)
      });
    });
    return ColorX.linearGradientToCSS(deg, __colors, a);
  }

  /**
   * Get linear rainbow 
   * @param {Number} deg 
   * @param {Number} section 
   * @param {Number} a 
   * @returns 
   */
  static LinearRainbow(deg = 0, section = 7, a = undefined){
    return ColorX.LinearInterval(deg, 0, 360, section, a);
  }

  /**
   * HSL to RGB
   * @param {Number} h 
   * @param {Number} a 
   * @param {Number} s 
   * @param {Number} l 
   * @returns 
   */
  static HSL2RGB(h, a = 1, s = 1, l = 0.5) {

    let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c/2,
    r = 0,
    g = 0,
    b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;  
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return {r: r, g:g, b:b, a:a};
  }

  /**
   * RGBA object to CSS string
   * @param {color} color 
   * @returns 
   */
  static toCSS(color){
    if(!color) return "";
    let {r, g, b, a} = color;
    return "rgba("+ r + "," + g + "," + b + "," + ((a === null || a === undefined)? 1: a) + ")";
  }

  /**
   * RGB to HEX
   * @param {Number} r 
   * @param {Number} g 
   * @param {Number} b 
   * @returns 
   */
  static toHex(r, g, b){
    let _r = r.toString(16);
    let _g = g.toString(16);
    let _b = b.toString(16);

    if (_r.length === 1)
      _r = "0" + _r;
    if (g.length === 1)
      _g = "0" + _g;
    if (b.length === 1)
      _b = "0" + _b;

    return "#" + _r + _g + _b;
  }

}

export default ColorX;