class BrowserX {
  
  static browser = "";

  static getUserAgent = () => {
    return navigator.userAgent.toLowerCase();
  }

  static getBrowser = () => {
    if(this.browser) return this.browser;
    let browser = "";
    let isAndroid = navigator.userAgent.toLowerCase().indexOf('android') !== -1;
    let isGoogleBot = navigator.userAgent.toLowerCase().indexOf('googlebot') !== -1;
    // eslint-disable-next-line
    let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    let isIE = /*@cc_on!@*/false || !!document.documentMode;
    let isFirefox = typeof InstallTrigger !== 'undefined' 
      || navigator.userAgent.toLowerCase().indexOf('firefox') !== -1 
      || navigator.userAgent.toLowerCase().indexOf('fennec') !== -1
      || navigator.userAgent.toLowerCase().indexOf('fxios') !== -1;
    let isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera
      || navigator.userAgent.indexOf(' OPR/') >= 0;
    let isChrome = !isGoogleBot && !isOpera && !!window.chrome && (
      !!window.chrome.webstore
      || navigator.vendor.toLowerCase().indexOf('google inc.') !== -1
    );
    let isEdge = !(isIE) && isChrome && (navigator.userAgent.indexOf("Edg") !== -1);
    let isSafari = !isChrome && navigator.userAgent.toLowerCase().indexOf('safari') !== -1;
    let isBlink = (isChrome || isOpera) && !!window.CSS;
  
    if (isIE11) {
      browser = 'ie11';
    } else if (isIE) {
      browser = 'ie';
    } else if (isEdge) {
      browser = 'edge';
    } else if (isFirefox) {
      browser = 'firefox';
    } else if (isOpera) {
      browser = 'opera';
    } else if (isChrome) {
      browser = 'chrome';
    } else if (isSafari) {
      browser = 'safari';
    } else if (isBlink) {
      browser = 'blink';
    } else if (isGoogleBot) {
      browser = 'googlebot';
    } else {
      browser = 'unknown';
    }
  
    browser = (isAndroid? "android " : "") + browser;
    browser = (isGoogleBot? "googlebot " : "") + browser;
    this.browser = browser;
  
    console.log('[-] Browser Detected: ' + browser);
    return browser;
  }

}

export default BrowserX;