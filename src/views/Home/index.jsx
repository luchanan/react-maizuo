import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactSwipe from 'react-swipe'
import { Link } from 'react-router-dom'
import * as homeActions from '$redux/actions/home'
import * as appActions from '$redux/actions/app'
import MoreButton from 'components/MoreButton'
import './home'

const mapStateToProps = state => ({
  banner: state.home.banner,
  nowPlay: state.home.nowPlay,
  soonPlay: state.home.soonPlay
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(homeActions, dispatch),
  appActions: bindActionCreators(appActions, dispatch)
})

class Home extends Component {
  static propTypes = {
    actions: PropTypes.object,
    appActions: PropTypes.object,
    banner: PropTypes.array,
    nowPlay: PropTypes.array,
    soonPlay: PropTypes.array
  }
  state = {
    name: 'home'
  }
  componentDidMount () {
    // banner请求异步数据
    // mapDispatchToProps
    this.props.actions.getBanner({})
    this.props.actions.getNowPlay()
    this.props.actions.getSoonPlay()
  }
  componentWillReceiveProps (nextProps) {
  }
  componentWillMount () {
    let {appActions} = this.props
    appActions.changeTitle('卖座电影')
  }
  changeName = () => {
    this.setState({
      name: 'new home'
    })
  }
  formatDate (time) {
    let date = new Date(time * 1)
    let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    return `${month}月${day}日上映`
  }
  renderNowplay () {
    // 热映 循环方式2
    let {nowPlay} = this.props
    if (!nowPlay || nowPlay.length === 0) return false
    let str = []
    let key = 0
    for (let item of nowPlay) {
      str.push(
        <li className='item' key={++key}>
          <Link to={`detail/${item.id}`} className='go'>
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
  renderSoon () {
    let {soonPlay} = this.props
    if (!soonPlay || soonPlay.length === 0) return false
    let soonStr = soonPlay.map((item, index) =>
      <li className='item' key={index}>
        <Link to={`detail/${item.id}`} className='go'>
          <div className='img placeholder'><img src={item.cover.origin} /></div>
          <div className='desc' data-flex='main:justify cross:center'>
            <div className='info'>
              <div className='film-name'>{item.name}</div>
            </div>
            <div className='count'>{this.formatDate(item.premiereAt)}</div>
          </div>
        </Link>
      </li>
    )
    return (
      <div className='soon-play'>
        <div className='dividing-line'><div className='upcoming'>即将上映</div></div>
        {soonStr}
        <MoreButton obj={{router: {pathname: 'film', search: '?soon-play'}, text: '更多即将上映电影'}} />
      </div>
    )
  }
  renderBanner () {
    // 循环方式1
    let { banner } = this.props // mapStateToProps
    if (!banner || banner.length === 0) return false
    return (
      <div className='banner placeholder'>
        <ReactSwipe className='banner-swiper' key={banner.length} swipeOptions={{autoplay: 3000, autoHeight: true}} >
          {
            banner.map((val, index) => (
              <div className='slide' key={index}>
                <a target='_blank' href={val.url}><img src={val.imageUrl} /></a>
              </div>
            ))
          }
        </ReactSwipe>
      </div>
    )
  }
  render () {
    let bannerStr = this.renderBanner()
    let nowPlayStr = this.renderNowplay()
    let soonStr = this.renderSoon()
    return (
      <div id='home'>
        {bannerStr}
        {nowPlayStr}
        {soonStr}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
