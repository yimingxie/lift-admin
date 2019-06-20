export default {
  /**
   * 格式化时间戳
   * @param {string} timestamp 时间戳
   * @return {string} "2019-4-16 15:50:30"
   */
  dateFormat(timestamp) {
    // str.slice(-2) 从字符串的倒数第二个字符开始截取 "abcd" -> "cd"
    var year = timestamp.getFullYear(),
      month = ("0" + (timestamp.getMonth() + 1)).slice(-2),
      date = ("0" + timestamp.getDate()).slice(-2),
      hour = ("0" + timestamp.getHours()).slice(-2),
      minute = ("0" + timestamp.getMinutes()).slice(-2),
      second = ("0" + timestamp.getSeconds()).slice(-2);

    var result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    return result;
  }
}