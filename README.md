用vue做了几个项目了，不想技术栈太单调，所以个人又用react来折腾一下，因为过渡到react，不想配置跟vue-cli变化过大增加学习成本，所以选了个和vue-cli差不多的脚手架

参考了以下脚手架

https://github.com/SidKwok/template-rwb

https://github.com/kenberkeley/react-demo

最后选用了(因为跟vue-cli非常相似，减少学习成本)

https://github.com/SidKwok/template-rwb/tree/full-features

比较版本：

```
vue相关(基于vue-cli)

"vue": "2.5.2"
"vue-router": "3.0.1"
"vuex": "3.0.1"

react相关(基于上面脚手架)
"react": "16.2.0",
"react-router-dom": "4.2.2",
"redux": "3.7.2"
"react-redux": "5.0.7",
"react-router-config": "1.0.0-beta.4",
"prop-types": "15.6.1",
"react-dom": "16.2.0",
"react-loadable": "5.3.1"

```

- react-router

1. react router配置写法

```
1、jsx
router/index.js
...
const detail  = (location,cb) => {
	require.ensure([],require => {
		cb(null,require('./pages/detail').default)
	},'detail/:id')
}
...
const RouteConfig = (
	<Router history={history}>
		<Route path='/' component={Roots}>
			<IndexRoute component={home} />
			<Route path='home' component={home} />
			<Route path='detail' getComponent={detail} />
			<Route path='film' getComponent={film} />
			<Route path='cinema' getComponent={cinema} />
			<Redirect from='*' to='/' />
		</Route>
	</Router>
)
export default RouteConfig

2、使用react-router-conifg, 使得可以向vue那样写router配置

import React from 'react'
import { Redirect } from 'react-router'
import MainView from 'views/MainView'
import Loadable from 'react-loadable'
import notFound from 'views/notFound'

export default [
  {
    component: MainView,
    childRoutes: [
      {
        path: '/',
        exact: true,
        component: () => <Redirect to='/home' />
      },
      {
        path: '/home',
        component: Loadable({
          loader: () => import(`views/Home`),
          // if you have your own loading component,
          // you should consider add it here
          loading: () => null
        })
      },
      {
        path: '/login',
        component: Loadable({
          loader: () => import(`views/Login`),
          loading: () => null
        })
      },
      {
        path: '/detail/:id',
        component: Loadable({
          loader: () => import(`views/Detail`),
          loading: () => null
        })
      },
      {
        path: '*',
        component: notFound
      }
    ]
  }
]

// 配置注入app.jsx
import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as Router } from 'react-router-dom'
import routes from 'routes'
import Header from 'components/Header'
import Menu from 'components/Offcanvas'

const App = () => (
  <div className='App'>
    <Header />
    <Menu />
    <Router>
      {renderRoutes(routes)}
    </Router>
  </div>
)

export default App
```

2. 路由异步组件

```
// react
import Loadable from 'react-loadable'
...
{
    path: '/home',
    component: Loadable({
      loader: () => import(`views/Home`),
      loading: () => null
    })
  },
```

- 组件数据之间的传递

1. 父组件传递数据给子组件

```
父组件

import React from 'react'
import Hello from 'components/Hello'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as Router } from 'react-router-dom'
import routes from 'routes'
import logo from './assets/logo.svg'
import './App.css'

import Counter from 'components/Counter'
import Home from './views/home'

const App = () => (
  <div className='App'>
    <div className='App-header'>
      <img src={logo} className='App-logo shake-rotate' alt='logo' />
    </div>
    <Counter />
    <Home />
    <Hello msg='Hello World' />
    <Router>
      {renderRoutes(routes)}
    </Router>
  </div>
)

export default App

子组件，写法一

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Hello.css'

export default class Hello extends Component {
  static propTypes = {
    msg: PropTypes.string
  }
  render () {
    let { msg } = this.props
    return (
      <div id='Hello'>
        <h2>{msg}</h2>
        <p className='doc'>
          <i className='redux'>Redux's</i> <a href='http://redux.js.org/' target='_blank'>doc</a>
          ( or <a href='http://cn.redux.js.org/' target='_blank'>zh-doc</a> )
        </p>
        <p className='doc'>
          <i className='router'>react-router's</i> <a href='https://reacttraining.com/react-router/web/example/basic' target='_blank'>doc</a>
          ( or <a href='https://reacttraining.cn/web/guides/quick-start' target='_blank'>zh-doc</a> )
        </p>
      </div>
    )
  }
}


子组件，写法二（纯组件？）
import React from 'react'
import PropTypes from 'prop-types'
import './Hello.css'

const Hello = ({ msg }) => (
  <div id='Hello'>
    <h2>{msg}</h2>
    <p className='doc'>
      <i className='redux'>Redux's</i> <a href='http://redux.js.org/' target='_blank'>doc</a>
      ( or <a href='http://cn.redux.js.org/' target='_blank'>zh-doc</a> )
    </p>
    <p className='doc'>
      <i className='router'>react-router's</i> <a href='https://reacttraining.com/react-router/web/example/basic' target='_blank'>doc</a>
      ( or <a href='https://reacttraining.cn/web/guides/quick-start' target='_blank'>zh-doc</a> )
    </p>
  </div>
)

Hello.prototype.propTypes = {
  msg: PropTypes.string
}

export default Hello

```

