let protocol = process.env.NODE_ENV !== 'production' ? 'http:' : window.location.protocol

export default {
  
  'url1': `${protocol}//iot.gidomino.com`,
  'url2': `${protocol}//iot.gidomino.com`,
  // 'url2': `${protocol}//192.168.100.7:8080`,
  // 'url3': `${protocol}//192.168.100.89:8080`,
  
}