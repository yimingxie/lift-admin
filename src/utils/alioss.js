// var OSS = require('ali-oss').Wrapper
import OSS from 'ali-oss'
export function client() {
  var client = new OSS({
    region: 'oss-cn-shenzhen',  
    accessKeyId: 'LTAIUtSRnle5i4FE',
    accessKeySecret: 'nie0kPjlgZgtvS5x6uw2DeL4bLZPbf',
    bucket: 'save-photo'
  })  //后端提供数据
  return client
}