import * as types from '../constants/ActionTypes'

export const openSidebar = (flag) => ({ type: types.OPENSIDEBAR, data: flag })

export const changeTitle = (title) => ({ type: types.CHANGETITLE, data: title })
