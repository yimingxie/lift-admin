/**
 * 在新窗口中弹出下载
 * @type {Object}
 */
export default {
  timoutMsec: 100, // 0.1Second
  id: '100000001',
  download (url) {
    // console.log('download:' + url + ', id:' + this.id)
    var a = document.getElementById(this.id)
    // 防止反复添加
    if (!a) {
      a = document.createElement('a')
      // console.log('create ele:' + a)
      a.setAttribute('href', url)
      // a.setAttribute('target', '_blank')
      a.setAttribute('target', '_self')
      a.setAttribute('id', this.id)
      document.body.appendChild(a)
    }
    // a.click()
    window.setTimeout(() => {
      // console.log('on timeout, perform click:' + a)
      a.click()
      document.body.removeChild(a)
    }, this.timoutMsec)
  }
}
