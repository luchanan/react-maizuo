import * as types from '../constants/ActionTypes'
import * as api from 'src/api'

// res 异步返回的数据
export const carousel = (res) => ({ type: types.CAROUSEL, data: res })

// 请求banner
export function getBanner (params) {
  return (dispatch) => {
    api.getBanner(params).then(res => {
      console.log(res, 'banner')
      dispatch(carousel(res.data.billboards))
    })
  }
}

// 热映
export const nowPlay = (res) => ({ type: types.NOWPLAY, data: res })

// 请求nowPlay
export function getNowPlay (params) {
  return (dispatch) => {
    api.getNowPlay(params).then(res => {
      console.log(res, 'now-playing')
      dispatch(nowPlay(res.data.films))
    })
  }
}

// 热映
export const soonPlay = (res) => ({ type: types.SOONPLAY, data: res })

// 请求nowPlay
export function getSoonPlay (params) {
  return (dispatch) => {
    api.getSoonPlay(params).then(res => {
      console.log(res, 'coom-soon')
      dispatch(soonPlay(res.data.films))
    })
  }
}
