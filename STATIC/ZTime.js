import moment from "moment";
import axios from "axios";

class ZTime {

  /**
   *  Return time difference
   * @param {moment.Moment | String} from 
   * @param {moment.Moment | String} to 
   * @param {String} unit 
   */
  static Difference(from, to, unit){
    let momentFrom = this.Moment(from);
    let momentTo = this.Moment(to);
    return momentTo.diff(momentFrom, unit);
  }

  /**
   * Get Current Time Moment
   */
  static Now(){
    return moment();
  }

  /**
   * 
   * @param {String} str 
   * @param {String} format 
   */
  static Parse(str, format){
    return moment(str, format);
  }

  /**
   * Get Start Of Year
   * @param {moment.Moment | String} momentO 
   */
  static StartOfYear(momentO = this.Now()){
    var m = this.Moment(momentO);
    if(!m) return null;
    return m.startOf("year");
  }

  /**
   * Get End of Year
   * @param {moment.Moment | String} momentO 
   */
  static EndOfYear(momentO = this.Now()){
    var m = this.Moment(momentO);
    if(!m) return null;
    return m.endOf("year");
  }

  /**
   * Get Start of Month
   * @param {moment.Moment | String} momentO 
   */
  static StartOfMonth(momentO = this.Now()){
    var m = this.Moment(momentO);
    if(!m) return null;
    return m.startOf("month");
  }

  /**
   * Get End of Month
   * @param {moment.Moment | String} momentO 
   */
  static EndOfMonth(momentO = this.Now()){
    var m = this.Moment(momentO);
    if(!m) return null;
    return m.endOf("month");
  }

  /**
   * Get Start of Week
   * @param {moment.Moment | String} momentO 
   */
  static StartOfWeek(momentO = this.Now()){
    var m = this.Moment(momentO);
    if(!m) return null;
    return m.startOf("week");
  }

  /**
   * Get End of Week
   * @param {moment.Moment | String} momentO 
   */
  static EndOfWeek(momentO = this.Now()){
    var m = this.Moment(momentO);
    if(!m) return null;
    return m.endOf("week");
  }

  /**
   * Get Start of Day
   * @param {moment.Moment | String} momentO 
   */
  static StartOfDay(momentO = this.Now()){
    var m = this.Moment(momentO);
    if(!m) return null;
    return m.startOf("day");
  }

  /**
   * Get End of Day
   * @param {moment.Moment | String} momentO 
   */
  static EndOfDay(momentO = this.Now()){
    var m = this.Moment(momentO);
    if(!m) return null;
    return m.endOf("day");
  }

  /**
   * Check if the date is between a and b
   * @param {moment.Moment | String} momentO 
   * @param {moment.Moment | String} a 
   * @param {moment.Moment | String} b 
   * @param {"[)" | "[]" | "(]" | "()"} inclusivity 
   * @param {String} unit 
   */
  static IsBetween(momentO, a, b, inclusivity = "[)", unit = null){
    var m = this.Moment(momentO);
    if(!m) return false;
    var ma = this.Moment(a);
    if(!ma) return false;
    var mb = this.Moment(b);
    if(!mb) return false;
    return m.isBetween(ma, mb, unit, inclusivity);
  }

  /**
   * Check now if it is before
   * @param {moment.Moment | String} compare 
   */
  static NowIsBefore(compare){
    var c = this.Moment(compare);
    if(!c) return false;
    return moment().isBefore(c);
  }

  /**
   * Check now if it is after
   * @param {moment.Moment | String} compare 
   */
  static NowIsAfter(compare){
    var c = this.Moment(compare);
    if(!c) return false;
    return moment().isAfter(c);
  }

  /**
   * Check now if it is before or same as
   * @param {moment.Moment | String} compare 
   */
  static NowIsSameOrBefore(compare){
    var c = this.Moment(compare);
    if(!c) return false;
    return moment().isSameOrBefore(c);
  }

  /**
   * Check now if it is after or same as
   * @param {moment.Moment | String} compare 
   */
  static NowIsSameOrAfter(compare){
    var c = this.Moment(compare);
    if(!c) return false;
    return moment().isSameOrAfter(c);
  }

  /**
   * Check now if it is between
   * @param {moment.Moment | String} compare 
   */
  static NowIsBetween(compareA, compareB){
    var ca = this.Moment(compareA);
    if(!ca) return false;
    var cb = this.Moment(compareB);
    if(!cb) return false;
    return moment().isBetween(ca, cb);
  } 

  /**
   * Check now if it is same as
   * @param {moment.Moment | String} compare 
   */
  static NowIsSame(compare){
    var c = this.Moment(compare);
    if(!c) return false;
    return moment().isSame(c);
  } 

