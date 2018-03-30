import Mock from 'mockjs'

export function add2Mock (api) {
  api.forEach(item => {
    Mock.mock(item.url, item.type || 'get', item.data)
  })
}

// 添加你的模拟接口
add2Mock(require('assets/mockjs/api/billboard').default) // banner
add2Mock(require('assets/mockjs/api/now-playing').default) // now-playing
add2Mock(require('assets/mockjs/api/coming-soon').default) // coming-soon
add2Mock(require('assets/mockjs/api/film-detail').default) // film-detail

Mock.setup({
  timeout: 1000 // 指定被拦截的 Ajax 请求的响应时间,单位ms
})

export default Mock
