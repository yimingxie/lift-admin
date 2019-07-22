export default {
  /**
   * 格式化时间戳
   * @param {string} timestamp 时间戳
   * @return {string} "2019-4-16 15:50:30"
   */
  dateFormat(timestamp) {
    // str.slice(-2) 从字符串的倒数第二个字符开始截取 "abcd" -> "cd"
    var dateObj = new Date(timestamp)
    var year = dateObj.getFullYear(),
      month = ("0" + (dateObj.getMonth() + 1)).slice(-2),
      date = ("0" + dateObj.getDate()).slice(-2),
      hour = ("0" + dateObj.getHours()).slice(-2),
      minute = ("0" + dateObj.getMinutes()).slice(-2),
      second = ("0" + dateObj.getSeconds()).slice(-2);

    var result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    return result;
  },
}