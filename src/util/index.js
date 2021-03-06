export function serialize(obj) {
  let urlStr = ''
  for (const key in obj) {
    urlStr = urlStr + `${key}=${obj[key]}&`
  }
  urlStr = urlStr.slice(0, -1)
  return urlStr;
}

// 获取当前时间戳 yyyy-MM-dd HH:MM
export function getNowFormatDate () {
  let date = new Date();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}