  /**
   * 
   * @param {moment.Moment | String} timeStr 
   */
  static Moment(timeStr){
    if(!moment.isMoment(timeStr)){
      try{
        return moment(timeStr);
      }catch(e){
        console.error("[x] Time :: Moment Converting Error (" + timeStr + "): ");
        return null;
      }
    }
    return timeStr;
  }

  /**
   * Return lapsed time
   * @param {moment.Moment | String} compare 
   * @param {String} unit
   * @param {Boolean} precise
   */
  static Lapse(compare, unit = "seconds", precise = true, fixed = 3){
    var c = this.Moment(compare);
    if(!c) return false;
    return moment().diff(c, unit, precise).toFixed(fixed);
  }

  /**
   * Output locale month
   * @param {moment.Moment} momentO 
   * @param {String} lang 
   * @param {Boolean} full 
   */
  static Month(momentO = this.Now(), lang = "EN", full = false){
    let translate = {
      EN: {
        Short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        Full: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      },
      TC: {
        Short: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "??????", "??????"],
        Full: ["??????",  "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "?????????", "?????????"]
      },
      SC: {
        Short: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "??????", "??????"],
        Full: ["??????",  "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "?????????", "?????????"]
      },
      JP: {
        Short: ["??????", "???", "??????", "???", "???", "??????", "??????", "??????", "???", "?????????", "???????????????", "????????????"],
        Full: ["????????????", "?????????", "????????????", "?????????", "?????????", "????????????", "????????????", "????????????", "?????????", "???????????????", "?????????????????????", "??????????????????"]
      },
      JPO: {
        Short: ["?????????", "????????????", "?????????", "?????????", "?????????", "????????????", "????????????", "?????????", "????????????", "???????????????", "????????????", "?????????"],
        Full: ["??????", "??????", "??????", "??????", "??????", "?????????", "??????", "??????", "??????", "?????????", "??????", "??????"]
      },
      KO: {
        Short: ["???", "???", "???", "???", "???", "???", "???", "???", "???", "???", "??????", "??????"],
        Full: ["??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "??????", "?????????", "?????????"]
      }
    };

    var m = this.Moment(momentO);
    if(!m) return "";

    let month = m.month();
    if(full){
      return translate[lang].Full[month];
    }else{
      return translate[lang].Short[month];
    }

  }

  /**
   * Output locale day of week
   * @param {moment.Moment} momentO 
   * @param {String} lang 
   * @param {Boolean} full 
   */
  static DayOfWeek(momentO = this.Now(), lang = "EN", full = false){
    let translate = {
      EN: {
        Short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        Full: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
      },
      TC: {
        Short: ["???", "???", "???", "???", "???", "???", "???"],
        Full: ["?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????"]
      },
      SC: {
        Short: ["???", "???", "???", "???", "???", "???", "???"],
        Full: ["?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????"]
      },
      JP: {
        Short: ["???", "???", "???", "???", "???", "???", "???"],
        Full: ["?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????"]
      },
      KO: {
        Short: ["???", "???", "???", "???", "???", "???", "???"],
        Full: ["?????????", "?????????", "?????????", "?????????", "?????????", "?????????", "?????????"]
      }
    };

    var m = this.Moment(momentO);
    if(!m) return "";

    let day = m.day();

    if(full){
      return translate[lang].Full[day];
    }else{
      return translate[lang].Short[day];
    }

  }

  /**
   * Extract Only time
   * @param {moment.Moment} momentO 
   */
  static Time(momentO = this.Now()){
    var m = this.Moment(momentO);
    if(!m) return "";
    return m.format("HH:mm");
  }

  /**
   * Extract Only date
   * @param {moment.Moment} momentO 
   */
  static Date(momentO = this.Now()){
    var m = this.Moment(momentO);
    if(!m) return "";
    return m.format("YYYY-MM-DD");
  }

  /**
   * Check if it is a holiday
   * @param {[String]} phList 
   * @param {moment.Moment} momentO 
   */
  static IsPublicHoliday(phList, momentO = this.Now()){
    var m = this.Moment(momentO);
    if(!m) return false;
    let date = this.Date(m);
    return phList.includes(date);
  }

  /**
   * Get Public Holiday List from government source
   */
  static async GetPublicHolidayList(){
    try{
      let res = await axios.get("http://www.1823.gov.hk/common/ical/en.ics");
      let data = res.data;
      const regex = /DTSTART;VALUE=DATE:(\d*)/g;
      let phList = [];

      let result;
      regex.lastIndex = 0;
      while ((result = regex.exec(data)) != null) {
        phList.push(moment(result[1], "YYYYMMDD").format("YYYY-MM-DD"));
      }
      return phList;
    }catch(e){
      console.log("[!] Cannot Get Holiday Information.");
      return [];
    }
  }
}

export default ZTime;