import * as types from '../constants/ActionTypes'
import * as api from 'src/api'
import * as appActions from '$redux/actions/app'

// res 异步返回的数据
export const filmDetail = (res) => ({ type: types.DETAIL, data: res })

// 请求电影详情
export function getFilmDetail (params) {
  return (dispatch) => {
    api.getFilmDetail(params).then(res => {
      // 更改title
      console.log(res, 'film-detail')
      let actors = []
      res.data.film.actors.forEach(items => {
        actors.push(items.name)
      })
      res.data.film.actors = actors.join('|')
      dispatch(appActions.changeTitle(res.data.film.name))
      dispatch(filmDetail(res.data.film))
    })
  }
}
