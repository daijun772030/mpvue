import wx from 'wx'
var Fly = require('flyio/dist/npm/wx')

const request = new Fly()


// 配置请求基地址
// request.config.baseURL = 'https://api.cdhryx.com/'
request.config.baseURL = 'https://test-api.cdhryx.com/'
//定义公共headers
// fly.config.headers={xx:5,bb:6,dd:7}
//设置公共的Get参数
// fly.config.params={"token":"testtoken"};

request.config.timeout = 10 * 1000
// if (process.env.METHOD === 'proxy1') {
//   request.config.baseURL = 'http://localhost:3001/douban' // 本地代理1(100次/小时)
// } else if (process.env.METHOD === 'proxy2') {
//   request.config.baseURL = 'http://localhost:3002' // 本地代理2(100次/小时)
// } else if (process.env.METHOD === 'nginx') {
//   request.config.baseURL = 'https://movie.douban.gusaifei.com/v2/movie' // nginx 代理(100次/小时)
// }

request.interceptors.request.use((request) => {
  request.headers["X-Tag"]="flyio";
    //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  wx.showLoading({ title: '拼命加载中...' })
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideLoading()
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request
