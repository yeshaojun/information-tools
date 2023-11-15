// 一些常用的方法(也可以从vue/shared中导入)
export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";

export const isString = (val: unknown): val is string =>
  typeof val === "string";

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === "object";

export const isArray = (val: unknown): val is Array<any> =>
  val instanceof Array;

function _mime(option: string, value: string) {
  const mimeTypes: any = navigator.mimeTypes;
  for (const mt in mimeTypes) {
    if (mimeTypes[mt][option] === value) {
      return true;
    }
  }
  return false;
}

export function getBrowser() {
  const ua = navigator.userAgent.toLocaleLowerCase();
  let browserType: string;
  if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
    browserType = "IE";
  } else if (ua.match(/firefox/) != null) {
    browserType = "firefox";
  } else if (ua.match(/ucbrowser/) != null) {
    browserType = "UC";
  } else if (ua.match(/opera/) != null || ua.match(/opr/) != null) {
    browserType = "opera";
  } else if (ua.match(/bidubrowser/) != null) {
    browserType = "baidu";
  } else if (ua.match(/metasr/) != null) {
    browserType = "sougou";
  } else if (
    ua.match(/tencenttraveler/) != null ||
    ua.match(/qqbrowse/) != null
  ) {
    browserType = "QQ";
  } else if (ua.match(/maxthon/) != null) {
    browserType = "maxthon";
  } else if (ua.match(/chrome/) != null) {
    const is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
    if (is360) {
      browserType = "360";
    } else {
      browserType = "chrome";
    }
  } else if (ua.match(/safari/) != null) {
    browserType = "Safari";
  } else {
    browserType = "others";
  }
  return browserType;
}

export function getOs() {
  const sUserAgent = navigator.userAgent.toLocaleLowerCase();
  const isWin =
    navigator.platform === "win32" || navigator.platform === "windows";
  const isMac =
    navigator.platform === "mac68k" ||
    navigator.platform === "macppc" ||
    navigator.platform === "macintosh" ||
    navigator.platform === "macintel";
  if (isMac) return "Mac";
  const isUnix = navigator.platform === "x11" && !isWin && !isMac;
  if (isUnix) return "Unix";
  const isLinux = String(navigator.platform).indexOf("linux") > -1;
  if (isLinux) return "Linux";
  if (isWin) {
    const isWin2K =
      sUserAgent.indexOf("windows nt 5.0") > -1 ||
      sUserAgent.indexOf("windows 2000") > -1;
    if (isWin2K) return "Win2000";
    const isWinXP =
      sUserAgent.indexOf("windows nt 5.1") > -1 ||
      sUserAgent.indexOf("windows xp") > -1;
    if (isWinXP) return "WinXP";
    const isWin2003 =
      sUserAgent.indexOf("windows nt 5.2") > -1 ||
      sUserAgent.indexOf("windows 2003") > -1;
    if (isWin2003) return "Win2003";
    const isWinVista =
      sUserAgent.indexOf("windows nt 6.0") > -1 ||
      sUserAgent.indexOf("windows vista") > -1;
    if (isWinVista) return "WinVista";
    const isWin7 =
      sUserAgent.indexOf("windows nt 6.1") > -1 ||
      sUserAgent.indexOf("windows 7") > -1;
    if (isWin7) return "Win7";
  }
  if (sUserAgent.indexOf("android") > -1) return "Android";
  if (sUserAgent.indexOf("iphone") > -1) return "iPhone";
  if (sUserAgent.indexOf("symbianos") > -1) return "SymbianOS";
  if (sUserAgent.indexOf("windows phone") > -1) return "Windows Phone";
  if (sUserAgent.indexOf("ipad") > -1) return "iPad";
  if (sUserAgent.indexOf("ipod") > -1) return "iPod";
  return "others";
}

// 下载文件
export function downFile(data: Blob, name: string) {
  const objectURL = window.URL.createObjectURL(data);
  const a = window.document.createElement("a");
  a.href = objectURL;
  a.download = name;
  a.click();
  a.remove();
  // 释放创建的url对象
  window.URL.revokeObjectURL(objectURL);
}
