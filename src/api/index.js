import fetch from 'src/utils/fetch.js'
import { commonRequest } from './commonRequest'
let env = process.env.NODE_ENV
let url = env !== 'production' ? '/api/' : 'https://m.maizuo.com/v4/api/'
if (env === 'production') { // development
  // 开发环境使用官方API， 因为有代理
  // 打包环境使用mockjs, 因为不能直接调去api
  require('assets/mockjs')
}
// 获取首页banner
export function getBanner (params) {
  return fetch({
    url: `${url}billboard/home?_t=${+new Date()}`,
    method: 'get',
    data: commonRequest({}, undefined, 'get')
  })
}
// 获取首页热映
export function getNowPlay (params) {
  return fetch({
    url: `${url}film/now-playing?_t=${+new Date()}`,
    method: 'get',
    data: commonRequest({}, undefined, 'get')
  })
}
// 获取首页即将上映
export function getSoonPlay (params) {
  return fetch({
    url: `${url}film/coming-soon?_t=${+new Date()}&page=1&count=3`,
    method: 'get',
    data: commonRequest({}, undefined, 'get')
  })
}
// 获取电影详情
export function getFilmDetail (params) {
  return fetch({
    url: `${url}film/${params.id}?_t=${+new Date()}`,
    method: 'get',
    data: commonRequest({}, undefined, 'get')
  })
}
