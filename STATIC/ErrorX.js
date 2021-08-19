
class ErrorX{

  /**
   * 
   * @param {{
   *   errorCode?: Number,
   *   message?: String,
   *   name?: String,
   *   stack?: String
   * }} e 
   * @returns {String}
   */
  static Handle(e){
    try{
      if(e.errorCode){
        return "Error [" + e.errorCode + "] : " + e.message;
      }
      return e.message || e.name;
    }catch(e){
      return "Unidentified Error";
    }
  }

}

export default ErrorX;