import axios from 'axios'

const service = axios.create({
  timeout: 10000
})

service.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.error) {
      if (res.error.code === '1' || res.error.code === '2' || res.error.code === '3') {
        // token超时，失效，跳转登录
        return Promise.reject(res)
      }
      return Promise.reject(res)
    }
    return Promise.resolve(res)
  },
  error => {
    // error与自定义错误object返回新object
    let errorAssign = (defineObj) => {
      return Object.assign({}, error, {
        error: defineObj
      })
    }
    let obj = {}
    if (error.code === 'ECONNABORTED') {
      // timeout
      obj = errorAssign({ code: 'timeout', message: '请求超时' })
    } else if (typeof error.response === 'undefined') {
      // No 'Access-Control-Allow-Origin' header
      obj = errorAssign({ code: 'crossError', message: '网络出错' })
    } else {
      // 其他错误
      obj = errorAssign({ code: error.response.status, message: '出错啦' })
    }
    process.env.NODE_ENV !== 'production' && console.error(Object.assign({}, obj, error))
    return Promise.reject(Object.assign({}, obj, error))
  }
)

export default service