- 绑定值的方式

1. 普通绑定变量

```
// react
<div>{val}</div>

// vue
<div>{{val}}</div>
```

2. 属性值变量

```
// react
<div key={index}></div>

// vue
<div :key="index"></div>
```

3. style变量

```
// react
<div style={{ backgroundColor: 'red', color: 'white' }} onClick={this.changeName} key={index}>{val}{this.state.name}</div>

// vue
<div :style="{backgroundColor: 'red', color: 'white' }" @click="changeName()" :key="index">{{val}}{{name}}</div>
```

4. class变量

```
// react
class Home extends Component {
  state = {
    bg1: 'test1',
    bg2: 'test2'
  }
  render () {
    return (
      <div id='home'>
        <div className={`${this.state.bg1} ${this.state.bg2}`}>name: {this.state.name}</div>
      </div>
    )
  }
}

// vue
<template>
  <div :class="[bg1, bg2]"></div>
</template>
export default {
  data () {
    return {
      bg1: 'test1',
      bg2: 'test2'
    }
  }
}
```

- [react-redux](http://www.redux.org.cn/)与vuex

1、redux触发更新数据更新的思路

combineReducers reducers

```
// reducers/index
import { combineReducers } from 'redux'
import counter from './counter'
import home from './home'

export default combineReducers({
  counter,
  home
})
```

注入store根目录

```
import { createStore, compose } from 'redux'
import rootReducer from '../reducers/index'
import middlewares from './middlewares'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(middlewares)

export default function configureStore (initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

```

触发定义的dispatch

```
// react
// actions/home
import * as types from '../constants/ActionTypes'
// res 异步返回的数据
export const carousel = (res) => ({ type: types.CAROUSEL, data: res.data })

// views/home/index.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '$redux/actions/home'

const mapStateToProps = state => ({
  banner: state.home.banner
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(homeActions, dispatch)
})

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '$redux/actions/home'

const mapStateToProps = state => ({
  banner: state.home.banner
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(homeActions, dispatch)
})

class Home extends Component {
  static propTypes = {
    actions: PropTypes.object,
    banner: PropTypes.array
  }
  state = {
    name: 'home'
  }
  componentDidMount () {
    // 请求异步数据
    let result = {
      data: [1, 2, 4]
    }
    this.props.actions.carousel(result)
  }
  renderBanner () {
    let { banner } = this.props
    console.log(banner)
  }
  render () {
    this.renderBanner()
    let { banner } = this.props
    return (
      <div id='home'>
        <div>
          {
            banner.map((val, index) => { return <div key={index}>{val}</div> })
          }
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

```

reducers更新state

```
// react
// reducers/home
import * as actionTypes from '../constants/ActionTypes'

const defaultState = {
  banner: []
}

export default function home (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CAROUSEL:
      return Object.assign({}, state, {
        banner: action.data
      })
    default:
      return state
  }
}

```

组件使用state

```
// recat
const mapStateToProps = state => ({
  banner: state.home.banner
})
...
render () {
    this.renderBanner()
    let { banner } = this.props
    return (
      <div id='home'>
        <div>
          {
            banner.map((val, index) => { return <div key={index}>{val}</div> })
          }
        </div>
      </div>
    )
}

// vue
this.$store.state(.模块名可选)(.属性名) = 属性值 // 更改
```

流程参考

http://blog.csdn.net/ali1995/article/details/53267807#store

http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html

http://www.360doc.com/content/16/0828/12/16002580_586499074.shtml

http://blog.csdn.net/taoweiquan0910/article/details/60956113
 
- 触发dispatch方法

```
// react
1
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as appActions from '$redux/actions/app'
import { bindActionCreators } from 'redux'
import 'assets/sass/header'
import Aa from 'components/Counter1'

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    isOpen: appActions.openSidebar
  }, dispatch)
}

// 或者appActions为多个actions的集合比如

// export const openSidebar1 = () => ({ type: types.OPENSIDEBAR })
// export const openSidebar2 = () => ({ type: types.OPENSIDEBAR })

//const mapDispatchToProps = dispatch => ({
//  actions: bindActionCreators(appActions, dispatch)
//})
// 对应的static propTypes = {
//   actions: PropTypes.object
// }

class Header extends Component {
  static defaultProps = {
    title: '卖座电影'
  }
  static propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.func
  }
  componentDidMount () {
  }
  openSidebar = () => {
    this.props.isOpen()
  }
  render () {
    const { title } = this.props
    return (
      <nav id='header' data-flex='cross:center main:justify box:justify'>
        <Aa />
        <a className='go-menu' onClick={this.openSidebar} href='javascript:;'><i className='iconfont icon-menu' /></a>
        <div className='title' data-flex='cross:center main:justify'>
          <p>{title}</p>
        </div>
        <div data-flex='cross:center'>
          <a className='go-city'>广州<i className='iconfont icon-dropdown' /></a>
          <a className='go-mine'><i className='iconfont icon-people' /></a>
        </div>
      </nav>
    )
  }
}

export default connect(
  undefined,
  mapDispatchToProps
)(Header)

2 一般不用这种

import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from '$redux/actions'

import './Counter.css'

const mapStateToProps = state => ({
  counter: state.counter
})

//  一般不用这种
const mapDispatchToProps = dispatch => ({
  actions: () => dispatch(CounterActions.increment())
})

class Counter extends Component {
  static propTypes = {
    counter: PropTypes.object,
    actions: PropTypes.func
  }
  test = () => {
    console.log(this.props.actions())
  }
  render () {
    return (
      <div>
        <a className='counter'
          href='javascript: void(0)'
          onClick={this.test}>
          {this.props.counter.count}
        </a>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

3 不怎么方便

import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CounterActions from '$redux/actions'

import './Counter.css'

const mapStateToProps = state => ({
  counter: state.counter
})

const mapDispatchToProps = dispatch => {
  return {
    actions: () => {
      return CounterActions.increment()
    },
    dispatch // 传递，否则props获取不到dispatch
  }
}

class Counter extends Component {
  static propTypes = {
    counter: PropTypes.object,
    actions: PropTypes.func,
    dispatch: PropTypes.func
  }
  test = () => {
    let {dispatch} = this.props
    dispatch(this.props.actions())
  }
  render () {
    return (
      <div>
        <a className='counter'
          href='javascript: void(0)'
          onClick={this.test}>
          {this.props.counter.count}
        </a>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

// vue
this.$store.dispatch('名字', {参数})

```

参考：

http://www.imweb.io/topic/5a426d32a192c3b460fce354

- PropTypes类型

```
// react
PropTypes.array,
PropTypes.bool,
PropTypes.func,
PropTypes.number,
PropTypes.object,
PropTypes.string,
PropTypes.symbol
```

- 跳转路由方式

1.标签点击跳路由

```
// reack 
import { NavLink as Link } from 'react-router-dom
// import { Link } from 'react-router-dom'
<Link to='/sync' className='btn' activeClassName='active'>To Sync</Link>

// vue
<router-link to="home">Home</router-link>
```

2. 手动跳转

```
// react
...
import PropTypes from 'prop-types'
class Login extends Component {
  static propTypes = {
    history: PropTypes.object
  }
  state = {
    canSubmit: false
  }
  submit = (data) => {
    // 手动跳转
    this.props.history.push('/home')
  }
  render () {
    ....
  }
}

// vue
this.$router.push({path: '/'})
```

- 生命周期

https://www.jianshu.com/p/4784216b8194

https://segmentfault.com/a/1190000006792687

https://www.jianshu.com/p/c9bc994933d5

- 获取state/更新state

```
// react
...
class Home extends Component {
  static propTypes = {
    actions: PropTypes.object,
    banner: PropTypes.array
  }
  state = {
    name: 'home'
  }
  componentDidMount () {
    // 请求异步数据
    let result = {
      data: [1, 2, 4]
    }
    this.props.actions.carousel(result)
  }
  changeName = () => {
    // 注意this的指向问题
    this.setState({
      name: 'new home'
    })
  }
  render () {
    this.renderBanner()
    let { banner } = this.props
    return (
      <div id='home'>
        <div>name: {this.state.name}</div>
        <div>
          {
            banner.map((val, index) => { return <div onClick={this.changeName} key={index}>{val}{this.state.name}</div> })
          }
        </div>
      </div>
    )
  }
}
...


// vue
this.[属性名] = 'XXX' // or this.$set(this.$data, '属性名', XXX)
```

https://www.jianshu.com/p/c6257cbef1b1

- 本组件include其他组件

```
import Hello from 'components/Hello'
class Home extends Component {
  static propTypes = {
    actions: PropTypes.object,
    banner: PropTypes.array
  }
  state = {
    name: 'home'
  }
  render () {
    return (
      <div id='home'>
        <div>name: {this.state.name}</div>
        <Hello msg='ge' />
        <div>
          {
            banner.map((val, index) => { return <div style={{ backgroundColor: 'red', color: 'white' }} onClick={this.changeName} key={index}>{val}{this.state.name}</div> })
          }
        </div>
      </div>
    )
  }
}
```

易错误点

- dispatch异步请求数据，Actions must be plain objects. Use custom middleware for async actions

```
redux-thunk中间件注入到createStore
import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import middlewares from './middlewares'
import thunk from 'redux-thunk'
// chrome Redux DevTools浏览器插件调试redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(applyMiddleware(thunk), middlewares)

export default function configureStore (initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

```

 - 代理一些问题
 
 ```
 // 请求数据封装
import qs from 'qs'
import merge from 'lodash/merge'

export function commonRequest (passData, defultParams = true, requestType = 'post') {
  let params = {
    'json': JSON.stringify(
      merge({
        'id': new Date().getTime(),
        'params': defultParams ? { 'openId': '' } : {},
        'jsonrpc': '2.0'
      }, passData || {})
    )
  }
  return requestType === 'post' ? qs.stringify(params) : params
}
// config/index.js
proxyTable: {
    '/api': {
        target: 'https://m.maizuo.com/v4',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        }
    }
}
// 请求
let url = process.env.NODE_ENV !== 'production' ? '/api/' : 'http://m.maizuo.com/v4/api/'
// 获取首页banner
export function getBanner (params) {
  return fetch({
    url: url + 'billboard/home?_t=' + new Date() * 1,
    method: 'get',
    data: commonRequest({}, undefined, 'get')
  })
}

// 貌似maizuo有些接口只支持get，所以请求类型要与之对应，否则代理出现404，找不到该接口
 ```
 
 - 事件，this指向问题
 
 ```
 使得this指向react
 1
 <div onClick={()=>this.changeArea()}>
 2
 class Header extends Component {
  static defaultProps = {
    title: ''
  }
  static propTypes = {
    title: PropTypes.string,
    actions: PropTypes.object
  }
  openSideBar = () => {
    this.props.actions.openSideBar()
  }
  render () {
    const { title } = this.props
    return (
      <nav id='header' data-flex='cross:center main:justify box:justify'>
        <a className='go-menu' onClick={this.openSideBar} href='javascript:;'><i className='iconfont icon-menu' /></a>
      </nav>
    )
  }
}
3. this.openSideBar = this.openSideBar.bind(this)
 ```

- react-router-conifg 配置redirect

```
配置的object暂时没有支持redirect跳转这个属性, 下面这个是错误的
{
    path: '/',
    redirect: '/home'
}

他的具体源码只支持

const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => (
            <route.component {...props} {...extraProps} route={route} />
          )}
        />
      ))}
    </Switch>
  ) : null;
  
所以redirect的正确配置是

import React from 'react'
import { Redirect } from 'react-router'
...
export default [
  {
    component: MainView,
    childRoutes: [
      {
        path: '/',
        exact: true, // 必须的，否者，You tried to redirect to the same route you're currently on: "/home"
        component: () => <Redirect to='/home' />
      },
      {
        path: '/home',
        component: Loadable({
          loader: () => import(`views/Home`),
          // if you have your own loading component,
          // you should consider add it here
          loading: () => null
        })
      }
    ]
  }
]

```

- 循环html标签方式

```
// react
1 循环方式1
renderBanner () {
    // 循环方式1
    let { banner } = this.props // mapStateToProps
    return (
      banner.map((val, index) => {
        return (
          <div className='slide' key={index}>
            <a target='_blank' href={val.url}><img src={val.imageUrl} /></a>
          </div>
        )
      })
    )
  }
2 // 循环方式2
renderBanner () {
    let { banner } = this.props // mapStateToProps
    return (
      <div>
        {
          banner.map((val, index) => (
            <div className='slide' key={index}>
              <a target='_blank' href={val.url}><img src={val.imageUrl} /></a>
            </div>
          ))
        }
      </div>
    )
  }
3 // 循环方式3
renderNowplay () {
    // 热映 循环方式2
    let {nowPlay} = this.props
    if (nowPlay.length === 0) return false
    let str = []
    let key = 0
    for (let item of nowPlay) {
      str.push(
        <li className='item' key={++key}>
          <Link to={{pathname: 'detail'}} className='go'>
            <div className='img placeholder'><img src={item.cover.origin} /></div>
            <div className='desc' data-flex='main:justify cross:center'>
              <div className='info'>
                <div className='film-name'>{item.name}</div>
                <p>{item.cinemaCount}家影院上映 {item.watchCount}人购票</p>
              </div>
              <div className='count'>{item.grade}</div>
            </div>
          </Link>
        </li>
      )
    }
    return (
      <div>
        <ul className='now-play'>
          {str}
        </ul>
        <MoreButton obj={{router: {pathname: 'film', search: '?now-play'}, text: '更多热映电影'}} />
      </div>
    )
  }



// vue
<div v-for="(items, index) in data" :key="index"></div>
```

- 一些公用组件无法拿到父组件this.props中的history/route等问题

```
// layout
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import Header from 'components/Header'
import Menu from 'components/Offcanvas'

class Layout extends Component {
  static propTypes = {
    route: PropTypes.object
  }
  componentDidMount () {
  }
  render () {
    return (
      <div className='main-view'>
        {/* Header需要传递this.props下去，否者Header组件无法使用this.props */}
        <Header {...this.props} />
        <Menu {...this.props} />
        <div className='view'>
          {/* 这里this.props不用传递，但是他的组件可以使用this.props.history.push等属性 */}
          {renderRoutes(this.props.route.childRoutes)}
        </div>
      </div>
    )
  }
}

export default Layout

// Header

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as appActions from '$redux/actions/app'
import { bindActionCreators } from 'redux'
import 'assets/sass/header'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appActions, dispatch)
})

class Header extends Component {
  static defaultProps = {
    title: '卖座电影'
  }
  static propTypes = {
    title: PropTypes.string,
    actions: PropTypes.object
  }
  componentDidMount () {
    // 如果没有传递this.props这里输出的只有title和actions
    console.log(this.props)
    // 如果有, 则this.props除了上面的两个，还有以下的
    // history, location, match, route

  }
  openSidebar = () => {
    this.props.actions.openSidebar(true)
  }
  render () {
    const { title } = this.props
    return (
      <nav id='header' data-flex='cross:center main:justify box:justify'>
        <a className='go-menu' onClick={this.openSidebar} href='javascript:;'><i className='iconfont icon-menu' /></a>
        <div className='title' data-flex='cross:center main:justify'>
          <p>{title}</p>
        </div>
        <div data-flex='cross:center'>
          <a className='go-city'>广州<i className='iconfont icon-dropdown' /></a>
          <a className='go-mine'><i className='iconfont icon-people' /></a>
        </div>
      </nav>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Header)

// 如果父组件不想传递this.props, header.js可以这样
import {withRouter} from 'react-router-dom'
...
export default withRouter(connect(
  null,
  mapDispatchToProps
)(Header))
```

- Link必须包含在Router中

- 移动端vw, vh布局，参考[纯CSS3使用vw和vh视口单位实现自适应](http://caibaojian.com/vw-vh.html)
 
文档参考

[react](https://doc.react-china.org/docs/hello-world.html)

[react-router](https://reacttraining.com/react-router/web/api/Link)

[react-router](https://react-guide.github.io/react-router-cn/docs/guides/basics/RouteConfiguration.html)


项目参考

https://github.com/hyy1115/react-latest-framework

https://github.com/ChuckCZC/react-demo-maizuo

https://github.com/TerryBeanX2/Webpack-React-Router-Redux-ES6


> A React project

## Usage

```bash
# install all this dependencies.
npm install

# development, default port: 8080
npm run dev

# production
npm run build

# build with report
npm run build --report

# lint the files
npm run lint

# run the tests
npm test

# 运行不了尝试将package.json的~换成^看看

# dev使用官方API， 打包使用mockjs数据（造了一些数据）
```
